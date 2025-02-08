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
import { EventGirl } from '../model/index';
import { Troll } from "./Troll";
import { DailyGoals, EventModule } from './index';

export class GenericBattle {
    static doBattle()
    {
        if (
            getPage() === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle") 
            || getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollBattle") 
            || getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonBattle") 
            || getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle")
            || getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinthBattle") )
        {
            logHHAuto("On battle page.");
            let troll_id:string = queryStringGetParam(window.location.search,'id_opponent');
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

                const eventGirl: EventGirl = EventModule.getEventGirl();
                const eventMythicGirl: EventGirl = EventModule.getEventMythicGirl();
                if(
                    getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true" && eventGirl?.girl_id && !eventGirl?.is_mythic
                    || 
                    getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true" && eventMythicGirl?.girl_id && eventMythicGirl?.is_mythic
                )
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
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle") && (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheon") === "true" || DailyGoals.isPantheonDailyGoal()))
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