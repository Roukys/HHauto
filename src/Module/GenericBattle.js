import {
    RewardHelper,
    Trollz,
    getHHScriptVars,
    getHHVars,
    getPage,
    getStoredValue,
    queryStringGetParam,
    randomInterval,
    setStoredValue
} from "../Helper";
import { gotoPage } from "../Service";
import { logHHAuto } from "../Utils";

export class GenericBattle {
    static doBattle()
    {
        if (getPage() === getHHScriptVars("pagesIDLeagueBattle") || getPage() === getHHScriptVars("pagesIDTrollBattle") || getPage() === getHHScriptVars("pagesIDSeasonBattle") || getPage() === getHHScriptVars("pagesIDPantheonBattle") )
        {
            logHHAuto("On battle page.");
            let troll_id = queryStringGetParam(window.location.search,'id_opponent');
            if (getPage() === getHHScriptVars("pagesIDLeagueBattle") && getStoredValue("HHAuto_Setting_autoLeagues") === "true")
            {
                logHHAuto("Reloading after league fight.");
                gotoPage(getHHScriptVars("pagesIDLeaderboard"),{},randomInterval(4000,5000));
            }
            else if (getPage() === getHHScriptVars("pagesIDTrollBattle") )
            {
                //console.log(Number(troll_id),Number(getHHVars('Hero.infos.questing.id_world'))-1,Number(troll_id) === Number(getHHVars('Hero.infos.questing.id_world'))-1);
                if (getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true" && (Number(troll_id) === Number(getHHVars('Hero.infos.questing.id_world'))-1 || Number(troll_id) === Trollz.length-1 /*PSH*/))
                {
                    setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
                }
                if(getStoredValue("HHAuto_Temp_eventGirl") !== undefined &&
                    (
                        getStoredValue("HHAuto_Setting_plusEvent") === "true" && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="false"
                        || 
                        getStoredValue("HHAuto_Setting_plusEventMythic") === "true" && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true"
                    ))
                {
                    logHHAuto("Event ongoing search for girl rewards in popup.");
                    RewardHelper.ObserveAndGetGirlRewards();
                }
                else
                {
                    if (troll_id !== null)
                    {
                        logHHAuto("Go back to Troll after Troll fight.");
                        gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:troll_id},randomInterval(2000,4000));
                    }
                    else
                    {
                        logHHAuto("Go to home after unknown troll fight.");
                        gotoPage(getHHScriptVars("pagesIDHome"),{},randomInterval(2000,4000));
                    }
                }

            }
            else if (getPage() === getHHScriptVars("pagesIDSeasonBattle") && getStoredValue("HHAuto_Setting_autoSeason") === "true")
            {
                logHHAuto("Go back to Season arena after Season fight.");
                gotoPage(getHHScriptVars("pagesIDSeasonArena"),{},randomInterval(2000,4000));
            }
            else if (getPage() === getHHScriptVars("pagesIDPantheonBattle") && getStoredValue("HHAuto_Setting_autoPantheon") === "true")
            {
                logHHAuto("Go back to Pantheon arena after Pantheon temple.");
                gotoPage(getHHScriptVars("pagesIDPantheon"),{},randomInterval(2000,4000));
            }
            return true;
        }
        else
        {
            logHHAuto('Unable to identify page.');
            gotoPage(getHHScriptVars("pagesIDHome"));
            return;
        }
    }

}