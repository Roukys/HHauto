import {
    RewardHelper,
    ConfigHelper,
    getHHVars,
    getPage,
    getStoredValue,
    queryStringGetParam,
    randomInterval,
    setStoredValue
} from '../Helper/index';
import { gotoPage } from '../Service/index';
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { Troll } from "./Troll";

export class GenericBattle {
    static doBattle()
    {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle") || getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollBattle") || getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonBattle") || getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle") )
        {
            logHHAuto("On battle page.");
            let troll_id = queryStringGetParam(window.location.search,'id_opponent');
            const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
            if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeagues") === "true")
            {
                logHHAuto("Reloading after league fight.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDLeaderboard"),{},randomInterval(4000,5000));
            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollBattle") )
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
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:troll_id},randomInterval(2000,4000));
                    }
                    else
                    {
                        logHHAuto("Go to home after unknown troll fight.");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"),{},randomInterval(2000,4000));
                    }
                }

            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeason") === "true")
            {
                logHHAuto("Go back to Season arena after Season fight.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDSeasonArena"),{},randomInterval(2000,4000));
            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheon") === "true")
            {
                logHHAuto("Go back to Pantheon arena after Pantheon temple.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDPantheon"),{},randomInterval(2000,4000));
            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinthBattle") && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLabyrinth") === "true")
            {
                logHHAuto("Go back to Labyrinth after fight.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDLabyrinth"),{},randomInterval(2000,4000));
            }
            return true;
        }
        else
        {
            logHHAuto('Unable to identify page.');
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            return;
        }
    }

}