import {
    getHHScriptVars,
    getHHVars,
    getPage,
    queryStringGetParam,
    setStoredValue,
    setTimer
} from "../Helper";
import { gotoPage } from "../Service";
import { logHHAuto } from "../Utils";

export class Pantheon {
    static run()
    {
        logHHAuto("Performing auto Pantheon.");
        // Confirm if on correct screen.
        var page = getPage();
        var current_worship = getHHVars('Hero.energies.worship.amount');
        if(page === getHHScriptVars("pagesIDPantheon"))
        {
            logHHAuto("On pantheon page.");
            logHHAuto("Remaining worship : "+ current_worship);
            if ( current_worship > 0 )
            {
                let pantheonButton = $("#pantheon_tab_container .bottom-container a.blue_button_L.pantheon-pre-battle-btn");
                let templeID = queryStringGetParam(new URL(pantheonButton[0].getAttribute("href"),window.location.origin).search, 'id_opponent');
                if (pantheonButton.length > 0 && templeID !== null )
                {
                    logHHAuto("Going to fight Temple : "+templeID);
                    gotoPage(getHHScriptVars("pagesIDPantheonPreBattle"),{id_opponent:templeID});
                }
                else
                {
                    logHHAuto("Issue to find templeID retry in 60secs.");
                    setTimer('nextPantheonTime',60);
                    gotoPage(getHHScriptVars("pagesIDHome"));
                }
            }
            else
            {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                {
                    setTimer('nextPantheonTime',15*60);
                }
                else
                {
                    setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts') + 10);
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            return;
            //<button id="claim_btn_s" class="bordeaux_button_s" style="z-index: 1000; visibility: visible;">Claim</button>
        }
        else if (page === getHHScriptVars("pagesIDPantheonPreBattle"))
        {
            logHHAuto("On pantheon-pre-battle page.");
            let templeID = queryStringGetParam(window.location.search,'id_opponent');
            logHHAuto("Go and fight temple :"+templeID);
            let pantheonTempleBattleButton =$("#pre-battle .battle-buttons a.green_button_L.battle-action-button.pantheon-single-battle-button[data-pantheon-id='"+templeID+"']");
            if (pantheonTempleBattleButton.length >0)
            {
                //replaceCheatClick();
                setStoredValue("HHAuto_Temp_autoLoop", "false");
                logHHAuto("setting autoloop to false");
                pantheonTempleBattleButton[0].click();
                setTimeout(function () {location.reload();}, 1000);
            }
            else
            {
                logHHAuto("Issue to find temple battle button retry in 60secs.");
                setTimer('nextPantheonTime',60);
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
        }
        else
        {
            // Switch to the correct screen
            logHHAuto("Remaining worship : "+ current_worship);
            if ( current_worship > 0 )
            {
                logHHAuto("Switching to pantheon screen.");
                gotoPage(getHHScriptVars("pagesIDPantheon"));

                return;
            }
            else
            {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                {
                    setTimer('nextPantheonTime',15*60);
                }
                else
                {
                    setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts') + 10);
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            return;
        }
    }
}