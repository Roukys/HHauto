import {
    TimeHelper,
    convertTimeToInt,
    deleteStoredValue,
    ConfigHelper,
    getHHVars,
    getPage,
    getSecondsLeft,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer
} from '../Helper/index';
import { gotoPage } from "../Service/index";
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { QuestHelper } from "./Quest";

export class ClubChampion {

    static getNextClubChampionTimer()
    {
        var page=getPage();
        if (page==ConfigHelper.getHHScriptVars("pagesIDClub"))
        {
            let SecsToNextTimer = -1;
            let restTeamFilter = 'div.club_champions_details_container div.team_rest_timer span[rel="expires"]';
            let restChampionFilter = 'div.club_champions_details_container div.champion_rest_timer span[rel="expires"]';
    
            if ($(restTeamFilter).length > 0)
            {
                SecsToNextTimer = Number(convertTimeToInt($(restTeamFilter).text()));
                logHHAuto("Team is resting for : "+TimeHelper.toHHMMSS(SecsToNextTimer));
            }
            else if ($(restChampionFilter).length > 0)
            {
                SecsToNextTimer = Number(convertTimeToInt($(restChampionFilter).text()));
                logHHAuto("Champion is resting for : "+TimeHelper.toHHMMSS(SecsToNextTimer));
            }
            else {
                logHHAuto('No timer found');
            }
            logHHAuto('on clubs, next timer:'+ SecsToNextTimer);
            return SecsToNextTimer;
        }
        return 0; // -1 is only when no timer on club page
    }
    
    static updateClubChampionTimer()
    {
        var page=getPage();
        if (page==ConfigHelper.getHHScriptVars("pagesIDClub"))
        {
            logHHAuto('on clubs');
            let secsToNextTimer = ClubChampion.getNextClubChampionTimer();
            let noTimer = (secsToNextTimer === -1);
            let nextClubChampionTime: number;
    
            if (secsToNextTimer === -1)
            {
                nextClubChampionTime = randomInterval(15*60, 17*60);
            }
            else if (secsToNextTimer > 3600 && getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubForceStart") === "true")
            {
                nextClubChampionTime = randomInterval(50*60, 70*60);
            }
            else
            {
                nextClubChampionTime = randomInterval(secsToNextTimer, 180 + secsToNextTimer);
            }
            ClubChampion._setTimer(nextClubChampionTime);
            return noTimer;
        }
        return true;
    }

    /** From club champion page */
    static getRemainingRestTime(): number{
        let remainingRestTime = 0;
        
        let timerElm = $('.champions-bottom__rest .timer span[rel=expires]').text();
        if (timerElm !== undefined && timerElm !== null && timerElm.length > 0) {
            remainingRestTime = Number(convertTimeToInt(timerElm));
        }
        return remainingRestTime;
    }

    static hasGirlReward(): boolean{
        return $('#club_champions .club_champions_rewards_container .slot.slot_girl_shards').length > 0
    }

    static resetTimerIfNeeded(){
        if ($('button[rel=perform].blue_button_L').length>0 && $('.champions-bottom__rest').length == 0
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubChamp") === "true") {
            const champTimeLeft = getSecondsLeft('nextClubChampionTime');
            if (champTimeLeft > 60) {
                logHHAuto("Club champion seems available, reduce next timer to 30-60s.");
                ClubChampion._setTimer(randomInterval(30, 60));
            }
        }
    }

    static doClubChampionStuff(): boolean
    {
        var page=getPage();
        if (page==ConfigHelper.getHHScriptVars("pagesIDClubChampion"))
        {
            logHHAuto('on club_champion page');
            if ($('button[rel=perform].blue_button_L').length==0)
            {
                if($('.champions-bottom__rest').length > 0) {
                    logHHAuto('Girls are resting');
                    const restTime = ClubChampion.getRemainingRestTime();
                    ClubChampion._setTimer(randomInterval(restTime + 10, restTime + 2*60));
                } else {
                    logHHAuto('Something is wrong!');
                    ClubChampion._setTimer(randomInterval(15*60, 17*60));
                }
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                return true;
            }
            else
            {
                var TCount=Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
                var ECount= QuestHelper.getEnergy();
                logHHAuto("T:"+TCount+" E:"+ECount)
                if ( TCount==0)
                {
                    logHHAuto("No tickets!");
                    const nextTime = randomInterval(3600, 4000);
                    if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoChamps") ==="true") {
                        // No ticket for boths
                        setTimer('nextChampionTime', nextTime);
                    }
                    setTimer('nextClubChampionTime', nextTime);
                    return false;
                }
                else
                {
                    if (TCount!=0)
                    {
                        logHHAuto("Using ticket");
                        $('button[rel=perform].blue_button_L').trigger('click');
                        ClubChampion._setTimer(randomInterval(15*60, 17*60));
                    }
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDClub"));
                    return true;
                }
            }
        }
        else if (page==ConfigHelper.getHHScriptVars("pagesIDClub"))
        {
            deleteStoredValue(HHStoredVarPrefixKey+"Temp_clubChampLimitReached");
            logHHAuto('on clubs');
            const onChampTab = $("div.club-champion-members-challenges:visible").length === 1;
            if (!onChampTab) {
                logHHAuto('Click champions tab');
                $("#club_champions_tab").trigger('click');
            }
    
            let Started = $("div.club-champion-members-challenges .player-row").length === 1;
            let secsToNextTimer = ClubChampion.getNextClubChampionTimer();
            let noTimer = secsToNextTimer === -1;
    
            if ((Started || getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubForceStart") === "true") && noTimer)
            {
                let ticketUsed = 0;
                let ticketsUsedRequest = "div.club-champion-members-challenges .player-row .data-column:nth-of-type(3)";
                if ($(ticketsUsedRequest).length >0)
                {
                    ticketUsed = Number($(ticketsUsedRequest)[0].innerText.replace(/[^0-9]/gi, ''));
                }
                let maxTickets = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubChampMax"));
                //console.log(maxTickets, ticketUsed);
                if (maxTickets > ticketUsed )
                {
                    logHHAuto("Let's do him!");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDClubChampion"));
                    return true;
                }
                else
                {
                    logHHAuto("Max tickets to use on Club Champ reached.");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_clubChampLimitReached", "true");
                    setTimer('nextClubChampionTime', randomInterval(4*60*60, 5*60*60));
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    return false;
                }
    
            }
            ClubChampion.updateClubChampionTimer();
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            return false;
        }
        else
        {
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDClub"));
            return true;
        }
    }

    /**
     * 
     * @param {number} nextClubChampionTime 
     * @private
     */
    static _setTimer(nextClubChampionTime){
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoChamps") ==="true" && getStoredValue(HHStoredVarPrefixKey+"Setting_autoChampAlignTimer") === "true") {
            const champTimeLeft = getSecondsLeft('nextChampionTime');
            if(nextClubChampionTime > 10 && champTimeLeft < 1200 && nextClubChampionTime < 1200) { // align settings
                // 20 min for standard wait time
                nextClubChampionTime = Math.max(nextClubChampionTime, champTimeLeft);
            }
        }
        setTimer('nextClubChampionTime', nextClubChampionTime);
    }
}