import {
    BDSMHelper,
    RewardHelper,
    TimeHelper,
    calculateBattleProbabilities,
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
    getTimeLeft,
    nRounding,
    parsePrice,
    queryStringGetParam,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { autoLoop, checkParanoiaSpendings, gotoPage } from "../Service";
import { isJSON, logHHAuto } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";
import { BDSMSimu, KKLeagueOpponent, LeagueOpponent } from "../model";
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
        const forceOneFight = getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesForceOneFight") === 'true';
        if(forceOneFight) return 1;
        // remove match_history after w32 update
        const matchs = opponent.match_history ? opponent.match_history[opponent.player.id_fighter]: opponent.match_history_sorting[opponent.player.id_fighter];
        return matchs ? matchs.filter(match=>match == null).length : 0
    }
    static getLeagueCurrentLevel()
    {
        if(unsafeWindow.current_tier_number === undefined)
        {
            setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")))
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

    /**
     * @returns {BDSMSimu}
     */
    static getSimPowerOpponent(heroFighter, opponents) {
        let leaguePlayers = BDSMHelper.getBdsmPlayersData(heroFighter, opponents.player, true);
        let simu = calculateBattleProbabilities(leaguePlayers.player, leaguePlayers.opponent);

        const oppoPoints = simu.points;
        let expectedValue = 0;
        for (let i=25; i>=3; i--) {
            if (oppoPoints[i]) {
                expectedValue += i*oppoPoints[i];
            }
        }
        simu.expectedValue = expectedValue;
        return simu;
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
        return getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20;
    }

    static getPinfo() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesRunThreshold"));

        let Tegzd = '';
        const boostLimited = getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
        if (boostLimited) {
            Tegzd += '<li style="color:red!important;" title="'+getTextForUI("boostMissing","elementText")+'">';
        } else {
            Tegzd += '<li>';
        }
        Tegzd += getTextForUI("autoLeaguesTitle","elementText")+' ' + LeagueHelper.getEnergy()+'/'+LeagueHelper.getEnergyMax();
        if (runThreshold > 0) {
            Tegzd += ' ('+threshold+'<'+LeagueHelper.getEnergy()+'<'+runThreshold+')';
        }
        if(runThreshold > 0  && LeagueHelper.getEnergy() < runThreshold) {
            Tegzd += ' ' + getTextForUI("waitRunThreshold","elementText");
        }else {
            Tegzd += ' : ' + getTimeLeft('nextLeaguesTime');
        }
        if (boostLimited) {
            Tegzd += ' ' + getTextForUI("boostMissing","elementText") + '</li>';
        } else {
            Tegzd += '</li>';
        }
        return Tegzd;
    }

    static isTimeToFight(){
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesRunThreshold"));
        const humanLikeRun = getStoredValue(HHStoredVarPrefixKey+"Temp_LeagueHumanLikeRun") === "true";
        const league_end = LeagueHelper.getLeagueEndTime();
        if (league_end > 0 && league_end <= (60*60)) {
            // Last league hour //TODO
            logHHAuto("Last League hour");
        }
        const energyAboveThreshold = humanLikeRun && LeagueHelper.getEnergy() > threshold || LeagueHelper.getEnergy() > Math.max(threshold, runThreshold-1);
        const paranoiaSpending = LeagueHelper.getEnergy() > 0 && Number(checkParanoiaSpendings('challenge')) > 0;
        const needBoosterToFight = getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();
        // logHHAuto('League:', {threshold: threshold, runThreshold:runThreshold, energyAboveThreshold: energyAboveThreshold});

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

        if ($("#popup_message_league").length >0 || getStoredValue(HHStoredVarPrefixKey+"Setting_leagueListDisplayPowerCalc") !== "true")
        {
            return;
        }

        const opponentButtons = $('a.go_pre_battle.blue_button_L');
        const opponentSim = $("div.matchRatingNew img.powerLevelScouter");
        const allOpponentsSimDisplayed = (opponentSim.length >= opponentButtons.length);
        const Hero=getHero();
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';


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
            let heroFighter = opponents_list.find((el) => el.player.id_fighter == Hero.infos.id).player;

            const containsSimuScore = function(opponents) { return $('a[href*="id_opponent='+opponents.player.id_fighter+'"] .matchRatingNew').length > 0;}
            const containsOcdScore = function(opponents) { return $('.matchRating', $('a[href*="id_opponent='+opponents.player.id_fighter+'"]').parent()).length > 0;}
            let opponentsPowerList = LeagueHelper._getTempLeagueOpponentList();
            let opponentsPowerListChanged = false;

            for(let opponentIndex = 0;opponentIndex < opponents_list.length ; opponentIndex++)
            {
                /**
                 * @type {KKLeagueOpponent}
                 */
                let opponents = opponents_list[opponentIndex];
                if (LeagueHelper.numberOfFightAvailable(opponents) > 0 && !containsSimuScore(opponents) && !containsOcdScore(opponents)) {
                    let simu;
                    let leagueOpponent;
                    if(opponentsPowerList && opponentsPowerList.opponentsList.length > 0) {
                        try{
                            leagueOpponent = opponentsPowerList.opponentsList.find((el) => el.opponent_id == opponents.player.id_fighter);
                            if(leagueOpponent) simu = leagueOpponent.simu;
                        }catch(error){
                            logHHAuto("Error when getting oppo " + opponents.player.id_fighter +"from storage");
                            if(debugEnabled) logHHAuto(error);
                        }
                    }
                    if(!simu) {
                        simu = LeagueHelper.getSimPowerOpponent(heroFighter, opponents); 
                        leagueOpponent = new LeagueOpponent(
                            opponents.player.id_fighter,
                            opponents.place,
                            opponents.nickname,
                            opponents.level,
                            opponents.power,
                            opponents.player_league_points,
                            Number(nRounding(simu.expectedValue, 1, -1)),
                            0, // Boster numbers?
                            opponents,
                            simu
                        );

                        opponentsPowerList.opponentsList.push(leagueOpponent);
                        opponentsPowerListChanged = true;
                    }
                    
                    LeagueHelper.displayOppoSimuOnButton(opponents.player.id_fighter, simu);
                }
            }
            
            if(opponentsPowerListChanged) {
                logHHAuto('Save opponent list for later');
                setStoredValue(HHStoredVarPrefixKey+"Temp_LeagueOpponentList", JSON.stringify(opponentsPowerList));
            }
            
            //CSS
        }

        SimPower();

        let listUpdateStatus='<div style="position: absolute;left: 720px;top: 0px;width:100px;" class="tooltipHH" id="HHListUpdate"></div>';
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
                    deleteStoredValue(HHStoredVarPrefixKey+"Temp_LeagueTempOpponentList");
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
            (document.getElementById("beaten_opponents") === null && document.getElementById("league_filter") === null ) // button from HH OCD script
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

            let hideBeatenOppo = getStoredValue(HHStoredVarPrefixKey+"Temp_hideBeatenOppo");
            if (!hideBeatenOppo) {
                hideBeatenOppo = 0;
                setStoredValue(HHStoredVarPrefixKey+"Temp_hideBeatenOppo", hideBeatenOppo);
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
                    setStoredValue(HHStoredVarPrefixKey+"Temp_hideBeatenOppo", hideBeatenOppo);
                    $('#HideBeatenOppo').html(getTextForUI("display","elementText"));
                }
                else {
                    displayBeatenOpponents();
                    hideBeatenOppo = 0;
                    setStoredValue(HHStoredVarPrefixKey+"Temp_hideBeatenOppo", hideBeatenOppo);
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

    static _getTempLeagueOpponentList() {
        const maxLeagueListDurationSecs = getHHScriptVars("LeagueListExpirationSecs");
        let opponentsPowerList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_LeagueOpponentList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LeagueOpponentList")):{expirationDate:0,opponentsList:[]};
        if (Object.keys(opponentsPowerList.opponentsList).length === 0 ||  opponentsPowerList.expirationDate < new Date())
        {
            sessionStorage.removeItem(HHStoredVarPrefixKey+"Temp_LeagueOpponentList");
            opponentsPowerList.expirationDate = new Date().getTime() + maxLeagueListDurationSecs * 1000;
        } else {
            logHHAuto('Found valid opponent list in storage, reuse it');
        }
        return opponentsPowerList;
    }

    /**
     * @returns {LeagueOpponent[]}
     */
    static getLeagueOpponentListData(isFirstCall = true)
    { 
        /**
         * @type {LeagueOpponent[]}
         */
        let Data=[];
        let opponent_id;
        let fightButton;
        let opponentsPowerList;

        const usePowerCalc = getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesPowerCalc") === 'true';
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';
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

        logHHAuto('Number of player in league:' + tableRow.length + '. Number of opponent not fought in league:' + $('.data-list .data-row.body-row a').length);

        const opponents_list = getHHVars("opponents_list");
        let heroFighter;
        if (usePowerCalc) {
            opponentsPowerList = LeagueHelper._getTempLeagueOpponentList()

            try {
                heroFighter = opponents_list?.find((el) => el.player.id_fighter == Hero.infos.id).player
            } catch (error) {
                logHHAuto('Error, falback to not use powercalc');
                if(debugEnabled) logHHAuto(error);
                usePowerCalc = false;
            }
        }

        let canUseSimu = usePowerCalc && !!opponents_list && !!heroFighter;
        tableRow.each(function()
        {
            fightButton = $('a', $(this));
            if(fightButton.length > 0) {
                opponent_id = queryStringGetParam(new URL(fightButton.attr("href"),window.location.origin).search, 'id_opponent');

                let leagueOpponent;
                if(opponentsPowerList && opponentsPowerList.opponentsList.length > 0) {
                    try{
                        leagueOpponent = opponentsPowerList.opponentsList.find((el) => el.opponent_id == opponent_id);
                    }catch(error){
                        logHHAuto("Error when getting oppo " + opponent_id +" from storage");
                    }
                }
                if(!leagueOpponent) {
                    let expectedPoints = 0;
                    let opponents;
                    /**
                     * @type {BDSMSimu}
                     */
                    let simu = {};
                    if(canUseSimu) {
                        try{
                            opponents = opponents_list.find((el) => el.player.id_fighter == opponent_id);
                            simu = LeagueHelper.getSimPowerOpponent(heroFighter, opponents); 
                            expectedPoints = Number(nRounding(simu.expectedValue, 1, -1));
                        }catch(error){
                            logHHAuto("Error in simu for oppo " + opponent_id +", falback to not use powercalc");
                            canUseSimu = false;
                        }
                    }

                    leagueOpponent = new LeagueOpponent(
                        opponent_id,
                        Number($('.data-column[column="place"]', $(this)).text()),
                        $('.nickname', $(this)).text(),
                        Number($('.data-column[column="level"]', $(this)).text()),
                        getPowerOrPoints(hasHHBdsmChangeBefore, $(this)),
                        Number($('.data-column[column="player_league_points"]', $(this)).text().replace(/\D/g, '')),
                        expectedPoints,
                        $('.boosters', $(this)).children().length,
                        opponents,
                        simu
                    );
                }
                Data.push(leagueOpponent);
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
        if(canUseSimu) {
            Data.sort((a,b) => (b.simuPoints > a.simuPoints) ? 1 : ((a.simuPoints > b.simuPoints) ? -1 : 0)); // sort by higher score
        } else {
            if(hasHHBdsmChangeBefore) {
                // HH++ BDSM script exist
                Data.sort((a,b) => (b.power > a.power) ? 1 : ((a.power > b.power) ? -1 : 0)); // sort by higher score
            }else {
                Data.sort((a,b) => (a.power > b.power) ? 1 : ((b.power > a.power) ? -1 : 0)); // sort by lower power
            }
        }
        if (usePowerCalc) {
            logHHAuto('Save opponent list for later');
            setStoredValue(HHStoredVarPrefixKey+"Temp_LeagueOpponentList", JSON.stringify({expirationDate:opponentsPowerList.expirationDate,opponentsList:Data}));
        }
        return Data;
    }

    static doLeagueBattle() {
        //logHHAuto("Performing auto leagues.");
        // Confirm if on correct screen.
        const currentPower = LeagueHelper.getEnergy();
        const maxLeagueRegen = LeagueHelper.getEnergyMax();
        const leagueThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesThreshold"));
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';
        let leagueScoreSecurityThreshold = getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesSecurityThreshold");
        if (leagueScoreSecurityThreshold) {
            leagueScoreSecurityThreshold = Number(leagueScoreSecurityThreshold);
        }else{
            leagueScoreSecurityThreshold = 40;
        }

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
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesCollect") === "true")
            {
                if ($('#leagues .forced_info button[rel="claim"]').length >0)
                {
                    $('#leagues .forced_info button[rel="claim"]').click(); //click reward
                    gotoPage(getHHScriptVars("pagesIDLeaderboard"))
                }
            }

            logHHAuto('parsing enemies');
            var Data=LeagueHelper.getLeagueOpponentListData();
            const league_end = LeagueHelper.getLeagueEndTime();

            if(currentPower < 1 && Data.length > 0)
            {
                logHHAuto("No power for leagues.");
                //prevent paranoia to wait for league
                setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaLeagueBlocked", "true");
                const next_refresh = getHHVars('Hero.energies.challenge.next_refresh_ts')
                setTimer('nextLeaguesTime', randomInterval(next_refresh+10, next_refresh + 3*60));
                return;
            }

            if (Data.length==0)
            {
                logHHAuto('No valid targets! Set timer to league ends.');
                //prevent paranoia to wait for league
                setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaLeagueBlocked", "true");
                setTimer('nextLeaguesTime', randomInterval(league_end - 5*60, league_end));
            }
            else
            {
                var getPlayerCurrentLevel = LeagueHelper.getLeagueCurrentLevel();

                if (isNaN(getPlayerCurrentLevel))
                {
                    logHHAuto("Could not get current Rank, stopping League.");
                    //prevent paranoia to wait for league
                    setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaLeagueBlocked", "true");
                    setTimer('nextLeaguesTime', randomInterval(30*60, 35*60));
                    return;
                }
                var currentRank = Number($('.data-list .data-row.body-row.player-row .data-column[column="place"]').text());
                var currentScore = Number($('.data-list .data-row.body-row.player-row .data-column[column="player_league_points"]').text().replace(/\D/g, ''));
                let leagueTargetValue = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesSelectedIndex"))+1;
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
                        if (league_end <= (60*60)) {
                            logHHAuto("Can't do league as could go above demote, as last hour setting timer to 5 mins"); 
                            setTimer('nextLeaguesTime', randomInterval(5*60, 8*60));
                        } else {
                            logHHAuto("Can't do league as could go above demote, setting timer to 30 mins");
                            setTimer('nextLeaguesTime', randomInterval(30*60, 35*60));
                        }
                        //prevent paranoia to wait for league
                        setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaLeagueBlocked", "true");
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
                    if ( currentScore + leagueScoreSecurityThreshold >= maxStay && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesAllowWinCurrent") !== "true")
                    {
                        logHHAuto("Can't do league as could go above stay, setting timer to 30 mins");
                        setTimer('nextLeaguesTime', randomInterval(30*60, 35*60));
                        //prevent paranoia to wait for league
                        setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaLeagueBlocked", "true");
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return;
                    }
                }
                logHHAuto(Data.length+' valid targets!');
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                logHHAuto("setting autoloop to false");
                logHHAuto("Hit?" );

                const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesRunThreshold"));
                if (runThreshold > 0) {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_LeagueHumanLikeRun", "true");
                }

                logHHAuto("Going to fight " + Data[0].nickname + "(" + Data[0].opponent_id + ") with power " + Data[0].power);
                if(debugEnabled) logHHAuto(JSON.stringify(Data[0]));
                // change referer
                window.history.replaceState(null, '', '/leagues-pre-battle.html?id_opponent='+Data[0].opponent_id);

                const opponents_list = getHHVars("opponents_list");
                const opponentDataFromList = opponents_list.filter(obj => {
                    return obj.player.id_fighter == Data[0].opponent_id;
                });
                if(debugEnabled) logHHAuto("opponentDataFromList ", JSON.stringify(opponentDataFromList));

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

                if(numberOfBattle <= 1) {
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
        else
        {
            // Switch to the correct screen
            logHHAuto("Switching to leagues screen.");
            gotoPage(getHHScriptVars("pagesIDLeaderboard"));
            return;
        }
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