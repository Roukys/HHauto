import {
    RewardHelper,
    TimeHelper,
    checkTimer,
    checkTimerMustExist,
    clearTimer,
    deleteStoredValue,
    ConfigHelper, 
    getHHVars,
    getHero,
    getLimitTimeBeforeEnd,
    getPage,
    getSecondsLeft, 
    getStoredValue, 
    getTimer, 
    randomInterval,
    setStoredValue, 
    setTimer, 
    switchHHMenuButton
} from '../Helper/index';
import {
    Booster,
    BossBang,
    Bundles,
    Champion,
    Club,
    ClubChampion,
    Contest,
    DailyGoals,
    DoublePenetration,
    EventModule,
    GenericBattle,
    Harem,
    HaremGirl,
    HaremSalary,
    Labyrinth,
    LeagueHelper,
    Missions,
    Pachinko,
    Pantheon,
    PathOfAttraction,
    PathOfGlory,
    PathOfValue,
    PlaceOfPower,
    QuestHelper,
    Season,
    SeasonalEvent,
    Shop,
    TeamModule,
    Troll
} from '../Module/index';
import {
    callItOnce,
    checkAndClosePopup,
    isJSON,
    logHHAuto
} from '../Utils/index';
import {
    HHStoredVarPrefixKey
} from '../config/index';
import { EventGirl } from '../model/EventGirl';
import { 
    checkParanoiaSpendings,
    clearParanoiaSpendings,
    flipParanoia,
    gotoPage,
    mouseBusy,
    setDefaults,
    updateData,
    updatedParanoiaSpendings,
} from "./index";

export let busy = false;


export function getBurst()
{
    const sMenu = document.getElementById('sMenu');
    if (sMenu != null)
    {
        if (sMenu.style.display!=='none' )// && !document.getElementById("DebugDialog").open)
        {
            return false;
        }
    }
    if ($('#contains_all>nav>[rel=content]').length >0)
    {
        if ($('#contains_all>nav>[rel=content]')[0].style.display === "block")// && !document.getElementById("DebugDialog").open)
        {
            return false;
        }
    }
    return getStoredValue(HHStoredVarPrefixKey+"Setting_master") ==="true"&&(!(getStoredValue(HHStoredVarPrefixKey+"Setting_paranoia") ==="true") || getStoredValue(HHStoredVarPrefixKey+"Temp_burst") ==="true");
}


export function CheckSpentPoints()
{
    let oldValues=getStoredValue(HHStoredVarPrefixKey+"Temp_CheckSpentPoints")?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_CheckSpentPoints")):-1;
    let newValues={};
    if (ConfigHelper.getHHScriptVars('isEnabledTrollBattle',false))
    {
        newValues['fight']=Troll.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledSeason',false))
    {
        newValues['kiss']=Season.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledQuest',false))
    {
        newValues['quest']=QuestHelper.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledLeagues',false))
    {
        newValues['challenge']=LeagueHelper.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledPantheon',false))
    {
        newValues['worship']=Pantheon.getEnergy();
    }

    if ( oldValues !== -1)
    {
        let spent= {};
        let hasSpend = false;

        for (let i of Object.keys(newValues))
        {
            //console.log(i);
            if (oldValues[i]-newValues[i] >0)
            {
                spent[i]=oldValues[i]-newValues[i];
                updatedParanoiaSpendings(i, spent[i]);
            }

        }
        setStoredValue(HHStoredVarPrefixKey+"Temp_CheckSpentPoints", JSON.stringify(newValues));

        if (ConfigHelper.getHHScriptVars('isEnabledLeagues',false) && newValues['challenge'] > (oldValues['challenge'] +1))
        {
            logHHAuto("Seems league point bought, resetting timer.");
            clearTimer('nextLeaguesTime');
        }
        if (ConfigHelper.getHHScriptVars('isEnabledSeason',false) && newValues['kiss'] > (oldValues['kiss'] +1))
        {
            logHHAuto("Seems season point bought, resetting timer.");
            clearTimer('nextSeasonTime');
        }
        if (ConfigHelper.getHHScriptVars('isEnabledPantheon',false) && newValues['worship'] > (oldValues['worship'] +1))
        {
            logHHAuto("Seems Pantheon point bought, resetting timer.");
            clearTimer('nextPantheonTime');
        }
    }
    else
    {
        setStoredValue(HHStoredVarPrefixKey+"Temp_CheckSpentPoints", JSON.stringify(newValues));
    }
}

export function isAutoLoopActive(): boolean{
    return getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop") === "true";
}

export async function autoLoop()
{
    updateData();
    if (getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement") === undefined)
    {
        setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
    }
    if (getStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired") === undefined)
    {
        setStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired", "0");
    }

    //var busy = false;
    busy = false;
    var page = window.location.href;
    var currentPower = Troll.getEnergy();

    var burst=getBurst();
    switchHHMenuButton(burst);
    //console.log("burst : "+burst);
    checkAndClosePopup(burst);
    let lastActionPerformed = getStoredValue(HHStoredVarPrefixKey+"Temp_lastActionPerformed");
    let eventParsed:string|null=null;

    if (burst && !mouseBusy /*|| checkTimer('nextMissionTime')*/)
    {

        if (!checkTimer("paranoiaSwitch") )
        {
            clearParanoiaSpendings();
        }
        CheckSpentPoints();
        const canCollectCompetitionActive = TimeHelper.canCollectCompetitionActive();

        //check what happen to timer if no more wave before uncommenting
        /*if (getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true" && checkTimerMustExist('eventMythicNextWave'))
        {
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
        }
        */
        //logHHAuto("lastActionPerformed " + lastActionPerformed);

        const Hero = getHero();
        //if a new event is detected
        const {eventIDs, bossBangEventIDs} = EventModule.parsePageForEventId();
        if(
            busy === false && ConfigHelper.getHHScriptVars("isEnabledEvents",false) && (lastActionPerformed === "none" || lastActionPerformed === "event" || (getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle") === "true" && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true") )
            &&
            (
                (eventIDs.length > 0 && getPage() !== ConfigHelper.getHHScriptVars("pagesIDEvent"))
                ||
                (getPage()===ConfigHelper.getHHScriptVars("pagesIDEvent") && $("#contains_all #events[parsed]").length < eventIDs.length)
            )
        )
        {
            logHHAuto("Going to check on events.");
            busy = true;
            busy = EventModule.parseEventPage(eventIDs[0]);
            eventParsed = eventIDs[0];
            lastActionPerformed = "event";
            if (eventIDs.length > 1) {
                logHHAuto("More events to be parsed.", JSON.stringify(eventIDs));
                busy = true;
            }
        }

        if (getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true" && checkTimerMustExist('eventMythicNextWave') && getSecondsLeft("eventMythicGoing") > 0)
        {
            logHHAuto("Mythic wave !");
            lastActionPerformed = "troll";
        }

        if (busy===false && ConfigHelper.getHHScriptVars("isEnabledShop",false) && Shop.isTimeToCheckShop() && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "shop"))
        {
            if (getStoredValue(HHStoredVarPrefixKey+"Temp_charLevel") ===undefined)
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel", 0);
            }
            if (checkTimer('nextShopTime') || getStoredValue(HHStoredVarPrefixKey+"Temp_charLevel")<getHHVars('Hero.infos.level')) {
                logHHAuto("Time to check shop.");
                busy = Shop.updateShop();
                lastActionPerformed = "shop";
            }
        }

        if(busy === false && ConfigHelper.getHHScriptVars("isEnabledPowerPlaces",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlaces") === "true" 
        && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "pop"))
        {

            var popToStart = getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")):[];
            if (popToStart.length != 0 || checkTimer('minPowerPlacesTime'))
            {
                //if PopToStart exist bypass function
                var popToStartExist = getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")?true:false;
                //logHHAuto("startcollect : "+popToStartExist);
                if (! popToStartExist)
                {
                    //logHHAuto("pop1:"+popToStart);
                    logHHAuto("Go and collect");
                    busy = true;
                    busy = PlaceOfPower.collectAndUpdate();
                }
                var indexes=(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesIndexFilter")).split(";");

                popToStart = getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")):[];
                //console.log(indexes, popToStart);
                for(var pop of popToStart)
                {
                    if (busy === false && ! indexes.includes(String(pop)))
                    {
                        logHHAuto("PoP is no longer in list :"+pop+" removing it from start list.");
                        PlaceOfPower.removePopFromPopToStart(pop);
                    }
                }
                popToStart = getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")):[];
                //logHHAuto("pop2:"+popToStart);
                for(var index of indexes)
                {
                    if (busy === false && popToStart.includes(Number(index)))
                    {
                        logHHAuto("Time to do PowerPlace"+index+".");
                        busy = true;
                        busy = PlaceOfPower.doPowerPlacesStuff(index);
                        lastActionPerformed = "pop";
                    }
                }
                if (busy === false)
                {
                    //logHHAuto("pop3:"+getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart"));
                    popToStart = getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")):[];
                    //logHHAuto("pop3:"+popToStart);
                    if (popToStart.length === 0)
                    {
                        //logHHAuto("removing popToStart");
                        sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_PopToStart');
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    }
                }
            }
        }

        if
            (
                busy === false
                &&
                (
                    getPage() === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle")
                    || getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollBattle")
                    || getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonBattle")
                    || getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle")
                    || getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinthBattle")
                )
                && isAutoLoopActive() && canCollectCompetitionActive
            )
        {
            busy = true;
            GenericBattle.doBattle();
        }

        if(busy === false && Troll.isTrollFightActivated()
        && isAutoLoopActive() && canCollectCompetitionActive
        && (lastActionPerformed === "none" || lastActionPerformed === "troll" || lastActionPerformed === "quest"))
        {
            const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold"));
            const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollRunThreshold"));
            const humanLikeRun = getStoredValue(HHStoredVarPrefixKey+"Temp_TrollHumanLikeRun") === "true";
            const energyAboveThreshold = humanLikeRun && currentPower > threshold || currentPower > Math.max(threshold, runThreshold-1);
            //logHHAuto("fight amount: "+currentPower+" troll threshold: "+threshold+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
            const eventGirl: EventGirl = EventModule.getEventGirl();
            const eventMythicGirl: EventGirl = EventModule.getEventMythicGirl();
            if
                (
                    //normal case
                    (
                        currentPower >= Number(getStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired"))
                        && currentPower > 0
                        &&
                        (
                            energyAboveThreshold
                            || getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === "true"
                        )
                    )
                    || Number(checkParanoiaSpendings('fight')) > 0 //paranoiaspendings to do
                    ||
                    (
                        // mythic Event Girl available and fights available
                        (eventMythicGirl.girl_id && eventMythicGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true")
                        &&
                        (
                            currentPower > 0 //has fight => bypassing paranoia
                            || Troll.canBuyFight(eventMythicGirl, false).canBuy // can buy fights
                        )
                    )
                    ||
                    (
                        // normal Event Girl available
                        (eventGirl.girl_id && !eventGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") ==="true")
                        &&
                        (
                            energyAboveThreshold
                            || Troll.canBuyFight(eventGirl, false).canBuy // can buy fights
                        )
                    )
                )


            {
                logHHAuto('Troll:', {threshold: threshold, runThreshold:runThreshold, TrollHumanLikeRun: humanLikeRun});
                setStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired", "0");
                busy = true;
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") !== "true" || getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement")[0] !== 'P')
                {
                    busy = await Troll.doBossBattle();
                    lastActionPerformed = "troll";
                }
                else
                {
                    logHHAuto("AutoBattle disabled for power collection for AutoQuest.");
                    (<HTMLInputElement>document.getElementById("autoTrollBattle")).checked = false;
                    setStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle", "false");
                    busy = false;
                }
            }
            else
            {
                if(getStoredValue(HHStoredVarPrefixKey+"Temp_TrollHumanLikeRun") === "true") {
                    // end run
                    setStoredValue(HHStoredVarPrefixKey+"Temp_TrollHumanLikeRun", "false");
                }
                /*if (getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"))
                {
                    logHHAuto("Go to home after troll fight");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));

                }*/
            }

        }
        else
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired", "0");
        }


        if (busy === false && ConfigHelper.getHHScriptVars("isEnabledMythicPachinko",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreePachinko") === "true" 
            && isAutoLoopActive() && checkTimer("nextPachinko2Time") && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
            logHHAuto("Time to fetch Mythic Pachinko.");
            busy = Pachinko.getMythicPachinko();
            lastActionPerformed = "pachinko";
        }

        if (busy === false && ConfigHelper.getHHScriptVars("isEnabledGreatPachinko",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreePachinko") === "true" 
            && isAutoLoopActive() && checkTimer("nextPachinkoTime") && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
            logHHAuto("Time to fetch Great Pachinko.");
            busy = Pachinko.getGreatPachinko();
            lastActionPerformed = "pachinko";
        }

        if (busy === false && ConfigHelper.getHHScriptVars("isEnabledEquipmentPachinko",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreePachinko") === "true" 
            && isAutoLoopActive() && checkTimer("nextPachinkoEquipTime") && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
            logHHAuto("Time to fetch Equipment Pachinko.");
            busy = Pachinko.getEquipmentPachinko();
            lastActionPerformed = "pachinko";
        }

        if(busy === false && ConfigHelper.getHHScriptVars("isEnabledContest",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoContest") === "true" 
            && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "contest"))
        {
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas || $(".contest .ended button[rel='claim']").length>0){
                logHHAuto("Time to get contest rewards.");
                busy = Contest.run();
                lastActionPerformed = "contest";
            }
        }

        if(busy === false && ConfigHelper.getHHScriptVars("isEnabledMission",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoMission") === "true" 
            && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "mission"))
        {
            if (checkTimer('nextMissionTime')){
                logHHAuto("Time to do missions.");
                busy = Missions.run();
                lastActionPerformed = "mission";
            }
        }

        if (busy === false && ConfigHelper.getHHScriptVars("isEnabledQuest",false) 
            && (getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true" || (ConfigHelper.getHHScriptVars("isEnabledSideQuest",false) 
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true")) && isAutoLoopActive() 
            && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "quest"))
        {
            if (getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === undefined)
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest", "false");
            }
            let questRequirement = getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement");
            if (questRequirement === "battle")
            {
                if (ConfigHelper.getHHScriptVars("isEnabledTrollBattle",false) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === "false")
                {
                    logHHAuto("Quest requires battle.");
                    logHHAuto("prepare to save one battle for quest");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest", "true");
                    if(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle") !== "true") {
                        Troll.doBossBattle();
                        busy = true;
                    }
                }
            }
            else if (questRequirement[0] === '$')
            {
                if (Number(questRequirement.substr(1)) < getHHVars('Hero.currencies.soft_currency')) {
                    // We have enough money... requirement fulfilled.
                    logHHAuto("Continuing quest, required money obtained.");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                    QuestHelper.run();
                    busy = true;
                }
                else
                {
                    //prevent paranoia to wait for quest
                    setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked", "true");
                    if(isNaN(questRequirement.substr(1)))
                    {
                        logHHAuto(questRequirement);
                        setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                        logHHAuto("Invalid money in session storage quest requirement !");
                    }
                    busy = false;
                }
            }
            else if (questRequirement[0] === '*')
            {
                var energyNeeded = Number(questRequirement.substr(1));
                var energyCurrent = QuestHelper.getEnergy();
                if (energyNeeded <= energyCurrent)
                {
                    if (Number(energyCurrent) > Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
                    {
                        // We have enough energy... requirement fulfilled.
                        logHHAuto("Continuing quest, required energy obtained.");
                        setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                        QuestHelper.run();
                        busy = true;
                    }
                    else
                    {
                        busy = false;
                    }
                }
                // Else we need energy, just wait.
                else
                {
                    //prevent paranoia to wait for quest
                    setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked", "true");
                    busy = false;
                    //logHHAuto("Replenishing energy for quest.(" + energyNeeded + " needed)");
                }
            }
            else if (questRequirement[0] === 'P')
            {
                // Battle power required.
                var neededPower = Number(questRequirement.substr(1));
                if(currentPower < neededPower)
                {
                    logHHAuto("Quest requires "+neededPower+" Battle Power for advancement. Waiting...");
                    busy = false;
                    //prevent paranoia to wait for quest
                    setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked", "true");
                }
                else
                {
                    logHHAuto("Battle Power obtained, resuming quest...");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                    QuestHelper.run();
                    busy = true;
                }
            }
            else if (questRequirement === "unknownQuestButton")
            {
                //prevent paranoia to wait for quest
                setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked", "true");
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    (<HTMLInputElement>document.getElementById("autoQuest")).checked = false;
                    setStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest", "false");
                }
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    (<HTMLInputElement>document.getElementById("autoSideQuest")).checked = false;
                    setStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest", "false");
                }
                setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                busy = false;
            }
            else if (questRequirement === "errorInAutoBattle")
            {
                //prevent paranoia to wait for quest
                setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked", "true");
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    (<HTMLInputElement>document.getElementById("autoQuest")).checked = false;
                    setStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest", "false");
                }
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    (<HTMLInputElement>document.getElementById("autoSideQuest")).checked = false;
                    setStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest", "false");
                }
                setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                busy = false;
            }
            else if(questRequirement === "none")
            {
                if (checkTimer('nextMainQuestAttempt') && checkTimer('nextSideQuestAttempt'))
                {
                    if (QuestHelper.getEnergy() > Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
                    {
                        //logHHAuto("NONE req.");
                        busy = true;
                        QuestHelper.run();
                    }
                }
            }
            else
            {
                //prevent paranoia to wait for quest
                setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked", "true");
                logHHAuto("Invalid quest requirement : "+questRequirement);
                busy=false;
            }
            if(busy) lastActionPerformed = "quest";
        }
        else if(getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "false" && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "false")
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
        }

        if(busy === false && ConfigHelper.getHHScriptVars("isEnabledSeason",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeason") === "true" 
            && isAutoLoopActive() && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "season"))
        {
            if (Season.isTimeToFight())
            {
                logHHAuto("Time to fight in Season.");
                Season.run();
                busy = true;
                lastActionPerformed = "season";
            }
            else if (checkTimer('nextSeasonTime'))
            {
                if(getStoredValue(HHStoredVarPrefixKey+"Temp_SeasonHumanLikeRun") === "true") {
                    // end run
                    setStoredValue(HHStoredVarPrefixKey+"Temp_SeasonHumanLikeRun", "false");
                }
                if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0)
                {
                    setTimer('nextSeasonTime', randomInterval(15*60, 17*60));
                }
                else
                {
                    const next_refresh = getHHVars('Hero.energies.kiss.next_refresh_ts')
                    setTimer('nextSeasonTime', randomInterval(next_refresh+10, next_refresh + 180));
                }
            }
        }

        if(busy === false && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheon") === "true" && Pantheon.isEnabled()
            && isAutoLoopActive() && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "pantheon"))
        {
            if (Pantheon.isTimeToFight())
            {
                logHHAuto("Time to do Pantheon.");
                Pantheon.run();
                busy = true;
                lastActionPerformed = "pantheon";
            }
            else if (checkTimer('nextPantheonTime'))
            {
                if(getStoredValue(HHStoredVarPrefixKey+"Temp_PantheonHumanLikeRun") === "true") {
                    // end run
                    setStoredValue(HHStoredVarPrefixKey+"Temp_PantheonHumanLikeRun", "false");
                }
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                {
                    setTimer('nextPantheonTime', randomInterval(15*60, 17*60));
                }
                else
                {
                    const next_refresh = getHHVars('Hero.energies.worship.next_refresh_ts')
                    setTimer('nextPantheonTime', randomInterval(next_refresh+10, next_refresh + 180));
                }
                //logHHAuto("reset lastActionPerformed from pantheon");
                lastActionPerformed = "none";
            }
        }

        if(busy === false && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLabyrinth") === "true" && Labyrinth.isEnabled() && checkTimer('nextLabyrinthTime')
            && isAutoLoopActive() && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "labyrinth"))
        {
            Labyrinth.run();
            busy = true;
            lastActionPerformed = "labyrinth";
        }

        if (busy==false && ConfigHelper.getHHScriptVars("isEnabledChamps",false) 
            && QuestHelper.getEnergy()>=ConfigHelper.getHHScriptVars("CHAMP_TICKET_PRICE") && QuestHelper.getEnergy() > Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuestThreshold"))
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoChampsUseEne") ==="true" && isAutoLoopActive() 
            && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "champion"))
        {
            function buyTicket()
            {
                var params = {
                    action: 'champion_buy_ticket',
                    currency: 'energy_quest',
                    amount: "1"
                };
                logHHAuto('Buying ticket with energy');
                unsafeWindow.hh_ajax(params, function(data) {
                    //anim_number($('.tickets_number_amount'), data.tokens - amount, amount);
                    Hero.updates(data.hero_changes);
                    location.reload();
                });
            }
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            busy = true;
            setTimeout(buyTicket,randomInterval(800,1600));
            lastActionPerformed = "champion";
        }

        if (busy==false && ConfigHelper.getHHScriptVars("isEnabledChamps",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoChamps") ==="true" && checkTimer('nextChampionTime') 
            && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "champion"))
        {
            logHHAuto("Time to check on champions!");
            busy=true;
            busy= Champion.doChampionStuff();
            lastActionPerformed = "champion";
        }

        if (busy==false && ConfigHelper.getHHScriptVars("isEnabledClubChamp",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubChamp") ==="true" && checkTimer('nextClubChampionTime') 
            && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "clubChampion"))
        {
            logHHAuto("Time to check on club champion!");
            busy=true;
            busy= ClubChampion.doClubChampionStuff();
            lastActionPerformed = "clubChampion";
        }

        if(busy === false && LeagueHelper.isAutoLeagueActivated() && isAutoLoopActive() 
            && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "league"))
        {
            // Navigate to leagues
            if (LeagueHelper.isTimeToFight())
            {
                logHHAuto("Time to fight in Leagues.");
                LeagueHelper.doLeagueBattle();
                busy = true;
                lastActionPerformed = "league";
            }
            else
            {
                if(getStoredValue(HHStoredVarPrefixKey+"Temp_LeagueHumanLikeRun") === "true") {
                    // end run
                    setStoredValue(HHStoredVarPrefixKey+"Temp_LeagueHumanLikeRun", "false");
                }
                if (checkTimer('nextLeaguesTime'))
                {
                    if (getHHVars('Hero.energies.challenge.next_refresh_ts') === 0)
                    {
                        setTimer('nextLeaguesTime', randomInterval(15*60, 17*60));
                    }
                    else
                    {
                        const next_refresh = getHHVars('Hero.energies.challenge.next_refresh_ts')
                        setTimer('nextLeaguesTime', randomInterval(next_refresh+10, next_refresh + 180));
                    }
                }
                //logHHAuto("reset lastActionPerformed from league");
                lastActionPerformed = "none";
                /*if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLeaderboard"))
                {
                    logHHAuto("Go to home after league fight");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));

                }*/
            }
        }

        if (
            busy==false && ConfigHelper.getHHScriptVars("isEnabledSeason",false) && isAutoLoopActive() &&
            (
                checkTimer('nextSeasonCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonCollect") === "true" && canCollectCompetitionActive
                ||
                getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonCollectAll") === "true" && checkTimer('nextSeasonCollectAllTime') && (getTimer('SeasonRemainingTime') == -1 || getSecondsLeft('SeasonRemainingTime') < getLimitTimeBeforeEnd())
            )  && (lastActionPerformed === "none" || lastActionPerformed === "season")
        )
        {
            logHHAuto("Time to go and check Season for collecting reward.");
            busy = true;
            busy = Season.goAndCollect();
            lastActionPerformed = "season";
        }

        if (
            busy==false && ConfigHelper.getHHScriptVars("isEnabledSeasonalEvent",false) && isAutoLoopActive() &&
            (
                checkTimer('nextSeasonalEventCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive
                ||
                getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollectAll") === "true" && checkTimer('nextSeasonalEventCollectAllTime') && (getTimer('SeasonalEventRemainingTime') == -1 || getSecondsLeft('SeasonalEventRemainingTime') < getLimitTimeBeforeEnd())
            ) && (lastActionPerformed === "none" || lastActionPerformed === "seasonal")
        )
        {
            logHHAuto("Time to go and check SeasonalEvent for collecting reward.");
            busy = true;
            busy = SeasonalEvent.goAndCollect();
            lastActionPerformed = "seasonal";
        }

        if (
            busy==false && ConfigHelper.getHHScriptVars("isEnabledSeasonalEvent",false) && isAutoLoopActive() &&
            checkTimer('nextMegaEventRankCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "seasonal")
        )
        {
            logHHAuto("Time to go and check  SeasonalEvent for collecting rank reward.");
            busy = true;
            busy = SeasonalEvent.goAndCollectMegaEventRankRewards();
            lastActionPerformed = "seasonal";
        }

        if (
            busy==false && isAutoLoopActive() && PathOfValue.isEnabled() &&
            (
                checkTimer('nextPoVCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollect") === "true" && canCollectCompetitionActive
                ||
                getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollectAll") === "true" && checkTimer('nextPoVCollectAllTime') && (getTimer('PoVRemainingTime') == -1 || getSecondsLeft('PoVRemainingTime') < getLimitTimeBeforeEnd())
            ) && (lastActionPerformed === "none" || lastActionPerformed === "pov")
        )
        {
            logHHAuto("Time to go and check Path of Valor for collecting reward.");
            busy = true;
            busy = PathOfValue.goAndCollect();
            lastActionPerformed = "pov";
        }

        if (
            busy==false && isAutoLoopActive() && PathOfGlory.isEnabled() &&
            (
                checkTimer('nextPoGCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollect") === "true" && canCollectCompetitionActive
                ||
                getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollectAll") === "true" && checkTimer('nextPoGCollectAllTime') && (getTimer('PoGRemainingTime') == -1 || getSecondsLeft('PoGRemainingTime') < getLimitTimeBeforeEnd())
            ) && (lastActionPerformed === "none" || lastActionPerformed === "pog")
        )
        {
            logHHAuto("Time to go and check Path of Glory for collecting reward.");
            busy = true;
            busy = PathOfGlory.goAndCollect();
            lastActionPerformed = "pog";
        }

        if (busy==false && ConfigHelper.getHHScriptVars("isEnabledFreeBundles",false) && isAutoLoopActive() && checkTimer('nextFreeBundlesCollectTime') 
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreeBundlesCollect") === "true" && canCollectCompetitionActive 
            && (lastActionPerformed === "none" || lastActionPerformed === "bundle"))
        {
            busy = true;
            logHHAuto("Time to go and check Free Bundles for collecting reward.");
            Bundles.goAndCollectFreeBundles();
            lastActionPerformed = "bundle";
        }

        if (busy==false && ConfigHelper.getHHScriptVars("isEnabledDailyGoals",false) && isAutoLoopActive() && checkTimer('nextDailyGoalsCollectTime')
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoDailyGoalsCollect") === "true" && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "dailyGoals"))
        {
            busy = true;
            logHHAuto("Time to go and check daily Goals for collecting reward.");
            DailyGoals.goAndCollect();
            lastActionPerformed = "dailyGoals";
        }

        if (busy === false && ConfigHelper.getHHScriptVars("isEnabledSalary",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalary") === "true" 
            && ( getStoredValue(HHStoredVarPrefixKey+"Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )  
            && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "salary"))
        {
            if (checkTimer("nextSalaryTime")) {
                logHHAuto("Time to fetch salary.");
                busy = HaremSalary.getSalary();
                // if(busy) lastActionPerformed = "salary"; // Removed from continuous actions for now
            }
        }

        if(
            busy === false
            && ConfigHelper.getHHScriptVars("isEnabledBossBangEvent",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent") === "true"
            &&
            (
                (
                    bossBangEventIDs.length > 0
                    && getPage() !== ConfigHelper.getHHScriptVars("pagesIDEvent")
                )
                ||
                (
                    getPage()===ConfigHelper.getHHScriptVars("pagesIDEvent")
                    && $('#contains_all #events #boss_bang .completed-event').length === 0
                )
            ) && (lastActionPerformed === "none" || lastActionPerformed === "event")
        )
        {
            logHHAuto("Going to boss bang event.");
            busy = true;
            busy = EventModule.parseEventPage(bossBangEventIDs[0]);
            lastActionPerformed = "event";
        }

        if (
            busy === false
            && isAutoLoopActive()
            && Harem.HaremSizeNeedsRefresh(ConfigHelper.getHHScriptVars("HaremMaxSizeExpirationSecs"))
            && getPage() !== ConfigHelper.getHHScriptVars("pagesIDHarem")
            && (lastActionPerformed === "none")
        )
        {
            //console.log(! isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")),JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count_date,new Date().getTime() + ConfigHelper.getHHScriptVars("HaremSizeExpirationSecs") * 1000);
            busy = true;
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHarem"));
        }

        if (
            busy === false
            && isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled"))
            && getPage() !== ConfigHelper.getHHScriptVars("pagesIDHome")
            && getPage() === JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")).page
            && (new Date().getTime() - JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")).dateTime) > ConfigHelper.getHHScriptVars("minSecsBeforeGoHomeAfterActions") * 1000
        )
        {
            //console.log("testingHome : GotoHome : "+getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled"));
            logHHAuto("Back to home page at the end of actions");
            deleteStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
        }
    }

    switch (getPage())
    {
        case ConfigHelper.getHHScriptVars("pagesIDLeaderboard"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showCalculatePower") === "true")
            {
                LeagueHelper.moduleSimLeague = callItOnce(LeagueHelper.moduleSimLeague);
                LeagueHelper.moduleSimLeague();
                LeagueHelper.style = callItOnce(LeagueHelper.style);
                LeagueHelper.style();
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDSeasonArena"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showCalculatePower") === "true" && $("div.matchRatingNew img#powerLevelScouter").length < 3)
            {
                Season.moduleSimSeasonBattle();
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDSeason"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_SeasonMaskRewards") === "true")
            {
                setTimeout(Season.maskReward,500);
            }
            Season.getRemainingTime = callItOnce(Season.getRemainingTime);
            Season.getRemainingTime();
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsSeasonDiv();
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDEvent"):
            const eventID = EventModule.getDisplayedIdEventPage(false);
            if (eventID != '') {
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true")
                {
                    if(eventParsed == null) {
                        EventModule.parseEventPage();
                    }
                    EventModule.moduleDisplayEventPriority();
                }

                if (getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent") === "true" && EventModule.getEvent(eventID).isBossBangEvent)
                {
                    if(eventParsed == null) {
                        EventModule.parseEventPage();
                    }
                    setTimeout(BossBang.goToFightPage, randomInterval(500,1500));
                }
                
                if (EventModule.getEvent(eventID).isPoa)
                {
                    PathOfAttraction.styles();
                    if (getStoredValue(HHStoredVarPrefixKey+"Setting_showClubButtonInPoa") === "true")
                    {
                        PathOfAttraction.run = callItOnce(PathOfAttraction.run);
                        PathOfAttraction.run();
                    }
                }
                
                if (EventModule.getEvent(eventID).isDPEvent)
                {
                    if (getStoredValue(HHStoredVarPrefixKey+"Setting_showClubButtonInPoa") === "true")
                    {
                        DoublePenetration.run  = callItOnce(DoublePenetration.run);
                        DoublePenetration.run();
                    }
                }
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDBossBang"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent") === "true")
            {
                setTimeout(BossBang.skipFightPage, randomInterval(500,1500));
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPoA"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_PoAMaskRewards") === "true")
            {
                setTimeout(PathOfAttraction.runOld,500);
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"):
            PlaceOfPower.moduleDisplayPopID();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDDailyGoals"):
            break;
        case ConfigHelper.getHHScriptVars("pagesIDMissions"):
            break;
        case ConfigHelper.getHHScriptVars("pagesIDShop"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showMarketTools") === "true")
            {
                Shop.moduleShopActions();
            }
            if(Booster.needBoosterStatusFromStore()) {
                Booster.collectBoostersFromMarket = callItOnce(Booster.collectBoostersFromMarket);
                setTimeout(Booster.collectBoostersFromMarket,200);
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDHome"):
            setTimeout(Season.displayRemainingTime,500);
            setTimeout(PathOfValue.displayRemainingTime,500);
            setTimeout(PathOfGlory.displayRemainingTime,500);
            setTimeout(EventModule.showCompletedEvent,500);

            Harem.clearHaremToolVariables = callItOnce(Harem.clearHaremToolVariables); // Avoid wired loop, if user reach home page, ensure temp var from harem are cleared
            Harem.clearHaremToolVariables();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDHarem"):
            Harem.moduleHarem();
            // Harem.moduleHaremExportGirlsData(); // moved to edit team
            Harem.moduleHaremNextUpgradableGirl();
            Harem.haremOpenFirstXUpgradable();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDGirlPage"):
            HaremGirl.moduleHaremGirl = callItOnce(HaremGirl.moduleHaremGirl);
            HaremGirl.moduleHaremGirl();
            HaremGirl.run = callItOnce(HaremGirl.run);
            busy = await HaremGirl.run();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPachinko"):
            Pachinko.modulePachinko();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDEditTeam"):
            TeamModule.moduleChangeTeam();
            Harem.moduleHaremExportGirlsData();
            Harem.moduleHaremCountMax();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDContests"):
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPoV"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_PoVMaskRewards") === "true")
            {
                PathOfValue.maskReward();
            }
            PathOfValue.getRemainingTime = callItOnce(PathOfValue.getRemainingTime);
            PathOfValue.getRemainingTime();
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPovPogDiv();
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPoG"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_PoGMaskRewards") === "true")
            {
                PathOfGlory.maskReward();
            }
            PathOfGlory.getRemainingTime = callItOnce(PathOfGlory.getRemainingTime);
            PathOfGlory.getRemainingTime();
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPovPogDiv();
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDSeasonalEvent"):
            SeasonalEvent.styles();

            SeasonalEvent.getRemainingTime = callItOnce(SeasonalEvent.getRemainingTime);
            SeasonalEvent.getRemainingTime();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDChampionsMap"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoChamps") ==="true") {
                Champion.findNextChamptionTime = callItOnce(Champion.findNextChamptionTime);
                setTimeout(Champion.findNextChamptionTime,500);
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDChampionsPage"):
            Champion.moduleSimChampions();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDClubChampion"):
            Champion.moduleSimChampions();
            ClubChampion.resetTimerIfNeeded = callItOnce(ClubChampion.resetTimerIfNeeded);
            ClubChampion.resetTimerIfNeeded();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDQuest"):
            const haremItem = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlActions");
            const haremGirlMode = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlMode");
            if(haremGirlMode && haremItem === HaremGirl.AFFECTION_TYPE) {
                HaremGirl.payGirlQuest = callItOnce(HaremGirl.payGirlQuest);
                busy = HaremGirl.payGirlQuest();
            }
            break;
        case ConfigHelper.getHHScriptVars("pagesIDClub"):
            Club.run();
            break;
        case ConfigHelper.getHHScriptVars("pagesIDLabyrinth"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showCalculatePower") === "true")
            {
                Labyrinth.sim = callItOnce(Labyrinth.sim);
                Labyrinth.sim();
            }
            break;
    }

    if (busy === false && !mouseBusy && getStoredValue(HHStoredVarPrefixKey + "Setting_paranoia") === "true" && getStoredValue(HHStoredVarPrefixKey + "Setting_master") === "true" && isAutoLoopActive()) {
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    if (busy === false && burst && !mouseBusy && lastActionPerformed != "none") {
        lastActionPerformed = "none";
        // logHHAuto("no action performed in this loop, rest lastActionPerformed");
    }
    if (lastActionPerformed != getStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed")) {
        logHHAuto("lastActionPerformed changed to " + lastActionPerformed);
    }
    setStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed", lastActionPerformed);


    if(isNaN(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")))
    {
        logHHAuto("AutoLoopTimeMili is not a number.");
        setDefaults(true);
    }
    else if (isAutoLoopActive())
    {
        setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
    }
    else
    {
        logHHAuto("autoLoop Disabled");
    }

}