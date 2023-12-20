import { setDefaults } from "./StartService";
import {
    HeroHelper,
    RewardHelper,
    TimeHelper,
    checkTimer,
     clearTimer,
     deleteStoredValue,
     getHHScriptVars, 
     getHHVars,
     getHero,
     getLimitTimeBeforeEnd,
     getPage,
     getSecondsLeft, 
     getStoredValue, 
     getTimer, 
     queryStringGetParam,
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
    TeamModule,
    Troll
} from '../Module/index';
import { Shop } from "../Module/Shop";
import {
    callItOnce,
    checkAndClosePopup,
    isJSON,
    logHHAuto
} from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { updateData } from "./InfoService";
import { mouseBusy } from "./MouseService";
import { gotoPage } from "./PageNavigationService";
import { checkParanoiaSpendings, clearParanoiaSpendings, flipParanoia, updatedParanoiaSpendings } from "./ParanoiaService";

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
    if (getHHScriptVars('isEnabledTrollBattle',false))
    {
        newValues['fight']=Troll.getEnergy();
    }
    if (getHHScriptVars('isEnabledSeason',false))
    {
        newValues['kiss']=Season.getEnergy();
    }
    if (getHHScriptVars('isEnabledQuest',false))
    {
        newValues['quest']=QuestHelper.getEnergy();
    }
    if (getHHScriptVars('isEnabledLeagues',false))
    {
        newValues['challenge']=LeagueHelper.getEnergy();
    }
    if (getHHScriptVars('isEnabledPantheon',false))
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

        if (getHHScriptVars('isEnabledLeagues',false) && newValues['challenge'] > (oldValues['challenge'] +1))
        {
            logHHAuto("Seems league point bought, resetting timer.");
            clearTimer('nextLeaguesTime');
        }
        if (getHHScriptVars('isEnabledSeason',false) && newValues['kiss'] > (oldValues['kiss'] +1))
        {
            logHHAuto("Seems season point bought, resetting timer.");
            clearTimer('nextSeasonTime');
        }
        if (getHHScriptVars('isEnabledPantheon',false) && newValues['worship'] > (oldValues['worship'] +1))
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

export function autoLoop()
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
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        */
        //logHHAuto("lastActionPerformed " + lastActionPerformed);

        const Hero = getHero();
        //if a new event is detected
        const {eventIDs, bossBangEventIDs} = EventModule.parsePageForEventId();
        if(
            busy === false && getHHScriptVars("isEnabledEvents",false) && (lastActionPerformed === "none" || lastActionPerformed === "event" || (getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle") === "true" && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true") )
            &&
            (
                (eventIDs.length > 0 && getPage() !== getHHScriptVars("pagesIDEvent"))
                ||
                (getPage()===getHHScriptVars("pagesIDEvent") && $("#contains_all #events[parsed]").length < eventIDs.length)
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

        if (busy===false && getHHScriptVars("isEnabledShop",false) && Shop.isTimeToCheckShop() && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && (lastActionPerformed === "none" || lastActionPerformed === "shop"))
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

        if(busy === false && getHHScriptVars("isEnabledPowerPlaces",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlaces") === "true" 
        && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && (lastActionPerformed === "none" || lastActionPerformed === "pop"))
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
                        gotoPage(getHHScriptVars("pagesIDHome"));
                    }
                }
            }
        }

        if
            (
                busy === false
                &&
                (
                    getPage() === getHHScriptVars("pagesIDLeagueBattle")
                    || getPage() === getHHScriptVars("pagesIDTrollBattle")
                    || getPage() === getHHScriptVars("pagesIDSeasonBattle")
                    || getPage() === getHHScriptVars("pagesIDPantheonBattle")
                )
                && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true"
                && canCollectCompetitionActive
            )
        {
            busy = true;
            GenericBattle.doBattle();
        }

        if(busy === false && getHHScriptVars("isEnabledTrollBattle",false) 
        && (getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle") === "true" || getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === "true")
        && getHHVars('Hero.infos.questing.id_world')>0 && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && canCollectCompetitionActive
        && (lastActionPerformed === "none" || lastActionPerformed === "troll" || lastActionPerformed === "quest"))
        {
            const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold"));
            const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollRunThreshold"));
            const humanLikeRun = getStoredValue(HHStoredVarPrefixKey+"Temp_TrollHumanLikeRun") === "true";
            const energyAboveThreshold = humanLikeRun && currentPower > threshold || currentPower > Math.max(threshold, runThreshold-1);
            //logHHAuto("fight amount: "+currentPower+" troll threshold: "+threshold+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
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
                        (
                            getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !== undefined
                            && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true"
                            && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true"
                        )
                        &&
                        (
                            currentPower > 0 //has fight => bypassing paranoia
                            || Troll.canBuyFight(false).canBuy // can buy fights
                        )
                    )
                    ||
                    (
                        // normal Event Girl available
                        (
                            getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !== undefined
                            && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "false"
                            && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") ==="true"
                        )
                        &&
                        (
                            energyAboveThreshold
                            || Troll.canBuyFight(false).canBuy // can buy fights
                        )
                    )
                )


            {
                logHHAuto('Troll:', {threshold: threshold, runThreshold:runThreshold, TrollHumanLikeRun: humanLikeRun});
                setStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired", "0");
                busy = true;
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") !== "true" || getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement")[0] !== 'P')
                {
                    busy = Troll.doBossBattle();
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
                /*if (getPage() === getHHScriptVars("pagesIDTrollPreBattle"))
                {
                    logHHAuto("Go to home after troll fight");
                    gotoPage(getHHScriptVars("pagesIDHome"));

                }*/
            }

        }
        else
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired", "0");
        }


        if (busy === false && getHHScriptVars("isEnabledMythicPachinko",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreePachinko") === "true" 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && checkTimer("nextPachinko2Time") && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
            logHHAuto("Time to fetch Mythic Pachinko.");
            busy = Pachinko.getMythicPachinko();
            lastActionPerformed = "pachinko";
        }

        if (busy === false && getHHScriptVars("isEnabledGreatPachinko",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreePachinko") === "true" 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && checkTimer("nextPachinkoTime") && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
            logHHAuto("Time to fetch Great Pachinko.");
            busy = Pachinko.getGreatPachinko();
            lastActionPerformed = "pachinko";
        }

        if (busy === false && getHHScriptVars("isEnabledEquipmentPachinko",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreePachinko") === "true" 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && checkTimer("nextPachinkoEquipTime") && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
            logHHAuto("Time to fetch Equipment Pachinko.");
            busy = Pachinko.getEquipmentPachinko();
            lastActionPerformed = "pachinko";
        }

        if(busy === false && getHHScriptVars("isEnabledContest",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoContest") === "true" 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && (lastActionPerformed === "none" || lastActionPerformed === "contest"))
        {
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas ||$(".contest .ended button[rel='claim']").length>0){
                logHHAuto("Time to get contest rewards.");
                busy = Contest.run();
                lastActionPerformed = "contest";
            }
        }

        if(busy === false && getHHScriptVars("isEnabledMission",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoMission") === "true" 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && (lastActionPerformed === "none" || lastActionPerformed === "mission"))
        {
            if (checkTimer('nextMissionTime')){
                logHHAuto("Time to do missions.");
                busy = Missions.run();
                lastActionPerformed = "mission";
            }
        }

        if (busy === false && getHHScriptVars("isEnabledQuest",false) 
            && (getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) 
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true")) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" 
            && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "quest"))
        {
            if (getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === undefined)
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest", "false");
            }
            let questRequirement = getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement");
            if (questRequirement === "battle")
            {
                if (getHHScriptVars("isEnabledTrollBattle",false) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === "false")
                {
                    logHHAuto("Quest requires battle.");
                    logHHAuto("prepare to save one battle for quest");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest", "true");
                    if(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle") !== "true") {
                        Troll.doBossBattle();
                    }
                }
                busy = true;
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

        if(busy === false && getHHScriptVars("isEnabledSeason",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeason") === "true" 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "season"))
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
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "pantheon"))
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
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "labyrinth"))
        {
            Labyrinth.run();
            busy = true;
            lastActionPerformed = "labyrinth";
        }

        if (busy==false && getHHScriptVars("isEnabledChamps",false) 
            && QuestHelper.getEnergy()>=getHHScriptVars("CHAMP_TICKET_PRICE") && QuestHelper.getEnergy() > Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuestThreshold"))
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoChampsUseEne") ==="true" && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" 
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

        if (busy==false && getHHScriptVars("isEnabledChamps",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoChamps") ==="true" && checkTimer('nextChampionTime') 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && (lastActionPerformed === "none" || lastActionPerformed === "champion"))
        {
            logHHAuto("Time to check on champions!");
            busy=true;
            busy= Champion.doChampionStuff();
            lastActionPerformed = "champion";
        }

        if (busy==false && getHHScriptVars("isEnabledClubChamp",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubChamp") ==="true" && checkTimer('nextClubChampionTime') 
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && (lastActionPerformed === "none" || lastActionPerformed === "clubChampion"))
        {
            logHHAuto("Time to check on club champion!");
            busy=true;
            busy= ClubChampion.doClubChampionStuff();
            lastActionPerformed = "clubChampion";
        }

        if(busy === false && LeagueHelper.isAutoLeagueActivated() && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" 
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
                /*if (getPage() === getHHScriptVars("pagesIDLeaderboard"))
                {
                    logHHAuto("Go to home after league fight");
                    gotoPage(getHHScriptVars("pagesIDHome"));

                }*/
            }
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeason",false) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" &&
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
            busy==false && getHHScriptVars("isEnabledSeasonalEvent",false) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" &&
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
            busy==false && getHHScriptVars("isEnabledSeasonalEvent",false) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" &&
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
            busy==false && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && PathOfValue.isEnabled() &&
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
            busy==false && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && PathOfGlory.isEnabled() &&
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

        if (busy==false && getHHScriptVars("isEnabledFreeBundles",false) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && checkTimer('nextFreeBundlesCollectTime') 
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreeBundlesCollect") === "true" && canCollectCompetitionActive 
            && (lastActionPerformed === "none" || lastActionPerformed === "bundle"))
        {
            busy = true;
            logHHAuto("Time to go and check Free Bundles for collecting reward.");
            Bundles.goAndCollectFreeBundles();
            lastActionPerformed = "bundle";
        }

        if (busy==false && getHHScriptVars("isEnabledDailyGoals",false) && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && checkTimer('nextDailyGoalsCollectTime')
            && getStoredValue(HHStoredVarPrefixKey+"Setting_autoDailyGoalsCollect") === "true" && canCollectCompetitionActive
            && (lastActionPerformed === "none" || lastActionPerformed === "dailyGoals"))
        {
            busy = true;
            logHHAuto("Time to go and check daily Goals for collecting reward.");
            DailyGoals.goAndCollect();
            lastActionPerformed = "dailyGoals";
        }

        if (busy === false && getHHScriptVars("isEnabledSalary",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalary") === "true" 
            && ( getStoredValue(HHStoredVarPrefixKey+"Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )  
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true" && (lastActionPerformed === "none" || lastActionPerformed === "salary"))
        {
            if (checkTimer("nextSalaryTime")) {
                logHHAuto("Time to fetch salary.");
                busy = HaremSalary.getSalary();
                // if(busy) lastActionPerformed = "salary"; // Removed from continuous actions for now
            }
        }

        if(
            busy === false
            && getHHScriptVars("isEnabledBossBangEvent",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent") === "true"
            &&
            (
                (
                    bossBangEventIDs.length > 0
                    && getPage() !== getHHScriptVars("pagesIDEvent")
                )
                ||
                (
                    getPage()===getHHScriptVars("pagesIDEvent")
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
            && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true"
            && Harem.HaremSizeNeedsRefresh(getHHScriptVars("HaremMaxSizeExpirationSecs"))
            && getPage() !== getHHScriptVars("pagesIDHarem")
            && (lastActionPerformed === "none")
        )
        {
            //console.log(! isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")),JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count_date,new Date().getTime() + getHHScriptVars("HaremSizeExpirationSecs") * 1000);
            busy = true;
            gotoPage(getHHScriptVars("pagesIDHarem"));
        }

        if (
            busy === false
            && isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled"))
            && getPage() !== getHHScriptVars("pagesIDHome")
            && getPage() === JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")).page
            && (new Date().getTime() - JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")).dateTime) > getHHScriptVars("minSecsBeforeGoHomeAfterActions") * 1000
        )
        {
            //console.log("testingHome : GotoHome : "+getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled"));
            logHHAuto("Back to home page at the end of actions");
            deleteStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled");
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
    }

    if(busy === false && !mouseBusy  && getStoredValue(HHStoredVarPrefixKey+"Setting_paranoia") === "true" && getStoredValue(HHStoredVarPrefixKey+"Setting_master") ==="true" && getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true")
    {
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    if(busy === false && burst && !mouseBusy && lastActionPerformed != "none")
    {
        lastActionPerformed = "none";
        // logHHAuto("no action performed in this loop, rest lastActionPerformed");
    }
    if (lastActionPerformed != getStoredValue(HHStoredVarPrefixKey+"Temp_lastActionPerformed")) {
        logHHAuto("lastActionPerformed changed to " + lastActionPerformed);
    }
    setStoredValue(HHStoredVarPrefixKey+"Temp_lastActionPerformed", lastActionPerformed);

    switch (getPage())
    {
        case getHHScriptVars("pagesIDLeaderboard"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showCalculatePower") === "true")
            {
                LeagueHelper.moduleSimLeague = callItOnce(LeagueHelper.moduleSimLeague);
                LeagueHelper.moduleSimLeague();
                LeagueHelper.style = callItOnce(LeagueHelper.style);
                LeagueHelper.style();
            }
            break;
        case getHHScriptVars("pagesIDSeasonArena"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showCalculatePower") === "true" && $("div.matchRatingNew img#powerLevelScouter").length < 3)
            {
                Season.moduleSimSeasonBattle();
            }
            break;
        case getHHScriptVars("pagesIDSeason"):
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
        case getHHScriptVars("pagesIDEvent"):
            const eventID = EventModule.getDisplayedIdEventPage();
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
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_PoAMaskRewards") === "true")
                {
                    setTimeout(PathOfAttraction.Hide,500);
                }
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_showClubButtonInPoa") === "true")
                {
                    PathOfAttraction.run = callItOnce(PathOfAttraction.run);
                    PathOfAttraction.run();
                }
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_showRewardsRecap") === "true")
                {
                    RewardHelper.displayRewardsPoaDiv();
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
            break;
        case getHHScriptVars("pagesIDBossBang"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent") === "true")
            {
                setTimeout(BossBang.skipFightPage, randomInterval(500,1500));
            }
            break;
        case getHHScriptVars("pagesIDPoA"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_PoAMaskRewards") === "true")
            {
                setTimeout(PathOfAttraction.runOld,500);
            }
            break;
        case getHHScriptVars("pagesIDPowerplacemain"):
            PlaceOfPower.moduleDisplayPopID();
            break;
        case getHHScriptVars("pagesIDDailyGoals"):
            break;
        case getHHScriptVars("pagesIDMissions"):
            break;
        case getHHScriptVars("pagesIDShop"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showMarketTools") === "true")
            {
                Shop.moduleShopActions();
            }
            if(Booster.needBoosterStatusFromStore()) {
                Booster.collectBoostersFromMarket = callItOnce(Booster.collectBoostersFromMarket);
                Booster.collectBoostersFromMarket();
            }
            break;
        case getHHScriptVars("pagesIDHome"):
            setTimeout(Season.displayRemainingTime,500);
            setTimeout(PathOfValue.displayRemainingTime,500);
            setTimeout(PathOfGlory.displayRemainingTime,500);

            Harem.clearHaremToolVariables = callItOnce(Harem.clearHaremToolVariables); // Avoid wired loop, if user reach home page, ensure temp var from harem are cleared
            Harem.clearHaremToolVariables();
            break;
        case getHHScriptVars("pagesIDHarem"):
            Harem.moduleHarem();
            Harem.moduleHaremExportGirlsData();
            Harem.moduleHaremCountMax();
            Harem.moduleHaremNextUpgradableGirl();
            Harem.haremOpenFirstXUpgradable();
            break;
        case getHHScriptVars("pagesIDGirlPage"):
            HaremGirl.moduleHaremGirl = callItOnce(HaremGirl.moduleHaremGirl);
            HaremGirl.moduleHaremGirl();
            break;
        case getHHScriptVars("pagesIDPachinko"):
            Pachinko.modulePachinko();
            break;
        case getHHScriptVars("pagesIDEditTeam"):
            TeamModule.moduleChangeTeam();
            break;
        case getHHScriptVars("pagesIDContests"):
            break;
        case getHHScriptVars("pagesIDPoV"):
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
        case getHHScriptVars("pagesIDPoG"):
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
        case getHHScriptVars("pagesIDSeasonalEvent"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_SeasonalEventMaskRewards") === "true")
            {
                SeasonalEvent.maskReward();
            }
            SeasonalEvent.getRemainingTime = callItOnce(SeasonalEvent.getRemainingTime);
            SeasonalEvent.getRemainingTime();
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showRewardsRecap") === "true")
            {
                SeasonalEvent.displayRewardsSeasonalDiv();
                SeasonalEvent.displayGirlsMileStones();
            }
            break;
        case getHHScriptVars("pagesIDChampionsMap"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoChamps") ==="true") {
                Champion.findNextChamptionTime = callItOnce(Champion.findNextChamptionTime);
                setTimeout(Champion.findNextChamptionTime,500);
            }
            break;
        case getHHScriptVars("pagesIDChampionsPage"):
            Champion.moduleSimChampions();
            break;
        case getHHScriptVars("pagesIDClubChampion"):
            Champion.moduleSimChampions();
            ClubChampion.resetTimerIfNeeded = callItOnce(ClubChampion.resetTimerIfNeeded);
            ClubChampion.resetTimerIfNeeded();
            break;
        case getHHScriptVars("pagesIDQuest"):
            const haremItem = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlActions");
            const haremGirlMode = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlMode");
            if(haremGirlMode && haremItem === HaremGirl.AFFECTION_TYPE) {
                HaremGirl.payGirlQuest = callItOnce(HaremGirl.payGirlQuest);
                HaremGirl.payGirlQuest();
            }
            break;
        case getHHScriptVars("pagesIDClub"):
            Club.run();
            break;
        case getHHScriptVars("pagesIDLabyrinth"):
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_showCalculatePower") === "true")
            {
                Labyrinth.sim();
            }
            break;
    }


    if(isNaN(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")))
    {
        logHHAuto("AutoLoopTimeMili is not a number.");
        setDefaults(true);
    }
    else if (getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") === "true")
    {
        setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
    }
    else
    {
        logHHAuto("autoLoop Disabled");
    }

}