import {
    TimeHelper,
    getHHScriptVars,
    getPage,
    getStoredValue,
    randomInterval,
    setTimer
} from "../Helper";
import { gotoPage } from "../Service";
import { logHHAuto } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";

export class Contest {
    // returns boolean to set busy
    static run(){
        if(getPage() !== getHHScriptVars("pagesIDContests"))
        {
            logHHAuto("Navigating to contests page.");
            gotoPage(getHHScriptVars("pagesIDContests"));
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
                    gotoPage(getHHScriptVars("pagesIDContests"));
                }
            }
    
            var time = TimeHelper.getSecondsLeftBeforeNewCompetition() + randomInterval(30*60, 35*60); // 30 min after new compet
            setTimer('nextContestTime',time);
            // Not busy
            return false;
        }
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