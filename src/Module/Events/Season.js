import {
    RewardHelper,
    TimeHelper,
    calculateBattleProbabilities,
    calculateCritChanceShare,
    calculateDominationBonuses,
    calculateSynergiesFromTeamMemberElements,
    calculateThemeFromElements,
    checkTimer,
    convertTimeToInt,
    getHHScriptVars,
    getHHVars,
    getHero,
    getLimitTimeBeforeEnd,
    getPage,
    getSecondsLeft,
    getStoredValue,
    getTextForUI,
    getTimeLeft,
    manageUnits,
    nRounding,
    randomInterval,
    setStoredValue,
    setTimer } from "../../Helper";
    import { checkParanoiaSpendings, gotoPage } from "../../Service";
    import { isJSON, logHHAuto } from "../../Utils";
import { HHStoredVarPrefixKey } from "../../config";
import { Booster } from "../Booster";
import { EventModule } from "./EventModule";

export class Season {
    static getRemainingTime(){
        const seasonTimer = unsafeWindow.season_sec_untill_event_end;

        if ( seasonTimer != undefined && (getSecondsLeft("SeasonRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey+"Temp_SeasonEndDate") === undefined) )
        {
            setTimer("SeasonRemainingTime",seasonTimer);
            setStoredValue(HHStoredVarPrefixKey+"Temp_SeasonEndDate",Math.ceil(new Date().getTime()/1000)+seasonTimer);
        }
    }
    static displayRemainingTime()
    {
        EventModule.displayGenericRemainingTime("#scriptSeasonTime", "season", "HHAutoSeasonTimer", "SeasonRemainingTime", HHStoredVarPrefixKey+"Temp_SeasonEndDate");
    }

    static getEnergy() {
        return Number(getHHVars('Hero.energies.kiss.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.kiss.max_regen_amount'));
    }

    static getPinfo() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonRunThreshold"));

        let Tegzd = '';
        const boostLimited = getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
        if(boostLimited) {
            Tegzd += '<li style="color:red!important;" title="'+getTextForUI("boostMissing","elementText")+'">';
        }else {
            Tegzd += '<li>';
        }
        Tegzd += getTextForUI("autoSeasonTitle","elementText")+' '+Season.getEnergy()+'/'+Season.getEnergyMax();
        if (runThreshold > 0) {
            Tegzd += ' ('+threshold+'<'+Season.getEnergy()+'<'+runThreshold+')';
        }
        if(runThreshold > 0  && Season.getEnergy() < runThreshold) {
            Tegzd += ' ' + getTextForUI("waitRunThreshold","elementText");
        }else {
            Tegzd += ' : ' + getTimeLeft('nextSeasonTime');
        }
        if (boostLimited) {
            Tegzd += ' ' + getTextForUI("boostMissing","elementText") + '</li>';
        } else {
            Tegzd += '</li>';
        }
        return Tegzd;
    }

    static isTimeToFight() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonRunThreshold"));
        const humanLikeRun = getStoredValue(HHStoredVarPrefixKey+"Temp_SeasonHumanLikeRun") === "true";

        const energyAboveThreshold = humanLikeRun && Season.getEnergy() > threshold || Season.getEnergy() > Math.max(threshold, runThreshold-1);
        const paranoiaSpending = Season.getEnergy() > 0 && Number(checkParanoiaSpendings('kiss')) > 0;
        const needBoosterToFight = getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();

        if(checkTimer('nextSeasonTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            logHHAuto('Time for season but no booster equipped');
        }

        return (checkTimer('nextSeasonTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }

    static moduleSimSeasonBattle()
    {
        let doDisplay=false;
        let mojoOppo=[];
        let scoreOppo=[];
        let nameOppo=[];
        let expOppo=[];
        let affOppo=[];
        try
        {
            // TODO update
            if ($("div.matchRatingNew img#powerLevelScouter").length != 3)
            {
                doDisplay=true;
            }
            const playerStats = {};
            $('#season-arena .battle_hero .player_stats .player_stats_row div').each(function ()
                                                                                {
                playerStats[$('span[carac]',this).attr('carac')]=$('span:not([carac])',this)[0].innerText.replace(/[^0-9]/gi, '');
            });
            // player stats
            const playerEgo = Math.round(playerStats.ego);
            const playerDef = Math.round(playerStats.def0);
            const playerAtk = Math.round(playerStats.damage);
            const playerCrit = Math.round(playerStats.chance);
            const playerTeamElement = Array();
            for (var i=0; i<$('#season-arena .battle_hero .team-theme.icon').length; i++)
            {
                const teamElement = $('#season-arena .battle_hero .team-theme.icon')[i].attributes.src.value.match(/girls_elements\/(.*?).png/)[1];
                playerTeamElement.push(teamElement);
            }
            const playerTeam = $('#season-arena .battle_hero .player-team .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray();
            const playerSynergies = JSON.parse($('#season-arena .battle_hero .player-team .icon-area').attr('synergy-data'));
            const playerTeamMemberElements = playerTeam.map(({element_data: {type: element}})=>element);
            const playerElements = calculateThemeFromElements(playerTeamMemberElements)
            const playerBonuses = {
                critDamage: playerSynergies.find(({element: {type}})=>type==='fire').bonus_multiplier,
                critChance: playerSynergies.find(({element: {type}})=>type==='stone').bonus_multiplier,
                defReduce: playerSynergies.find(({element: {type}})=>type==='sun').bonus_multiplier,
                healOnHit: playerSynergies.find(({element: {type}})=>type==='water').bonus_multiplier
            };

            let opponents = $('div.opponents_arena .season_arena_opponent_container');
            for (let index=0;index<3;index++)
            {

                const opponentName = $("div.player-name",opponents[index])[0].innerText;
                const opponentEgo = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[2].innerText);
                const opponentDef = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[1].innerText);
                const opponentAtk = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[0].innerText);
                const opponentCrit = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[3].innerText);
                const opponentTeam = $('.team-member img',opponents[index]).map((i, el) => $(el).data('new-girl-tooltip')).toArray();
                const opponentTeamMemberElements = opponentTeam.map(({element})=>element);
                const opponentElements = calculateThemeFromElements(opponentTeamMemberElements);
                const opponentBonuses = calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements);
                const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements);
                const player = {
                    hp: playerEgo * (1 + dominanceBonuses.player.ego),
                    dmg: (playerAtk * (1 + dominanceBonuses.player.attack)) - (opponentDef * (1 - playerBonuses.defReduce)),
                    critchance: calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
                    bonuses: playerBonuses
                };
                const opponent = {
                    hp: opponentEgo * (1 + dominanceBonuses.opponent.ego),
                    dmg: (opponentAtk * (1 + dominanceBonuses.opponent.attack)) - (playerDef * (1 - opponentBonuses.defReduce)),
                    critchance: calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
                    name: opponentName,
                    bonuses: opponentBonuses
                };


                if (doDisplay)
                {
                    //console.log("HH simuFight",JSON.stringify(player),JSON.stringify(opponent), opponentBonuses);
                }
                const simu = calculateBattleProbabilities(player, opponent)

                //console.log(player,opponent);
                //console.log(simu);
                //matchRating=customMatchRating(simu);
                scoreOppo[index]=simu;
                mojoOppo[index]=Number($(".slot_victory_points .amount",opponents[index])[0].innerText);
                //logHHAuto(mojoOppo[index]);
                nameOppo[index]=opponentName;
                expOppo[index]=Number($(".slot_season_xp_girl",opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
                affOppo[index]=Number($(".slot_season_affection_girl",opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
                //Publish the ego difference as a match rating
                //matchRatingFlag = matchRating.substring(0,1);
                //matchRating = matchRating.substring(1);

                GM_addStyle('#season-arena .opponents_arena .opponent_perform_button_container {'
                        + 'width: 200px;}'
                    );

                GM_addStyle('.green_button_L.btn_season_perform, .leagues_team_block .challenge button.blue_button_L {'
                        + 'background-image: linear-gradient(to top,#008ed5 0,#05719c 100%);'
                        + '-webkit-box-shadow: 0 3px 0 rgb(13 22 25 / 35%), inset 0 3px 0 #6df0ff;'
                        + '-moz-box-shadow: 0 3px 0 rgba(13,22,25,.35),inset 0 3px 0 #6df0ff;'
                        + 'box-shadow: 0 3px 0 rgb(13 22 25 / 35%), inset 0 3px 0 #6df0ff;}'
                    );

                GM_addStyle('#season-arena .matchRatingNew {'
                        + 'display: flex;'
                        + 'align-items: center;'
                        + 'justify-content: space-between;}'
                    );

                $('.player-panel-buttons .btn_season_perform',opponents[index]).contents().filter(function() {return this.nodeType===3;}).remove();
                $('.player-panel-buttons .btn_season_perform',opponents[index]).find('span').remove();
                $('.player-panel-buttons .opponent_perform_button_container .green_button_L.btn_season_perform .energy_kiss_icn.kiss_icon_s').remove();

                if (doDisplay)
                {
                    $('.player-panel-buttons .opponent_perform_button_container .green_button_L.btn_season_perform',opponents[index]).prepend(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${nRounding(100*simu.win, 2, -1)}%</div>`);
                }
            }

            var chosenID = -1;
            var chosenRating = -1;
            var chosenFlag = -1;
            var chosenMojo = -1;
            let currentExp;
            let currentAff;
            var currentFlag;
            var currentScore;
            var currentMojo;
            var numberOfReds=0;
            let currentGains;
            let oppoName;

            for (let index=0;index<3;index++)
            {
                let isBetter = false;
                currentScore = Number(scoreOppo[index].win);
                currentFlag = scoreOppo[index].scoreClass;
                currentMojo = Number(mojoOppo[index]);
                currentExp=Number(expOppo[index]);
                currentAff=Number(affOppo[index]);
                switch (currentFlag)
                {
                    case 'plus':
                        currentFlag = 1;
                        break;
                    case 'close':
                        currentFlag = 0;
                        break;
                    case 'minus':
                        currentFlag = -1;
                        numberOfReds++;
                        break;
                }
                //logHHAuto({OppoName:nameOppo[index],OppoFlag:currentFlag,OppoScore:currentScore,OppoMojo:currentMojo});
                //not chosen or better flag
                if (chosenRating == -1 || chosenFlag < currentFlag)
                {
                    //logHHAuto('first');
                    isBetter = true;
                    currentGains = currentAff + currentExp;
                }
                //same orange flag but better score
                else if (chosenFlag == currentFlag && currentFlag == 0 && chosenRating < currentScore)
                {
                    //logHHAuto('second');
                    isBetter = true;
                }
                //same red flag but better mojo
                else if (chosenFlag == currentFlag && currentFlag == -1 && chosenMojo < currentMojo)
                {
                    //logHHAuto('second');
                    isBetter = true;
                }
                //same green flag but better mojo
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo < currentMojo)
                {
                    //logHHAuto('third');
                    isBetter = true;
                }
                //same green flag same mojo but better gains
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains < currentAff + currentExp)
                {
                    //logHHAuto('third');
                    isBetter = true;
                }
                //same green flag same mojo same gains but better score
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains === currentAff + currentExp && currentScore > chosenRating)
                {
                    //logHHAuto('third');
                    isBetter = true;
                }
                if (isBetter) {
                    chosenRating = currentScore;
                    chosenFlag = currentFlag;
                    chosenID = index;
                    chosenMojo = currentMojo;
                    oppoName = nameOppo[index];
                }
            }

            var price=Number($("div.opponents_arena button#refresh_villains").attr('price'));
            if (isNaN(price))
            {
                price = 12;
            }
            if (numberOfReds === 3 && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonPassReds") === "true" && getHHVars('Hero.currencies.hard_currency')>=price+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")))
            {
                chosenID = -2;
            }

            $($('div.season_arena_opponent_container div.matchRatingNew')).append(`<img id="powerLevelScouterNonChosen">`);

            GM_addStyle('#powerLevelScouterChosen, #powerLevelScouterNonChosen {'
                        + 'width: 25px;}'
                    );

            //logHHAuto("Best opportunity opponent : "+oppoName+'('+chosenRating+')');
            if (doDisplay)
            {
                $($('.season_arena_opponent_container .matchRatingNew #powerLevelScouterNonChosen')[chosenID]).remove();
                $($('div.season_arena_opponent_container div.matchRatingNew')[chosenID]).append(`<img id="powerLevelScouterChosen" src=${getHHScriptVars("powerCalcImages").chosen}>`);

                //CSS

                GM_addStyle('.matchRatingNew {'
                            + 'text-align: center; '
                            + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                            + 'line-height: 17px; '
                            + 'font-size: 14px;}'
                        );

                GM_addStyle('.plus {'
                            + 'color: #66CD00;}'
                        );

                GM_addStyle('.minus {'
                            + 'color: #FF2F2F;}'
                        );

                GM_addStyle('.close {'
                            + 'color: #FFA500;}'
                        );

                GM_addStyle('#powerLevelScouter {'
                        + 'width: 25px;}'
                    );
                GM_addStyle('#powerLevelScouterChosen {'
                            + 'width: 25px;}'
                        );
            }
            return chosenID;
        }
        catch(err)
        {
            logHHAuto("Catched error : Could not display season score : "+err);
            return -1;
        }
    }
    static run(){
        logHHAuto("Performing auto Season.");
        // Confirm if on correct screen.
        const Hero = getHero();
        var page = getPage();
        var current_kisses = Season.getEnergy();
        if (page === getHHScriptVars("pagesIDSeasonArena"))
        {
            logHHAuto("On season arena page.");
    
            var chosenID=Season.moduleSimSeasonBattle();
            if (chosenID === -2 )
            {
                //change opponents and reload
    
                function refreshOpponents()
                {
                    var params = {
                        namespace: 'h\\Season',
                        class: 'Arena',
                        action: 'arena_reload'
                    };
                    logHHAuto("Three red opponents, paying for refresh.");
                    hh_ajax(params, function(data){
                        Hero.update("hard_currency", data.hard_currency, false);
                        location.reload();
                    })
                }
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                logHHAuto("setting autoloop to false");
                setTimer('nextSeasonTime',5);
                setTimeout(refreshOpponents,randomInterval(800,1600));
    
                return true;
            }
            else if (chosenID === -1 )
            {
                logHHAuto("Season : was not able to choose opponent.");
                setTimer('nextSeasonTime',randomInterval(30*60, 35*60));
            }
            else
            {
                const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonRunThreshold"));
                if (runThreshold > 0) {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_SeasonHumanLikeRun", "true");
                }
                location.href = document.getElementsByClassName("opponent_perform_button_container")[chosenID].children[0].getAttribute('href');
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                logHHAuto("setting autoloop to false");
                logHHAuto("Going to crush : "+$("div.season_arena_opponent_container .personal_info div.player-name")[chosenID].innerText);
                setTimer('nextSeasonTime',5);
                return true;
            }
        }
        else
        {
            // Switch to the correct screen
            logHHAuto("Remaining kisses : "+ current_kisses);
            if ( current_kisses > 0 )
            {
                logHHAuto("Switching to Season Arena screen.");
                gotoPage(getHHScriptVars("pagesIDSeasonArena"));
            }
            else
            {
                if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0)
                {
                    setTimer('nextSeasonTime', randomInterval(15*60, 17*60));
                }
                else
                {
                    const next_refresh = getHHVars('Hero.energies.kiss.next_refresh_ts')
                    setTimer('nextSeasonTime', randomInterval(next_refresh+10, next_refresh + 180));
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            return;
        }
    }
    static goAndCollect()
    {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonCollectablesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDSeason"))
        {
            Season.getRemainingTime();
            const seasonEnd = getSecondsLeft("SeasonRemainingTime");
            logHHAuto("Season end in " + TimeHelper.debugDate(seasonEnd));

            if (checkTimer('nextSeasonCollectAllTime') && seasonEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonCollectAll") === "true")
            {
                if($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
                {
                    logHHAuto("Going to collect all Season item at once.");
                    setTimeout(function (){
                        $(getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextSeasonCollectAllTime', getHHScriptVars("maxCollectionDelay") + randomInterval(60,180)); // Add timer to check again later if there is new items to collect
                        setTimeout(function (){gotoPage(getHHScriptVars("pagesIDHome"));},500);
                    },500);
                    return true;
                }
                else
                {
                    setTimer('nextSeasonCollectAllTime', getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                }
            }
            if (checkTimer('nextSeasonCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonCollect") === "true")
            {
                logHHAuto("Going to collect Season.");
                logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");

                let limitClassPass = "";
                if ($("div#gsp_btn_holder:visible").length)
                {
                    limitClassPass = ".free_reward"; // without season pass
                }

                let buttonsToCollect = [];
                const listSeasonTiersToClaim = $("#seasons_tab_container .rewards_pair .reward_wrapper.reward_is_claimable"+limitClassPass);
                logHHAuto('Found ' + listSeasonTiersToClaim.length + ' rewards available for collection before filtering');
                for (let currentReward = 0 ; currentReward < listSeasonTiersToClaim.length ; currentReward++)
                {
                    const currentRewardSlot = RewardHelper.getRewardTypeBySlot($(".slot, .shards_girl_ico",listSeasonTiersToClaim[currentReward])[0]);
                    const currentTier = $(".tier_number",$(listSeasonTiersToClaim[currentReward]).parent())[0].innerText;
                    //console.log(currentRewardSlot);
                    if (rewardsToCollect.includes(currentRewardSlot))
                    {
                        if (listSeasonTiersToClaim[currentReward].className.indexOf('pass-reward') > 0)
                        {
                            logHHAuto("Adding for collection tier n°"+currentTier+" reward (paid) : "+currentRewardSlot);
                            buttonsToCollect.push({reward : currentRewardSlot, button : listSeasonTiersToClaim[currentReward], tier : currentTier, paid:true});
                        }
                        else
                        {
                            logHHAuto("Adding for collection n°"+currentTier+" reward (free) : "+currentRewardSlot);
                            buttonsToCollect.push({reward : currentRewardSlot, button : listSeasonTiersToClaim[currentReward], tier : currentTier, paid:false});
                        }
                    }
                }

                //console.log(JSON.stringify(buttonsToCollect));
                if (buttonsToCollect.length >0)
                {
                    function collectSeasonRewards(inHasSelected = false)
                    {
                        if (buttonsToCollect.length >0)
                        {
                            const currentToCollect = buttonsToCollect[0];
                            if (inHasSelected)
                            {
                                const rewardPlaceHolder = $("#preview_placeholder .reward_wrapper.reward_is_claimable, #preview_placeholder .reward_wrapper.reward_is_next");
                                const currentSelectedRewardType = RewardHelper.getRewardTypeBySlot($(".slot, .shards_girl_ico",rewardPlaceHolder)[0]);
                                const currentTier = $("#preview_tier")[0].innerText.split(" ")[1];
                                if (
                                    rewardPlaceHolder.length >0
                                    && rewardsToCollect.includes(currentSelectedRewardType)
                                    && currentSelectedRewardType === currentToCollect.reward
                                    && currentTier === currentToCollect.tier
                                )
                                {
                                    logHHAuto("Collecting tier n°"+currentToCollect.tier+" : "+currentSelectedRewardType);
                                    setTimeout(function (){$("#claim_btn_s")[0].click();},500);
                                }
                                else
                                {
                                    logHHAuto(`Issue collecting n°${currentToCollect.tier} : ${currentToCollect.reward} : \n`
                                            +`rewardPlaceHolder.length : ${rewardPlaceHolder.length}\n`
                                            +`rewardsToCollect.includes(currentSelectedRewardType) : ${rewardsToCollect.includes(currentSelectedRewardType)}\n`
                                            +`currentSelectedRewardType : ${currentSelectedRewardType} / currentToCollect.reward : ${currentToCollect.reward} => ${currentSelectedRewardType === currentToCollect.reward}\n`
                                            +`currentTier : ${currentTier} / currentToCollect.tier : ${currentToCollect.tier} => ${currentTier === currentToCollect.tier}`);

                                    logHHAuto("Proceeding with next one.");
                                }

                                buttonsToCollect.shift();
                                setTimeout(collectSeasonRewards,1000);
                                return;
                            }
                            else
                            {
                                logHHAuto("Selecting reward n°"+currentToCollect.tier+" : "+currentToCollect.reward);
                                currentToCollect.button.click();
                                setTimeout(function () {collectSeasonRewards(true);}, randomInterval(300, 500));
                            }
                        }
                        else
                        {
                            logHHAuto("Season collection finished.");
                            setTimer('nextSeasonCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectSeasonRewards();
                    return true;
                }
                else
                {
                    logHHAuto("No season collection to do.");
                    setTimer('nextSeasonCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                    setTimer('nextSeasonCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else
        {
            logHHAuto("Switching to Season Rewards screen.");
            gotoPage(getHHScriptVars("pagesIDSeason"));
            return true;
        }
    }
    static styles(){
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_SeasonMaskRewards") === "true")
        {
            Season.maskReward();
        }
    }
    static maskReward()
    {
        if($('.HHaHidden').length > 0 || $('.script-hide-claimed').length > 0  /*OCD*/) {
            return;
        }
        var arrayz;
        var nbReward;
        let modified=false;
        arrayz = $('.rewards_pair:not([style*="display:none"]):not([style*="display: none"])');
        if ($("div#gsp_btn_holder[style='display: none;']").length)
        {
            nbReward=2;
        }
        else
        {
            nbReward=1;
        }

        var obj;
        if (arrayz.length > 0) {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                obj = $(arrayz[i2]).find('.tick_s:not([style*="display:none"]):not([style*="display: none"])');
                if (obj.length >= nbReward) {
                    //console.log("width : "+arrayz[i2].offsetWidth);
                    //document.getElementById('rewards_cont_scroll').scrollLeft-=arrayz[i2].offsetWidth;
                    arrayz[i2].style.display = "none";
                    $(arrayz[i2]).addClass('HHaHidden');
                    modified = true;
                }
            }
        }
        if (modified)
        {
            $('.rewards_seasons_row').css('width', 'max-content');
            const $rowScroll = $('.rewards_container_seasons');
            if ($rowScroll.length && $rowScroll.getNiceScroll(0).doScrollLeft) {
                $rowScroll.getNiceScroll().resize();
                $rowScroll.getNiceScroll(0).doScrollLeft(0,200);
            }
        }
    }
}