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
import { HHStoredVarPrefixKey } from "../config";
import { Troll } from "./Troll";

export class GenericBattle {
    static doBattle()
    {
        if (getPage() === getHHScriptVars("pagesIDLeagueBattle") || getPage() === getHHScriptVars("pagesIDTrollBattle") || getPage() === getHHScriptVars("pagesIDSeasonBattle") || getPage() === getHHScriptVars("pagesIDPantheonBattle") )
        {
            logHHAuto("On battle page.");
            let troll_id = queryStringGetParam(window.location.search,'id_opponent');
            const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
            if (getPage() === getHHScriptVars("pagesIDLeagueBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeagues") === "true")
            {
                logHHAuto("Reloading after league fight.");
                gotoPage(getHHScriptVars("pagesIDLeaderboard"),{},randomInterval(4000,5000));
            }
            else if (getPage() === getHHScriptVars("pagesIDTrollBattle") )
            {
                //console.log(Number(troll_id),Number(getHHVars('Hero.infos.questing.id_world'))-1,Number(troll_id) === Number(getHHVars('Hero.infos.questing.id_world'))-1);
                if (getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === "true" && (Number(troll_id) === lastTrollIdAvailable))
                {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest", "false");
                }
                if(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !== undefined &&
                    (
                        getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") === "true" && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic==="false"
                        || 
                        getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") === "true" && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic==="true"
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
            else if (getPage() === getHHScriptVars("pagesIDSeasonBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeason") === "true")
            {
                logHHAuto("Go back to Season arena after Season fight.");
                gotoPage(getHHScriptVars("pagesIDSeasonArena"),{},randomInterval(2000,4000));
            }
            else if (getPage() === getHHScriptVars("pagesIDPantheonBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheon") === "true")
            {
                logHHAuto("Go back to Pantheon arena after Pantheon temple.");
                gotoPage(getHHScriptVars("pagesIDPantheon"),{},randomInterval(2000,4000));
            }
            else if (getPage() === getHHScriptVars("pagesIDLabyrinthBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLabyrinth") === "true")
            {
                logHHAuto("Go back to Labyrinth after fight.");
                gotoPage(getHHScriptVars("pagesIDLabyrinth"),{},randomInterval(2000,4000));
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