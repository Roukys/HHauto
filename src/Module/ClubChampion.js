import {
    TimeHelper,
    getHHScriptVars,
    getHHVars,
    getPage,
    getStoredValue,
    randomInterval,
    setTimer
} from "../Helper";
import { gotoPage } from "../Service";
import { logHHAuto } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";
import { QuestHelper } from "./Quest";

export class ClubChampion {

    static getNextClubChampionTimer()
    {
        var page=getPage();
        if (page==getHHScriptVars("pagesIDClub"))
        {
            let SecsToNextTimer = -1;
            let restTeamFilter = "div.club_champions_details_container div.team_rest_timer[data-rest-timer]";
            let restChampionFilter = "div.club_champions_details_container div.champion_rest_timer[data-rest-timer]";
    
            if ($(restTeamFilter).length > 0)
            {
                SecsToNextTimer = Number($(restTeamFilter).attr("data-rest-timer"));
                logHHAuto("Team is resting for : "+TimeHelper.toHHMMSS(SecsToNextTimer));
            }
            else if ($(restChampionFilter).length > 0)
            {
                SecsToNextTimer = Number($(restChampionFilter).attr("data-rest-timer"));
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
        if (page==getHHScriptVars("pagesIDClub"))
        {
            logHHAuto('on clubs');
            let secsToNextTimer = ClubChampion.getNextClubChampionTimer();
            let noTimer = (secsToNextTimer === -1);
    
            if (secsToNextTimer === -1)
            {
                setTimer('nextClubChampionTime', randomInterval(15*60, 17*60));
            }
            else if (secsToNextTimer > 3600 && getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubForceStart") === "true")
            {
                setTimer('nextClubChampionTime', randomInterval(50*60, 70*60));
            }
            else
            {
                setTimer('nextClubChampionTime', randomInterval(secsToNextTimer, 180 + secsToNextTimer) );
            }
            return noTimer;
        }
        return true;
    }
    
    static doClubChampionStuff()
    {
        var page=getPage();
        if (page==getHHScriptVars("pagesIDClubChampion"))
        {
            logHHAuto('on club_champion page');
            if ($('button[rel=perform].blue_button_L').length==0)
            {
                logHHAuto('Something is wrong!');
                setTimer('nextClubChampionTime', randomInterval(15*60, 17*60));
                gotoPage(getHHScriptVars("pagesIDHome"));
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
                    setTimer('nextClubChampionTime', randomInterval(15*60, 17*60));
                    return false;
                }
                else
                {
                    if (TCount!=0)
                    {
                        logHHAuto("Using ticket");
                        $('button[rel=perform].blue_button_L').click();
                        setTimer('nextClubChampionTime', randomInterval(15*60, 17*60));
                    }
                    gotoPage(getHHScriptVars("pagesIDClub"));
                    return true;
                }
            }
        }
        else if (page==getHHScriptVars("pagesIDClub"))
        {
            logHHAuto('on clubs');
            const onChampTab = $("div.club-champion-members-challenges:visible").length === 1;
            if (!onChampTab) {
                logHHAuto('Click champions tab');
                $("#club_champions_tab").click();
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
                    gotoPage(getHHScriptVars("pagesIDClubChampion"));
                    return true;
                }
                else
                {
                    logHHAuto("Max tickets to use on Club Champ reached.");
                    setTimer('nextClubChampionTime', randomInterval(60*60, 65*60));
                }
    
            }
            ClubChampion.updateClubChampionTimer();
            gotoPage(getHHScriptVars("pagesIDHome"));
            return false;
        }
        else
        {
            gotoPage(getHHScriptVars("pagesIDClub"));
            return true;
        }
    }
}