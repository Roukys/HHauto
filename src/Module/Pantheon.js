import {
    RewardHelper,
    checkTimer,
    getHHScriptVars,
    getHHVars,
    getPage,
    getStoredValue,
    queryStringGetParam,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { checkParanoiaSpendings, gotoPage } from "../Service";
import { logHHAuto } from "../Utils";
import { Booster } from "./Booster";

export class Pantheon {

    static getEnergy() {
        return Number(getHHVars('Hero.energies.worship.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.worship.max_regen_amount'));
    }

    static isTimeToFight(){
        const energyAboveThreshold = Pantheon.getEnergy() > Number(getStoredValue("HHAuto_Setting_autoPantheonThreshold"));
        const paranoiaSpending = Pantheon.getEnergy() > 0 && Number(checkParanoiaSpendings('worship')) > 0;
        const needBoosterToFight = getStoredValue("HHAuto_Setting_autoPantheonBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();

        if(checkTimer('nextPantheonTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            logHHAuto('Time for pantheon but no booster equipped');
        }

        return (checkTimer('nextPantheonTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }

    static run()
    {
        logHHAuto("Performing auto Pantheon.");
        // Confirm if on correct screen.
        var page = getPage();
        var current_worship = Pantheon.getEnergy();
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