import {
    RewardHelper,
    checkTimer,
    getHHScriptVars,
    getHHVars,
    getPage,
    getStoredValue,
    getTextForUI,
    getTimeLeft,
    queryStringGetParam,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { checkParanoiaSpendings, gotoPage } from "../Service";
import { logHHAuto } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";
import { Booster } from "./Booster";

export class Pantheon {

    static getEnergy() {
        return Number(getHHVars('Hero.energies.worship.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.worship.max_regen_amount'));
    }

    static getPinfo() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheonRunThreshold"));

        let Tegzd = '';
        const boostLimited = getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheonBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
        if(boostLimited) {
            Tegzd += '<li style="color:red!important;" title="'+getTextForUI("boostMissing","elementText")+'">';
        }else {
            Tegzd += '<li>';
        }
        Tegzd += getTextForUI("autoPantheonTitle","elementText")+' '+Pantheon.getEnergy()+'/'+Pantheon.getEnergyMax();
        if (runThreshold > 0) {
            Tegzd += ' ('+threshold+'<'+Pantheon.getEnergy()+'<'+runThreshold+')';
        }
        if(runThreshold > 0  && Pantheon.getEnergy() < runThreshold) {
            Tegzd += ' ' + getTextForUI("waitRunThreshold","elementText");
        }else {
            Tegzd += ' : ' + getTimeLeft('nextPantheonTime');
        }
        if (boostLimited) {
            Tegzd += ' ' + getTextForUI("boostMissing","elementText") + '</li>';
        } else {
            Tegzd += '</li>';
        }
        return Tegzd;
    }

    static isEnabled(){
        return getHHScriptVars("isEnabledPantheon",false) && getHHVars('Hero.infos.level')>=getHHScriptVars("LEVEL_MIN_PANTHEON");
    }

    static isTimeToFight(){
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheonRunThreshold"));
        const humanLikeRun = getStoredValue(HHStoredVarPrefixKey+"Temp_PantheonHumanLikeRun") === "true";

        const energyAboveThreshold = humanLikeRun && Pantheon.getEnergy() > threshold || Pantheon.getEnergy() > Math.max(threshold, runThreshold-1);
        const paranoiaSpending = Pantheon.getEnergy() > 0 && Number(checkParanoiaSpendings('worship')) > 0;
        const needBoosterToFight = getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheonBoostedOnly") === "true";
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
                const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheonRunThreshold"));
                if (runThreshold > 0) {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_PantheonHumanLikeRun", "true");
                }
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
                    setTimer('nextPantheonTime', randomInterval(60, 70));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                }
            }
            else
            {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                {
                    setTimer('nextPantheonTime', randomInterval(15*60, 17*60));
                }
                else
                {
                    const next_refresh = getHHVars('Hero.energies.worship.next_refresh_ts')
                    setTimer('nextPantheonTime', randomInterval(next_refresh+10, next_refresh + 180));
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
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                logHHAuto("setting autoloop to false");
                pantheonTempleBattleButton[0].click();
            }
            else
            {
                logHHAuto("Issue to find temple battle button retry in 60secs.");
                setTimer('nextPantheonTime', randomInterval(60, 70));
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
                    setTimer('nextPantheonTime', randomInterval(15*60, 17*60));
                }
                else
                {
                    const next_refresh = getHHVars('Hero.energies.worship.next_refresh_ts')
                    setTimer('nextPantheonTime', randomInterval(next_refresh+10, next_refresh + 180));
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            return;
        }
    }
}