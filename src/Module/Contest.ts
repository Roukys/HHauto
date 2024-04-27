import {
    ConfigHelper,
    TimeHelper,
    checkTimer,
    checkTimerMustExist,
    getPage,
    getStoredValue,
    getTimeLeft,
    setTimer
} from '../Helper/index';
import { gotoPage } from "../Service/index";
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

export class Contest {
    static getPinfo() {
        const color = getStoredValue(HHStoredVarPrefixKey + "Setting_waitforContest") !== "true" ? 'white' : TimeHelper.canCollectCompetitionActive() ? 'LimeGreen' : 'red';
        return `<li style='color:${color}'>Contest end : ${getTimeLeft('contestRemainingTime')}  / Next : ${getTimeLeft('nextContestTime')}</li>`;
    }
    static run(){
        if(getPage() !== ConfigHelper.getHHScriptVars("pagesIDContests"))
        {
            logHHAuto("Navigating to contests page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDContests"));
            // return busy
            return true;
        }
        else
        {
            logHHAuto("On contests page.");
            logHHAuto("Collecting finished contests's reward.");
            let contest_list = $(".contest .ended button[rel='claim']");
            if ( contest_list.length > 0)
            {
                logHHAuto("Collected legendary contest id : "+contest_list[0].getAttribute('id_contest')+".");
                contest_list[0].click();
                if ( contest_list.length > 1 )
                {
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDContests"));
                    return true;
                }
            }

            return Contest.setTimers();
        }
    }
    static setTimers(): boolean {
        if (getPage() !== ConfigHelper.getHHScriptVars("pagesIDContests")) {
            logHHAuto("Navigating to contests page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDContests"));
            // return busy
            return true;
        }
        else {
            try{
                const nextContestTime = unsafeWindow.contests_timer.next_contest;
                const remaining_time = unsafeWindow.contests_timer.remaining_time;
                setTimer('contestRemainingTime', remaining_time);
                setTimer('nextContestTime', nextContestTime);
            } catch (err) {
                logHHAuto('ERROR getting next contest timers, ignore...');
                setTimer('contestRemainingTime', 3600);
                setTimer('nextContestTime', 4000);
            }
            // Not busy
            return false;
        }
    }
    static waitContestActive(){
        return !checkTimerMustExist('contestRemainingTime') && checkTimerMustExist('nextContestTime');
    }
    static styles(){
        if(getStoredValue(HHStoredVarPrefixKey+"Setting_compactEndedContests") === "true")
        {
            const contestsContainerPath = '#contests > div > div.left_part > .scroll_area > .contest > .contest_header.ended';
            GM_addStyle(contestsContainerPath + ' {'
                + 'height: 50px;'
                + 'font-size: 0.7rem;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .contest_title {'
                + 'font-size: 14px;'
                + 'left: 140px;'
                + 'bottom: 24px;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .personal_rewards {'
                + 'height: 40px;'
                + 'margin-top: -42px;'
                + 'padding-top: 1px;'
                + 'width: 380px;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .personal_rewards > button {'
                + 'height: 23px;'
                + 'margin-right: 241px;'
                + 'margin-top: -6px;'
                + 'width: 120px;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .contest_expiration_timer {'
                + 'bottom: 95px;'
            +'}');
        }
    }
}