import {
    RewardHelper,
    calculateBattleProbabilities,
    calculateCritChanceShare,
    calculateDominationBonuses,
    calculateSynergiesFromTeamMemberElements,
    calculateThemeFromElements,
    checkTimer,
    clearTimer,
    convertTimeToInt,
    deleteStoredValue,
    getGoToChangeTeamButton,
    getHHScriptVars,
    getHHVars,
    getHero,
    getPage,
    getSecondsLeft,
    getStoredValue,
    getTextForUI,
    nRounding,
    parsePrice,
    queryStringGetParam,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { autoLoop, checkParanoiaSpendings, gotoPage } from "../Service";
import { isJSON, logHHAuto } from "../Utils";
import { Booster } from "./Booster";

export class LeagueHelper {
    /* get time in sec */
    static getLeagueEndTime(){
        let league_end = -1;
        const league_end_in = $('#leagues .league_end_in .timer span[rel="expires"]').text();
        if(league_end_in !== undefined && league_end_in !== null && league_end_in.length > 0)
        {
            league_end = Number(convertTimeToInt(league_end_in));
        }
        return league_end;
    }
    static numberOfFightAvailable(opponent) {
        // remove match_history after w32 update
        const matchs = opponent.match_history ? opponent.match_history[opponent.player.id_fighter]: opponent.match_history_sorting[opponent.player.id_fighter];
        return matchs ? matchs.filter(match=>match == null).length : 0
    }
    static getLeagueCurrentLevel()
    {
        if(unsafeWindow.current_tier_number === undefined)
        {
            setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
        }
        return unsafeWindow.current_tier_number;
    }
    static style(){
        
        GM_addStyle('#leagues .league_content .league_table .data-list .data-row .data-column[column="can_fight"] {'
            + 'min-width: 8.5rem;}'
        );

        GM_addStyle('@media only screen and (min-width: 1026px) {'
            + '.matchRatingNew {'
            + 'display: flex;'
            + 'flex-wrap: nowrap;'
            + 'align-items: center;'
            + 'justify-content: center;'
            + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
            + 'line-height: 17px; '
            + 'max-width: 65px; '
            + 'font-size: 12px;}}'
        );

        GM_addStyle('@media only screen and (max-width: 1025px) {'
            + '.matchRatingNew {'
            + 'width: auto;'
            + 'display: flex;'
            + 'flex-wrap: nowrap;'
            + 'align-items: center;'
            + 'justify-content: center;'
            + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
            + 'line-height: 17px; '
            + 'max-width: 65px; '
            + 'font-size: 12px;}}'
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

        GM_addStyle('.powerLevelScouter {'
                + 'width: 25px;}'
            );
        GM_addStyle('#leagues .league_content .league_table .data-list .data-row .data-column[column="nickname"].clubmate .nickname { color: #00CC00 }');
    }

    static addChangeTeamButton() {

        $('.league_buttons_block').append(getGoToChangeTeamButton());
        
        GM_addStyle('#leagues .league_content .league_buttons {'
            + 'max-width: none;}'
        );
        GM_addStyle('#leagues .league_content .league_buttons .league_buttons_block {'
            + 'width: auto;}'
        );
    }

    
    static displayOppoSimuOnButton(id_fighter, simu, force=0) {
        const opponentGoButton = $('a[href*="id_opponent='+id_fighter+'"]');
        if((opponentGoButton.length <= 0 || $('.powerLevelScouter',opponentGoButton).length > 0) && !force) {
            return;
        }
        // logHHAuto('powerLevelScouter not present adding it ' + id_fighter);

        const percentage = nRounding(100*simu.win, 2, -1);
        const points = nRounding(simu.expectedValue, 1, -1);
        const pointText = `${percentage}% (${points})` +
        `<span style="margin:0;display:none;" id="HHPowerCalcScore">${percentage}</span>
        <span style="margin:0;display:none;" id="HHPowerCalcPoints">${points}</span>`;
        // const opponentRow = opponentGoButton.parent().parent();
        opponentGoButton.html(`<div class="matchRatingNew ${simu.scoreClass}"><img class="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${pointText}</div>`);
    }

    static getEnergy() {
        return Number(getHHVars('Hero.energies.challenge.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.challenge.max_regen_amount'));
    }

    static isAutoLeagueActivated(){
        return getStoredValue("HHAuto_Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20;
    }

    static isTimeToFight(){
        const energyAboveThreshold = LeagueHelper.getEnergy() > Number(getStoredValue("HHAuto_Setting_autoLeaguesThreshold"));
        const paranoiaSpending = LeagueHelper.getEnergy() > 0 && Number(checkParanoiaSpendings('challenge')) > 0;
        const needBoosterToFight = getStoredValue("HHAuto_Setting_autoLeaguesBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();

        if(checkTimer('nextLeaguesTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            logHHAuto('Time for league but no booster equipped');
        }

        return (checkTimer('nextLeaguesTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }
    
    static moduleSimLeague() {

        LeagueHelper.moduleSimLeagueHideBeatenOppo();
        if($('.change_team_container').length <= 0) {
            LeagueHelper.addChangeTeamButton();
        }

        if ($("#popup_message_league").length >0 || getStoredValue("HHAuto_Setting_leagueListDisplayPowerCalc") !== "true")
        {
            return;
        }

        const opponentButtons = $('a.go_pre_battle.blue_button_L');
        const opponentSim = $("div.matchRatingNew img.powerLevelScouter");
        const allOpponentsSimDisplayed = (opponentSim.length >= opponentButtons.length);
        const Hero=getHero();


        let SimPower = function()
        {
            if (allOpponentsSimDisplayed)
            {
                // logHHAuto("Stop simu");
                return;
            }

            const opponents_list = getHHVars("opponents_list");
            if(!opponents_list)
            {
                logHHAuto('ERROR: Can\'t find opponent list');
                return;
            }
            let heroFighter = opponents_list.filter(obj => {
                return obj.player.id_fighter == Hero.infos.id;
            });
            if(heroFighter.length > 0) heroFighter = heroFighter[0].player;
            else return;

            /*const canFight = function(opponent) {
                // remove match_history after w32 update
                const matchs = opponent.match_history ? opponent.match_history[opponent.player.id_fighter]: opponent.match_history_sorting[opponent.player.id_fighter];
                return matchs && matchs.length === 3 && (matchs[0] == null || matchs[1] == null || matchs[2] == null)
            }*/

            const containsSimuScore = function(opponents) {
                return $('a[href*="id_opponent='+opponents.player.id_fighter+'"] .matchRatingNew').length > 0;
            }


            const SimPowerOpponent = function(heroFighter, opponents) {

                const opponentData = opponents.player;
                let leaguePlayers = LeagueHelper.getLeaguePlayersData(heroFighter, opponentData);
                //console.log("HH simuFight",JSON.stringify(leaguePlayers.player),JSON.stringify(leaguePlayers.opponent));
                let simu = calculateBattleProbabilities(leaguePlayers.player, leaguePlayers.opponent);

                const oppoPoints = simu.points;
                let expectedValue = 0;
                for (let i=25; i>=3; i--) {
                    if (oppoPoints[i]) {
                        expectedValue += i*oppoPoints[i];
                    }
                }
                simu.expectedValue = expectedValue;

                LeagueHelper.displayOppoSimuOnButton(opponentData.id_fighter, simu);
            }

            for(let opponentIndex = 0;opponentIndex < opponents_list.length ; opponentIndex++)
            {
                let opponents = opponents_list[opponentIndex];
                if (LeagueHelper.numberOfFightAvailable(opponents) > 0 && !containsSimuScore(opponents)) {
                    SimPowerOpponent(heroFighter, opponents); 
                }
            }
            
            //CSS
        }

        SimPower();

        let listUpdateStatus='<div style="position: absolute;left: 650px;top: 14px;width:100px;" class="tooltipHH" id="HHListUpdate"></div>';
        if (document.getElementById("HHListUpdate") === null) {
            $(".leagues_middle_header_script").append(listUpdateStatus);
        }

        if(allOpponentsSimDisplayed || opponentSim.length <=1) {
            let buttonLaunchList='<span class="tooltipHHtext">'+getTextForUI("RefreshOppoList","tooltip")+'</span><label style="width:100%;" class="myButton" id="RefreshOppoList">'+getTextForUI("RefreshOppoList","elementText")+'</label>';
            if (document.getElementById("RefreshOppoList") === null)
            {
                $("#HHListUpdate").html('').append(buttonLaunchList);
                document.getElementById("RefreshOppoList").addEventListener("click", function()
                {
                    document.getElementById("RefreshOppoList").remove();
                    $('a[href*="id_opponent"]').each(function () {
                        $(this).html('Go'); // TODO translate
                    });
                    opponentsTempPowerList = {expirationDate:new Date().getTime() + getHHScriptVars("LeagueListExpirationSecs") * 1000,opponentsList:{}};
                    deleteStoredValue("HHAuto_Temp_LeagueTempOpponentList");
                });
            }
        } else {
            $("#HHListUpdate").html('Building:' + opponentSim.length +"/"+ opponentButtons.length);
        }

        let buttonSortList='<div style="position: absolute;left: 780px;top: 14px;width:75px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("sortPowerCalc","tooltip")+'</span><label style="width:100%;" class="myButton" id="sortPowerCalc">'+getTextForUI("sortPowerCalc","elementText")+'</label></div>';
        const league_table = $('.league_content .data-list');
        if (document.getElementById("sortPowerCalc") === null && $('.matchRatingNew',league_table).length >0)
        {
            $('.leagues_middle_header_script').append(buttonSortList);
            document.getElementById("sortPowerCalc").addEventListener("click", function ()
            {
                let items = $('.data-row.body-row:visible',league_table).map((i, el) => el).toArray();
                items.sort(function(a, b)
                        {
                    //console.log($('#HHPowerCalcScore',$(a)));
                    const score_a = $('#HHPowerCalcScore',$(a)).length===0?0:Number($('#HHPowerCalcScore',$(a))[0].innerText);
                    const score_b = $('#HHPowerCalcScore',$(b)).length===0?0:Number($('#HHPowerCalcScore',$(b))[0].innerText);
                    const points_a = $('#HHPowerCalcPoints',$(a)).length===0?0:Number($('#HHPowerCalcPoints',$(a))[0].innerText);
                    const points_b = $('#HHPowerCalcPoints',$(b)).length===0?0:Number($('#HHPowerCalcPoints',$(b))[0].innerText);
                    //console.log(score_a,score_b,points_a,points_b);
                    if (score_b === score_a)
                    {
                        return points_b-points_a;
                    }
                    else
                    {
                        return score_b-score_a;
                    }
                });

                for (let item in items)
                {
                    $(items[item]).detach();
                    league_table.append(items[item]);
                }
                $('.league_content .league_table').animate({scrollTop: 0});
            });
        }
    }

    static moduleSimLeagueHideBeatenOppo()
    {
        const beatenOpponents ='<div style="position: absolute;left: 190px;top: 14px;width:100px;"  class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("HideBeatenOppo","tooltip")+'</span><label style="width:100%;" class="myButton" id="HideBeatenOppo">'+getTextForUI("HideBeatenOppo","elementText")+'</label></div>';
        if (
            document.getElementById("beaten_opponents") === null // button from HH OCD script
            &&  document.getElementById("HideBeatenOppo") === null
        )
        {
            if($(".leagues_middle_header_script").length == 0) {
                $('#tower_of_fame .tabs').append('<div class="leagues_middle_header_script"></div>');
                
                GM_addStyle('.leagues_middle_header_script {'
                    + 'display: flow-root;'
                    + 'margin-top: 4px;}'
                );
            }
            function removeBeatenOpponents() {
                var board = document.getElementsByClassName("data-list")[0];
                if(!board) return;
                var opponents = board.getElementsByClassName("data-row body-row");
                for (var i=0; i<opponents.length; i++) {
                    try {
                        if (!opponents[i].className.includes("player-row")) {
                            let hide = true;
                            let results = $(opponents[i]).find('div[column = "match_history"], div[column = "match_history_sorting"]')[0].children; // remove match_history after w32 update
                            for (let j=0; j<results.length; j++) {
                                if (results[j].className == "result ") hide = false;
                            }
                            if (hide) opponents[i].style.display="none";
                        }
                    } catch(e) {}
                }
                $('#leagues .league_content .league_table').getNiceScroll().resize()
            }

            function displayBeatenOpponents() {
                var board = document.getElementsByClassName("data-list")[0];
                if(!board) return;
                var opponents = board.getElementsByClassName("data-row body-row");
                for (var i=0; i<opponents.length; i++) {
                    try {
                        if (!opponents[i].className.includes("player-row")) {
                            let hide = true;
                            let results = $(opponents[i]).find('div[column = "match_history"], div[column = "match_history_sorting"]')[0].children; // remove match_history after w32 update
                            for (let j=0; j<results.length; j++) {
                                if (results[j].className == "result ") hide = false;
                            }
                            if (hide) opponents[i].style.display="";
                        }
                    } catch(e) {}
                }
                $('#leagues .league_content .league_table').getNiceScroll().resize()
            }

            $(".leagues_middle_header_script").append(beatenOpponents);

            let hideBeatenOppo = getStoredValue("HHAuto_Temp_hideBeatenOppo");
            if (!hideBeatenOppo) {
                hideBeatenOppo = 0;
                setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
            }

            if (hideBeatenOppo == 1) {
                removeBeatenOpponents();
                $('#HideBeatenOppo').html(getTextForUI("display","elementText"));
            }
            else {
                $('#HideBeatenOppo').html(getTextForUI("HideBeatenOppo","elementText"));
            }

            document.getElementById("HideBeatenOppo").addEventListener('click', function(){
                if (hideBeatenOppo == 0) {
                    removeBeatenOpponents();
                    hideBeatenOppo = 1;
                    setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
                    $('#HideBeatenOppo').html(getTextForUI("display","elementText"));
                }
                else {
                    displayBeatenOpponents();
                    hideBeatenOppo = 0;
                    setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
                    $('#HideBeatenOppo').html(getTextForUI("HideBeatenOppo","elementText"));
                }
            });

            let sort_by = document.querySelectorAll('.data-column.head-column');
            for (var sort of sort_by) {
                sort.addEventListener('click', function() {
                    if (hideBeatenOppo == 1) removeBeatenOpponents();
                });
            }
        }
    }
    
    static getLeaguePlayersData(inHeroLeaguesData, inPlayerLeaguesData)
    {
        const {
            chance: playerCrit,
            damage: playerAtk,
            defense: playerDef,
            remaining_ego: playerEgo,
            team: playerTeam
        } = inHeroLeaguesData;
        let playerElements = playerTeam.theme_elements;
        let playerSynergies = playerTeam.synergies;
        if(!playerSynergies) {
            const playerSynergyDataJSON = $('.player-row .button_team_synergy').attr('synergy-data');
            playerSynergies = JSON.parse(playerSynergyDataJSON);
        }
        if (!playerElements || playerElements.length === 0) {
            const playerTeamMemberElements = [0,1,2,3,4,5,6].map(key => playerTeam.girls[key].girl.element_data.type);
            playerElements = calculateThemeFromElements(playerTeamMemberElements);
        }
        const playerBonuses = {
            critDamage: playerSynergies.find(({element: {type}})=>type==='fire').bonus_multiplier,
            critChance: playerSynergies.find(({element: {type}})=>type==='stone').bonus_multiplier,
            defReduce: playerSynergies.find(({element: {type}})=>type==='sun').bonus_multiplier,
            healOnHit: playerSynergies.find(({element: {type}})=>type==='water').bonus_multiplier
        };

        const {
            chance: opponentCrit,
            damage: opponentAtk,
            defense: opponentDef,
            remaining_ego: opponentEgo,
            team: opponentTeam
        } = inPlayerLeaguesData

        const opponentTeamMemberElements = [];
        [0,1,2,3,4,5,6].forEach(key => {
            const teamMember = opponentTeam[key]
            if (teamMember && teamMember.element) {
                opponentTeamMemberElements.push(teamMember.element)
            }
        })
        const opponentElements = opponentTeam.theme_elements.map(({type}) => type);
        const opponentBonuses = calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements)
        const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements)

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
            name: inPlayerLeaguesData.nickname,
            bonuses: opponentBonuses
        };
        return {player:player, opponent:opponent, dominanceBonuses:dominanceBonuses}
    }   

    static getLeagueOpponentListData(isFirstCall = true)
    {
        let Data=[];
        let opponent_id;
        let fightButton;

        const hasHHBdsmChangeBefore = $('.data-column[column="power"] .matchRating').length > 0;
        if (hasHHBdsmChangeBefore) logHHAuto('HH++ BDSM detected');
        const tableRow = $(".data-list .data-row.body-row");

        var getPowerOrPoints = function (hasHHBdsmChangeBefore, oppoRow)
        {
            if(hasHHBdsmChangeBefore) {
                // HH++ BDSM script exist
                // As power information is removed and replaced by simulation score, we need to use the score
                return Number($('.data-column[column="power"] .matchRating-expected .matchRating-value', oppoRow).text().replace(',', '.'));
            } else {
                return parsePrice($('.data-column[column="power"]', oppoRow).text());
            }
        }

        logHHAuto('Number of player in league:' + tableRow.length);
        logHHAuto('Number of opponent not fought in league:' + $('.data-list .data-row.body-row a').length);

        tableRow.each(function()
        {
            fightButton = $('a', $(this));
            if(fightButton.length > 0) {
                opponent_id = queryStringGetParam(new URL(fightButton.attr("href"),window.location.origin).search, 'id_opponent');
                let opponnent = {
                    opponent_id: opponent_id,
                    rank:  Number($('.data-column[column="place"]', $(this)).text()),
                    nickname: $('.nickname', $(this)).text(),
                    level: Number($('.data-column[column="level"]', $(this)).text()),
                    power: getPowerOrPoints(hasHHBdsmChangeBefore, $(this)),
                    player_league_points: Number($('.data-column[column="player_league_points"]', $(this)).text().replace(/\D/g, '')),
                    simuPoints :  Number($('#HHPowerCalcPoints', $(this)).text()), // not filled yet when building this list
                    stats: {}, // fill stats if needed
                    nb_boosters: $('.boosters', $(this)).children().length,
                };
                Data.push(opponnent);
            }
        });
        const hasHHBdsmChangeAfter = $('.data-column[column="power"] .matchRating').length > 0;
        if(!hasHHBdsmChangeBefore && hasHHBdsmChangeAfter) {
            logHHAuto('HH++ BDSM edit table during computation');
            if(isFirstCall) {
                logHHAuto('Try again');
                return LeagueHelper.getLeagueOpponentListData(false);
            }else {
                logHHAuto('Already called twice, stop');
                return [];
            }
        }
        if(hasHHBdsmChangeBefore) {
            // HH++ BDSM script exist
            Data.sort((a,b) => (b.power > a.power) ? 1 : ((a.power > b.power) ? -1 : 0)); // sort by higher score
        }else {
            Data.sort((a,b) => (a.power > b.power) ? 1 : ((b.power > a.power) ? -1 : 0)); // sort by lower power
        }
        return Data;
    }

    static doLeagueBattle() {
        //logHHAuto("Performing auto leagues.");
        // Confirm if on correct screen.
        const currentPower = LeagueHelper.getEnergy();
        const maxLeagueRegen = LeagueHelper.getEnergyMax();
        const leagueThreshold = Number(getStoredValue("HHAuto_Setting_autoLeaguesThreshold"));
        const autoLeaguesThreeFights = getStoredValue("HHAuto_Setting_autoLeaguesThreeFights") === "true";
        let leagueScoreSecurityThreshold = getStoredValue("HHAuto_Setting_autoLeaguesSecurityThreshold");
        if (leagueScoreSecurityThreshold) {
            leagueScoreSecurityThreshold = Number(leagueScoreSecurityThreshold);
        }else{
            leagueScoreSecurityThreshold = 40;
        }
        // const enoughChallengeForLeague = currentLeagueEnergy > leaguesThreshold && !autoLeaguesThreeFights
        // ||  (currentLeagueEnergy >= (leaguesThreshold+3) || currentLeagueEnergy >= maxLeague && currentLeagueEnergy > leaguesThreshold) && autoLeaguesThreeFights;
        var ltime;

        var page = getPage();
        const Hero=getHero();
        if(page===getHHScriptVars("pagesIDLeagueBattle"))
        {
            // On the battle screen.
            // CrushThemFights(); // TODO ??? // now managed by doBattle
        }
        else if(page === getHHScriptVars("pagesIDLeaderboard"))
        {
            logHHAuto("On leaderboard page.");
            if (getStoredValue("HHAuto_Setting_autoLeaguesCollect") === "true")
            {
                if ($('#leagues .forced_info button[rel="claim"]').length >0)
                {
                    $('#leagues .forced_info button[rel="claim"]').click(); //click reward
                    gotoPage(getHHScriptVars("pagesIDLeaderboard"))
                }
            }
            //logHHAuto('ls! '+$('h4.leagues').length);
            //$('h4.leagues').each(function(){this.click();}); // ???

            if(currentPower < 1)
            {
                logHHAuto("No power for leagues.");
                //prevent paranoia to wait for league
                setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                setTimer('nextLeaguesTime',getHHVars('Hero.energies.challenge.next_refresh_ts')+10);
                return;
            }

            logHHAuto('parsing enemies');
            var Data=LeagueHelper.getLeagueOpponentListData();
            if (Data.length==0)
            {
                ltime=35*60;
                logHHAuto('No valid targets!');
                //prevent paranoia to wait for league
                setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                setTimer('nextLeaguesTime',ltime);
            }
            else
            {
                var getPlayerCurrentLevel = LeagueHelper.getLeagueCurrentLevel();

                if (isNaN(getPlayerCurrentLevel))
                {
                    logHHAuto("Could not get current Rank, stopping League.");
                    //prevent paranoia to wait for league
                    setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    return;
                }
                var currentRank = Number($('.data-list .data-row.body-row.player-row .data-column[column="place"]').text());
                var currentScore = Number($('.data-list .data-row.body-row.player-row .data-column[column="player_league_points"]').text().replace(/\D/g, ''));
                let leagueTargetValue = Number(getStoredValue("HHAuto_Setting_autoLeaguesSelectedIndex"))+1;
                if (leagueTargetValue < Number(getPlayerCurrentLevel))
                {
                    var totalOpponents = Number($('.data-list .data-row.body-row').length)+1;
                    var maxDemote = 0;
                    if (screen.width < 1026)
                    {
                        totalOpponents = totalOpponents+1;
                    }
                    var rankDemote = totalOpponents - 14;
                    if (currentRank > (totalOpponents - 15))
                    {
                        rankDemote = totalOpponents - 15;
                    }
                    logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to demote. max rank : "+rankDemote+"/"+totalOpponents);
                    let getRankDemote = $(".data-list .data-row.body-row .data-column[column='place']:contains("+rankDemote+")").filter(function()
                                                                                                                {
                        return Number($(this).text().trim()) === rankDemote;
                    });
                    if (getRankDemote.length > 0 )
                    {
                        maxDemote = Number( $(".data-column[column='player_league_points']", getRankDemote.parent()).text().replace(/\D/g, ''));
                    }
                    else
                    {
                        maxDemote = 0;
                    }

                    logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to demote. Score should not be higher than : "+maxDemote);
                    if ( currentScore + leagueScoreSecurityThreshold >= maxDemote )
                    {
                        let league_end = LeagueHelper.getLeagueEndTime();
                        if (league_end <= (60*60)) {
                            logHHAuto("Can't do league as could go above demote, as last hour setting timer to 5 mins"); 
                            setTimer('nextLeaguesTime',Number(5*60)+1);
                        } else {
                            logHHAuto("Can't do league as could go above demote, setting timer to 30 mins");
                            setTimer('nextLeaguesTime',Number(30*60)+1);
                            //prevent paranoia to wait for league
                            setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                        }
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return;
                    }
                }

                var maxStay = -1
                var maxLeague = $("div.tier_icons img").length;
                if ( maxLeague === undefined )
                {
                    maxLeague = Leagues.length;
                }

                if (leagueTargetValue === Number(getPlayerCurrentLevel) && leagueTargetValue < maxLeague)
                {
                    var rankStay = 16;
                    if (currentRank > 15)
                    {
                        rankStay = 15;
                    }
                    logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to stay. max rank : "+rankStay);
                    let getRankStay = $(".data-list .data-row.body-row .data-column[column='place']:contains("+rankStay+")").filter(function()
                                                                                                            {
                        return Number($(this).text().trim()) === rankStay;
                    });
                    if (getRankStay.length > 0 )
                    {
                        maxStay = Number( $(".data-column[column='player_league_points']", getRankStay.parent()).text().replace(/\D/g, ''));
                    }
                    else
                    {
                        maxStay = 0;
                    }

                    logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to stay. Score should not be higher than : "+maxStay);
                    if ( currentScore + leagueScoreSecurityThreshold >= maxStay && getStoredValue("HHAuto_Setting_autoLeaguesAllowWinCurrent") !== "true")
                    {
                        logHHAuto("Can't do league as could go above stay, setting timer to 30 mins");
                        setTimer('nextLeaguesTime',Number(30*60)+1);
                        //prevent paranoia to wait for league
                        setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return;
                    }
                }
                logHHAuto(Data.length+' valid targets!');
                setStoredValue("HHAuto_Temp_autoLoop", "false");
                logHHAuto("setting autoloop to false");
                logHHAuto("Hit?" );
                // if (getStoredValue("HHAuto_Setting_autoLeaguesPowerCalc") == "true")
                if (false) // TODO Fix power calc if needed
                {
                    var oppoID = getLeagueOpponentId(Data);
                    if (oppoID == -1)
                    {
                        logHHAuto('opponent list is building next waiting');
                        //setTimer('nextLeaguesTime',2*60);
                    }
                    else
                    {
                        logHHAuto('going to crush ID : '+oppoID);
                        //week 28 new battle modification
                        //location.href = "/battle.html?league_battle=1&id_member=" + oppoID;
                        gotoPage(getHHScriptVars("pagesIDLeagueBattle"),{number_of_battles:1,id_opponent:oppoID});
                        //End week 28 new battle modification

                        clearTimer('nextLeaguesTime');
                    }
                }
                else
                {
                    logHHAuto("Going to fight " + Data[0].nickname + "(" + Data[0].opponent_id + ") with power " + Data[0].power);
                    // change referer
                    window.history.replaceState(null, '', '/leagues-pre-battle.html?id_opponent='+Data[0].opponent_id);

                    const opponents_list = getHHVars("opponents_list");
                    const opponentDataFromList = opponents_list.filter(obj => {
                        return obj.player.id_fighter == Data[0].opponent_id;
                    });

                    let numberOfFightAvailable = 0;
                    if(opponentDataFromList && opponentDataFromList.length> 0)
                        numberOfFightAvailable = LeagueHelper.numberOfFightAvailable(opponentDataFromList[0])
                    else
                        logHHAuto('ERROR opponent ' + Data[0].opponent_id + ' not found in JS list');

                    let numberOfBattle = 1;
                    if(numberOfFightAvailable > 1 && currentPower >= (numberOfFightAvailable + leagueThreshold)){
                        if(maxStay > 0 && currentScore + ( numberOfFightAvailable * leagueScoreSecurityThreshold) >= maxStay) logHHAuto('Can\'t do '+numberOfFightAvailable+' fights in league as could go above stay');
                        else numberOfBattle = numberOfFightAvailable;
                    }
                    logHHAuto("Going to fight " + numberOfBattle + " times (Number fights available from opponent:" + numberOfFightAvailable + ")");

                    if(numberOfBattle === 1) {
                        gotoPage(getHHScriptVars("pagesIDLeagueBattle"),{number_of_battles:1,id_opponent:Data[0].opponent_id});
                    } else {
                        var params1 = {
                            action: "do_battles_leagues",
                            id_opponent: Data[0].opponent_id,
                            number_of_battles: numberOfBattle
                        };
                        hh_ajax(params1, function(data) {
                            // change referer
                            window.history.replaceState(null, '', '/tower-of-fame.html');

                            RewardHelper.closeRewardPopupIfAny();

                            // gotoPage(getHHScriptVars("pagesIDLeaderboard"));
                            location.reload();
                            Hero.updates(data.hero_changes);
                        });
                    }
                }
            }
        }
        else
        {
            // Switch to the correct screen
            logHHAuto("Switching to leagues screen.");
            gotoPage(getHHScriptVars("pagesIDLeaderboard"));
            return;
        }
    }

    static getLeagueOpponentId(opponentsIDList,force=false)
    {
        var opponentsPowerList = isJSON(getStoredValue("HHAuto_Temp_LeagueOpponentList"))?JSON.parse(getStoredValue("HHAuto_Temp_LeagueOpponentList")):{expirationDate:0,opponentsList:{}};
        var opponentsTempPowerList = isJSON(getStoredValue("HHAuto_Temp_LeagueTempOpponentList"))?JSON.parse(getStoredValue("HHAuto_Temp_LeagueTempOpponentList")):{expirationDate:0,opponentsList:{}};
        var opponentsIDs= opponentsIDList;
        var oppoNumber = opponentsIDList.length;
        var DataOppo={};
        var maxTime = 1.6;

        if (Object.keys(opponentsPowerList.opponentsList).length === 0 ||  opponentsPowerList.expirationDate < new Date() || force)
        {
            sessionStorage.removeItem("HHAuto_Temp_LeagueOpponentList");
            if (Object.keys(opponentsTempPowerList.opponentsList).length > 0 && opponentsTempPowerList.expirationDate > new Date())
            {
                logHHAuto("Opponents list already started, continuing.");

                for (var i of Object.keys(opponentsTempPowerList.opponentsList))
                {
                    //removing oppo no longer in list
                    if (opponentsIDList.indexOf(i.toString()) !== -1)
                    {
                        //console.log(opponentsTempPowerList[i]);
                        DataOppo[i]=opponentsTempPowerList.opponentsList[i];
                        //console.log(JSON.stringify(DataOppo));
                        //console.log('removed');
                    }
                    //removing already done in opponentsIDList
                    //console.log(opponentsIDList.length)
                    opponentsIDList = opponentsIDList.filter(item => Number(item) !== Number(i));
                    //console.log(opponentsIDList.length)
                }
                //console.log(JSON.stringify(DataOppo));
                sessionStorage.removeItem("HHAuto_Temp_LeagueTempOpponentList");
            }
            else
            {
                logHHAuto("Opponents list not found or expired. Fetching all opponents.");
            }



            //if paranoia not is time's up and not in paranoia spendings
            if (!checkTimer("paranoiaSwitch"))
            {
                let addedTime=opponentsIDList.length*maxTime;
                logHHAuto("Adding time to burst to cover building list : +"+addedTime+"secs");
                addedTime += getSecondsLeft("paranoiaSwitch");
                setTimer("paranoiaSwitch",addedTime);
            }
            getOpponents();
            return -1;
        }
        else
        {
            logHHAuto("Found valid opponents list, using it.")
            return FindOpponent(opponentsPowerList,opponentsIDs);
        }

        function getOpponents()
        {
            //logHHAuto('Need to click: '+ToClick.length);
            var findText = 'playerLeaguesData = ';
            let league_end = LeagueHelper.getLeagueEndTime();
            let maxLeagueListDurationSecs = getHHScriptVars("LeagueListExpirationSecs");
            if (league_end !== -1 && league_end < maxLeagueListDurationSecs)
            {
                maxLeagueListDurationSecs = league_end;
            }
            if (maxLeagueListDurationSecs <1)
            {
                maxLeagueListDurationSecs = 1;
            }
            // TODO fixme
            let listExpirationDate =isJSON(getStoredValue("HHAuto_Temp_LeagueTempOpponentList"))?JSON.parse(getStoredValue("HHAuto_Temp_LeagueTempOpponentList")).expirationDate:new Date().getTime() + maxLeagueListDurationSecs * 1000;
            if (opponentsIDList.length>0)
            {
                //logHHAuto('getting data for opponent : '+opponentsIDList[0]);
                //logHHAuto({log:"Opponent list",opponentsIDList:opponentsIDList});
                $.post('/ajax.php',
                    {
                    action: 'leagues_get_opponent_info',
                    opponent_id: opponentsIDList[0]
                },
                    function(data)
                    {
                    //logHHAuto({log:"data for oppo",data:data});
                    var opponentData = data.player;
                    //console.log(opponentData);
                    const players=LeagueHelper.getLeaguePlayersData(getHHVars("hero_fighter"),opponentData);

                    //console.log(player,opponent);
                    let simu = calculateBattleProbabilities(players.player, players.opponent);
                    //console.log(opponent);
                    //console.log(simu);
                    //matchRating=customMatchRating(simu);

                    //matchRating = Number(matchRating.substring(1));
                    //logHHAuto('matchRating:'+matchRating);
                    //if (!isNaN(matchRating))
                    //{
                    DataOppo[Number(opponentData.id_fighter)]=simu;
                    setStoredValue("HHAuto_Temp_LeagueTempOpponentList", JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo}));
                    //}
                    //DataOppo.push(JSON.parse(data.html.substring(data.html.indexOf(findText)+findText.length,data.html.lastIndexOf(';'))));

                });

                opponentsIDList.shift();
                LeagueHelper.LeagueUpdateGetOpponentPopup(Object.keys(DataOppo).length+'/'+oppoNumber, toHHMMSS((oppoNumber-Object.keys(DataOppo).length)*maxTime));
                setTimeout(getOpponents,randomInterval(800,maxTime*1000));

                window.top.postMessage({ImAlive:true},'*');
            }
            else
            {
                //logHHAuto('nothing to click, checking data');

                //logHHAuto(DataOppo);
                sessionStorage.removeItem("HHAuto_Temp_LeagueTempOpponentList");
                setStoredValue("HHAuto_Temp_LeagueOpponentList", JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo}));
                LeagueHelper.LeagueClearDisplayGetOpponentPopup();
                //doLeagueBattle();
                logHHAuto("Building list finished, putting autoloop back to true.");
                setStoredValue("HHAuto_Temp_autoLoop", "true");
                setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
            }
        }

        function FindOpponent(opponentsPowerList,opponentsIDList)
        {
            var maxScore = -1;
            var IdOppo = -1;
            var OppoScore;
            logHHAuto('finding best chance opponent in '+opponentsIDList.length);
            for (var oppo of opponentsIDList)
            {
                //logHHAuto({Opponent:oppo,OppoGet:Number(opponentsPowerList.get(oppo)),maxScore:maxScore});
                const oppoSimu = opponentsPowerList.opponentsList[Number(oppo)];
                if (oppoSimu === undefined)
                {
                    continue;
                }
                OppoScore = Number(oppoSimu.win);
                if (( maxScore == -1 || OppoScore > maxScore ) && !isNaN(OppoScore))
                {

                    maxScore = OppoScore;
                    IdOppo = oppo;
                }
            }
            logHHAuto("highest score opponent : "+IdOppo+'('+nRounding(100*maxScore, 2, -1)+'%)');
            return IdOppo;
        }
        return true;
    }

    

    static LeagueDisplayGetOpponentPopup(numberDone,remainingTime)
    {
        $("#leagues #leagues_middle").prepend('<div id="popup_message_league" class="HHpopup_message" name="popup_message_league" ><a id="popup_message_league_close" class="close">&times;</a>'+getTextForUI("OpponentListBuilding","elementText")+' : <br>'+numberDone+' '+getTextForUI("OpponentParsed","elementText")+' ('+remainingTime+')</div>');
        document.getElementById("popup_message_league_close").addEventListener("click", function()
                                                                            {
            location.reload();
        });
    }

    static LeagueClearDisplayGetOpponentPopup()
    {
        $("#popup_message_league").each(function(){this.remove();});
    }

    static LeagueUpdateGetOpponentPopup(numberDone,remainingTime)
    {
        LeagueHelper.LeagueClearDisplayGetOpponentPopup();
        LeagueHelper.LeagueDisplayGetOpponentPopup(numberDone,remainingTime);
    }
}