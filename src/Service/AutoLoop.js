import { setDefaults } from ".";
import {
    HeroHelper,
    RewardHelper,
    canCollectCompetitionActive,
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
} from "../Helper";
import {
    Booster,
    BossBang,
    Bundles,
    Champion,
    Club,
    ClubChampion,
    Contest,
    DailyGoals,
    EventModule,
    GenericBattle,
    Harem,
    HaremGirl,
    HaremSalary,
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
} from "../Module";
import { Shop } from "../Module/Shop";
import {
    callItOnce,
    checkAndClosePopup,
    isJSON,
    logHHAuto
} from "../Utils";
import { updateData } from "./InfoService";
import { mouseBusy } from "./MouseService";
import { gotoPage } from "./PageNavigationService";
import { checkParanoiaSpendings, clearParanoiaSpendings, flipParanoia, updatedParanoiaSpendings } from "./ParanoiaService";

export let busy = false;


export function getBurst()
{
    if (document.getElementById('sMenu'))
    {
        if (document.getElementById('sMenu').style.display!=='none' )// && !document.getElementById("DebugDialog").open)
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
    return getStoredValue("HHAuto_Setting_master") ==="true"&&(!(getStoredValue("HHAuto_Setting_paranoia") ==="true") || getStoredValue("HHAuto_Temp_burst") ==="true");
}


export function CheckSpentPoints()
{
    let oldValues=getStoredValue("HHAuto_Temp_CheckSpentPoints")?JSON.parse(getStoredValue("HHAuto_Temp_CheckSpentPoints")):-1;
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
        setStoredValue("HHAuto_Temp_CheckSpentPoints", JSON.stringify(newValues));

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
        setStoredValue("HHAuto_Temp_CheckSpentPoints", JSON.stringify(newValues));
    }
}

export function autoLoop()
{
    updateData();
    if (getStoredValue("HHAuto_Temp_questRequirement") === undefined)
    {
        setStoredValue("HHAuto_Temp_questRequirement", "none");
    }
    if (getStoredValue("HHAuto_Temp_battlePowerRequired") === undefined)
    {
        setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
    }

    //var busy = false;
    busy = false;
    var page = window.location.href;
    var currentPower = Troll.getEnergy();

    var burst=getBurst();
    switchHHMenuButton(burst);
    //console.log("burst : "+burst);
    checkAndClosePopup(burst);

    if (burst && !mouseBusy /*|| checkTimer('nextMissionTime')*/)
    {

        if (!checkTimer("paranoiaSwitch") )
        {
            clearParanoiaSpendings();
        }
        CheckSpentPoints();

        //check what happen to timer if no more wave before uncommenting
        /*if (getStoredValue("HHAuto_Setting_plusEventMythic") ==="true" && checkTimerMustExist('eventMythicNextWave'))
        {
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        */

        const Hero = getHero();
        //if a new event is detected
        const {eventIDs, bossBangEventIDs} = EventModule.parsePageForEventId();
        if(
            busy === false && getHHScriptVars("isEnabledEvents",false)
            &&
            (
                (eventIDs.length > 0 && getPage() !== getHHScriptVars("pagesIDEvent"))
                ||
                (getPage()===getHHScriptVars("pagesIDEvent") && $("#contains_all #events[parsed]").length === 0)
            )
        )
        {
            logHHAuto("Going to check on events.");
            busy = true;
            busy = EventModule.parseEventPage(eventIDs[0]);
        }

        if (busy===false && getHHScriptVars("isEnabledShop",false) && Shop.isTimeToCheckShop() && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (getStoredValue("HHAuto_Temp_charLevel") ===undefined)
            {
                setStoredValue("HHAuto_Temp_charLevel", 0);
            }
            if (checkTimer('nextShopTime') || getStoredValue("HHAuto_Temp_charLevel")<getHHVars('Hero.infos.level')) {
                logHHAuto("Time to check shop.");
                busy = Shop.updateShop();
            }
        }

        if(busy === false && getHHScriptVars("isEnabledPowerPlaces",false) && getStoredValue("HHAuto_Setting_autoPowerPlaces") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {

            var popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
            if (popToStart.length != 0 || checkTimer('minPowerPlacesTime'))
            {
                //if PopToStart exist bypass function
                var popToStartExist = getStoredValue("HHAuto_Temp_PopToStart")?true:false;
                //logHHAuto("startcollect : "+popToStartExist);
                if (! popToStartExist)
                {
                    //logHHAuto("pop1:"+popToStart);
                    logHHAuto("Go and collect");
                    busy = true;
                    busy = PlaceOfPower.collectAndUpdate();
                }
                var indexes=(getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter")).split(";");

                popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
                //console.log(indexes, popToStart);
                for(var pop of popToStart)
                {
                    if (busy === false && ! indexes.includes(String(pop)))
                    {
                        logHHAuto("PoP is no longer in list :"+pop+" removing it from start list.");
                        PlaceOfPower.removePopFromPopToStart(pop);
                    }
                }
                popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
                //logHHAuto("pop2:"+popToStart);
                for(var index of indexes)
                {
                    if (busy === false && popToStart.includes(Number(index)))
                    {
                        logHHAuto("Time to do PowerPlace"+index+".");
                        busy = true;
                        busy = PlaceOfPower.doPowerPlacesStuff(index);
                    }
                }
                if (busy === false)
                {
                    //logHHAuto("pop3:"+getStoredValue("HHAuto_Temp_PopToStart"));
                    popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
                    //logHHAuto("pop3:"+popToStart);
                    if (popToStart.length === 0)
                    {
                        //logHHAuto("removing popToStart");
                        sessionStorage.removeItem('HHAuto_Temp_PopToStart');
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
                && getStoredValue("HHAuto_Temp_autoLoop") === "true"
                && canCollectCompetitionActive()
            )
        {
            busy = true;
            GenericBattle.doBattle();
        }

        if(busy === false && getHHScriptVars("isEnabledTrollBattle",false) 
        && (getStoredValue("HHAuto_Setting_autoTrollBattle") === "true" || getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true")
        && getHHVars('Hero.infos.questing.id_world')>0 && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            const threshold = Number(getStoredValue("HHAuto_Setting_autoTrollThreshold"));
            const runThreshold = Number(getStoredValue("HHAuto_Setting_autoTrollRunThreshold"));
            const humanLikeRun = getStoredValue("HHAuto_Temp_TrollHumanLikeRun") === "true";
            const energyAboveThreshold = humanLikeRun && currentPower > threshold || currentPower > Math.max(threshold, runThreshold-1);
            //logHHAuto("fight amount: "+currentPower+" troll threshold: "+threshold+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
            if
                (
                    //normal case
                    (
                        currentPower >= Number(getStoredValue("HHAuto_Temp_battlePowerRequired"))
                        && currentPower > 0
                        &&
                        (
                            energyAboveThreshold
                            || getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true"
                        )
                    )
                    || Number(checkParanoiaSpendings('fight')) > 0 //paranoiaspendings to do
                    ||
                    (
                        // mythic Event Girl available and fights available
                        (
                            getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                            && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                            && getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
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
                            getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                            && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                            && getStoredValue("HHAuto_Setting_plusEvent") ==="true"
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
                setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
                busy = true;
                if (getStoredValue("HHAuto_Setting_autoQuest") !== "true" || getStoredValue("HHAuto_Temp_questRequirement")[0] !== 'P')
                {
                    busy = Troll.doBossBattle();
                }
                else
                {
                    logHHAuto("AutoBattle disabled for power collection for AutoQuest.");
                    document.getElementById("autoTrollBattle").checked = false;
                    setStoredValue("HHAuto_Setting_autoTrollBattle", "false");
                    busy = false;
                }
            }
            else
            {
                if(getStoredValue("HHAuto_Temp_TrollHumanLikeRun") === "true") {
                    // end run
                    setStoredValue("HHAuto_Temp_TrollHumanLikeRun", "false");
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
            setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
        }


        if (busy === false && getHHScriptVars("isEnabledGreatPachinko",false) && getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinkoTime") && canCollectCompetitionActive()) {
            logHHAuto("Time to fetch Great Pachinko.");
            busy = Pachinko.getGreatPachinko();
        }

        if (busy === false && getHHScriptVars("isEnabledMythicPachinko",false) && getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinko2Time") && canCollectCompetitionActive()) {
            logHHAuto("Time to fetch Mythic Pachinko.");
            busy = Pachinko.getMythicPachinko();
        }

        if (busy === false && getHHScriptVars("isEnabledEquipmentPachinko",false) && getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinkoEquipTime") && canCollectCompetitionActive()) {
            logHHAuto("Time to fetch Equipment Pachinko.");
            busy = Pachinko.getEquipmentPachinko();
        }

        if(busy === false && getHHScriptVars("isEnabledContest",false) && getStoredValue("HHAuto_Setting_autoContest") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas ||$(".contest .ended button[rel='claim']").length>0){
                logHHAuto("Time to get contest rewards.");
                busy = Contest.run();
            }
        }

        if(busy === false && getHHScriptVars("isEnabledMission",false) && getStoredValue("HHAuto_Setting_autoMission") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer('nextMissionTime')){
                logHHAuto("Time to do missions.");
                busy = Missions.run();
            }
        }

        if (busy === false && getHHScriptVars("isEnabledQuest",false) && (getStoredValue("HHAuto_Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) && getStoredValue("HHAuto_Setting_autoSideQuest") === "true")) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            if (getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === undefined)
            {
                setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
            }
            let questRequirement = getStoredValue("HHAuto_Temp_questRequirement");
            if (questRequirement === "battle")
            {
                if (getHHScriptVars("isEnabledTrollBattle",false) && getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "false")
                {
                    logHHAuto("Quest requires battle.");
                    logHHAuto("prepare to save one battle for quest");
                    setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "true");
                    if(getStoredValue("HHAuto_Setting_autoTrollBattle") !== "true") {
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
                    setStoredValue("HHAuto_Temp_questRequirement", "none");
                    QuestHelper.run();
                    busy = true;
                }
                else
                {
                    //prevent paranoia to wait for quest
                    setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                    if(isNaN(questRequirement.substr(1)))
                    {
                        logHHAuto(questRequirement);
                        setStoredValue("HHAuto_Temp_questRequirement", "none");
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
                    if (Number(energyCurrent) > Number(getStoredValue("HHAuto_Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
                    {
                        // We have enough energy... requirement fulfilled.
                        logHHAuto("Continuing quest, required energy obtained.");
                        setStoredValue("HHAuto_Temp_questRequirement", "none");
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
                    setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
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
                    setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                }
                else
                {
                    logHHAuto("Battle Power obtained, resuming quest...");
                    setStoredValue("HHAuto_Temp_questRequirement", "none");
                    QuestHelper.run();
                    busy = true;
                }
            }
            else if (questRequirement === "unknownQuestButton")
            {
                //prevent paranoia to wait for quest
                setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                if (getStoredValue("HHAuto_Setting_autoQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    document.getElementById("autoQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoQuest", "false");
                }
                if (getStoredValue("HHAuto_Setting_autoSideQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    document.getElementById("autoSideQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoSideQuest", "false");
                }
                setStoredValue("HHAuto_Temp_questRequirement", "none");
                busy = false;
            }
            else if (questRequirement === "errorInAutoBattle")
            {
                //prevent paranoia to wait for quest
                setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                if (getStoredValue("HHAuto_Setting_autoQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    document.getElementById("autoQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoQuest", "false");
                }
                if (getStoredValue("HHAuto_Setting_autoSideQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    document.getElementById("autoSideQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoSideQuest", "false");
                }
                setStoredValue("HHAuto_Temp_questRequirement", "none");
                busy = false;
            }
            else if(questRequirement === "none")
            {
                if (checkTimer('nextMainQuestAttempt') && checkTimer('nextSideQuestAttempt'))
                {
                    if (QuestHelper.getEnergy() > Number(getStoredValue("HHAuto_Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
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
                setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                logHHAuto("Invalid quest requirement : "+questRequirement);
                busy=false;
            }
        }
        else if(getStoredValue("HHAuto_Setting_autoQuest") === "false" && getStoredValue("HHAuto_Setting_autoSideQuest") === "false")
        {
            setStoredValue("HHAuto_Temp_questRequirement", "none");
        }

        if(busy === false && getHHScriptVars("isEnabledSeason",false) && getStoredValue("HHAuto_Setting_autoSeason") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            if (Season.isTimeToFight())
            {
                logHHAuto("Time to fight in Season.");
                Season.run();
                busy = true;
            }
            else if (checkTimer('nextSeasonTime'))
            {
                if(getStoredValue("HHAuto_Temp_SeasonHumanLikeRun") === "true") {
                    // end run
                    setStoredValue("HHAuto_Temp_SeasonHumanLikeRun", "false");
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

        if(busy === false && getHHScriptVars("isEnabledPantheon",false) && getStoredValue("HHAuto_Setting_autoPantheon") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            if (Pantheon.isTimeToFight())
            {
                logHHAuto("Time to do Pantheon.");
                Pantheon.run();
                busy = true;
            }
            else if (checkTimer('nextPantheonTime'))
            {
                if(getStoredValue("HHAuto_Temp_PantheonHumanLikeRun") === "true") {
                    // end run
                    setStoredValue("HHAuto_Temp_PantheonHumanLikeRun", "false");
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
            }
        }

        if (busy==false && getHHScriptVars("isEnabledChamps",false) 
            && QuestHelper.getEnergy()>=60 && QuestHelper.getEnergy() > Number(getStoredValue("HHAuto_Setting_autoQuestThreshold"))
            && getStoredValue("HHAuto_Setting_autoChampsUseEne") ==="true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            function buyTicket()
            {
                var params = {
                    action: 'champion_buy_ticket',
                    currency: 'energy_quest',
                    amount: "1"
                };
                logHHAuto('Buying ticket with energy');
                hh_ajax(params, function(data) {
                    //anim_number($('.tickets_number_amount'), data.tokens - amount, amount);
                    Hero.updates(data.hero_changes);
                    location.reload();
                });
            }
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            busy = true;
            setTimeout(buyTicket,randomInterval(800,1600));
        }

        if (busy==false && getHHScriptVars("isEnabledChamps",false) && getStoredValue("HHAuto_Setting_autoChamps") ==="true" && checkTimer('nextChampionTime') && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            logHHAuto("Time to check on champions!");
            busy=true;
            busy= Champion.doChampionStuff();
        }

        if (busy==false && getHHScriptVars("isEnabledClubChamp",false) && getStoredValue("HHAuto_Setting_autoClubChamp") ==="true" && checkTimer('nextClubChampionTime') && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            logHHAuto("Time to check on club champion!");
            busy=true;
            busy= ClubChampion.doClubChampionStuff();
        }

        if(busy === false && getHHScriptVars("isEnabledLeagues",false) && LeagueHelper.isAutoLeagueActivated() && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            // Navigate to leagues
            if (LeagueHelper.isTimeToFight())
            {
                logHHAuto("Time to fight in Leagues.");
                LeagueHelper.doLeagueBattle();
                busy = true;
            }
            else
            {
                if(getStoredValue("HHAuto_Temp_LeagueHumanLikeRun") === "true") {
                    // end run
                    setStoredValue("HHAuto_Temp_LeagueHumanLikeRun", "false");
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
                /*if (getPage() === getHHScriptVars("pagesIDLeaderboard"))
                {
                    logHHAuto("Go to home after league fight");
                    gotoPage(getHHScriptVars("pagesIDHome"));

                }*/
            }
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeason",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" &&
            (
                checkTimer('nextSeasonCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonCollect") === "true" && canCollectCompetitionActive()
                ||
                getStoredValue("HHAuto_Setting_autoSeasonCollectAll") === "true" && checkTimer('nextSeasonCollectAllTime') && (getTimer('SeasonRemainingTime') == -1 || getSecondsLeft('SeasonRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check Season for collecting reward.");
            busy = true;
            busy = Season.goAndCollect();
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeasonalEvent",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" &&
            (
                checkTimer('nextSeasonalEventCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive()
                ||
                getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true" && checkTimer('nextSeasonalEventCollectAllTime') && (getTimer('SeasonalEventRemainingTime') == -1 || getSecondsLeft('SeasonalEventRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check SeasonalEvent for collecting reward.");
            busy = true;
            busy = SeasonalEvent.goAndCollect();
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeasonalEvent",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" &&
            checkTimer('nextMegaEventRankCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive()
        )
        {
            logHHAuto("Time to go and check  SeasonalEvent for collecting rank reward.");
            busy = true;
            busy = SeasonalEvent.goAndCollectMegaEventRankRewards();
        }

        if (
            busy==false && getHHScriptVars("isEnabledPoV",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && getHHVars('Hero.infos.level')>=30 &&
            (
                checkTimer('nextPoVCollectTime') && getStoredValue("HHAuto_Setting_autoPoVCollect") === "true" && canCollectCompetitionActive()
                ||
                getStoredValue("HHAuto_Setting_autoPoVCollectAll") === "true" && checkTimer('nextPoVCollectAllTime') && (getTimer('PoVRemainingTime') == -1 || getSecondsLeft('PoVRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check Path of Valor for collecting reward.");
            busy = true;
            busy = PathOfValue.goAndCollect();
        }

        if (
            busy==false && getHHScriptVars("isEnabledPoG",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && getHHVars('Hero.infos.level')>=30 &&
            (
                checkTimer('nextPoGCollectTime') && getStoredValue("HHAuto_Setting_autoPoGCollect") === "true" && canCollectCompetitionActive()
                ||
                getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true" && checkTimer('nextPoGCollectAllTime') && (getTimer('PoGRemainingTime') == -1 || getSecondsLeft('PoGRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check Path of Glory for collecting reward.");
            busy = true;
            busy = PathOfGlory.goAndCollect();
        }

        if (busy==false && getHHScriptVars("isEnabledFreeBundles",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer('nextFreeBundlesCollectTime') && getStoredValue("HHAuto_Setting_autoFreeBundlesCollect") === "true" && canCollectCompetitionActive())
        {
            busy = true;
            logHHAuto("Time to go and check Free Bundles for collecting reward.");
            Bundles.goAndCollectFreeBundles();
        }

        if (busy==false && getHHScriptVars("isEnabledDailyGoals",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer('nextDailyGoalsCollectTime') && getStoredValue("HHAuto_Setting_autoDailyGoalsCollect") === "true" && canCollectCompetitionActive())
        {
            busy = true;
            logHHAuto("Time to go and check daily Goals for collecting reward.");
            DailyGoals.goAndCollect();
        }

        if (busy === false && getHHScriptVars("isEnabledSalary",false) && getStoredValue("HHAuto_Setting_autoSalary") === "true" && ( getStoredValue("HHAuto_Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )  && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer("nextSalaryTime")) {
                logHHAuto("Time to fetch salary.");
                busy = true;
                busy = HaremSalary.getSalary();
            }
        }

        if(
            busy === false
            && getHHScriptVars("isEnabledBossBangEvent",false) && getStoredValue("HHAuto_Setting_bossBangEvent") === "true"
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
            )
        )
        {
            logHHAuto("Going to boss bang event.");
            busy = true;
            busy = EventModule.parseEventPage(bossBangEventIDs[0]);
        }

        if (
            busy === false
            && getStoredValue("HHAuto_Temp_autoLoop") === "true"
            && Harem.HaremSizeNeedsRefresh(getHHScriptVars("HaremMaxSizeExpirationSecs"))
            && getPage() !== getHHScriptVars("pagesIDHarem")

        )
        {
            //console.log(! isJSON(getStoredValue("HHAuto_Temp_HaremSize")),JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count_date,new Date().getTime() + getHHScriptVars("HaremSizeExpirationSecs") * 1000);
            busy = true;
            gotoPage(getHHScriptVars("pagesIDHarem"));
        }

        if (
            busy === false
            && isJSON(getStoredValue("HHAuto_Temp_LastPageCalled"))
            && getPage() !== getHHScriptVars("pagesIDHome")
            && getPage() === JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).page
            && (new Date().getTime() - JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).dateTime) > getHHScriptVars("minSecsBeforeGoHomeAfterActions") * 1000
        )
        {
            //console.log("testingHome : GotoHome : "+getStoredValue("HHAuto_Temp_LastPageCalled"));
            logHHAuto("Back to home page at the end of actions");
            deleteStoredValue("HHAuto_Temp_LastPageCalled");
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
    }

    if(busy === false && !mouseBusy  && getStoredValue("HHAuto_Setting_paranoia") === "true" && getStoredValue("HHAuto_Setting_master") ==="true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
    {
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    switch (getPage())
    {
        case getHHScriptVars("pagesIDLeaderboard"):
            if (getStoredValue("HHAuto_Setting_showCalculatePower") === "true")
            {
                LeagueHelper.moduleSimLeague();
                LeagueHelper.style = callItOnce(LeagueHelper.style);
                LeagueHelper.style();
            }
            break;
        case getHHScriptVars("pagesIDSeasonArena"):
            if (getStoredValue("HHAuto_Setting_showCalculatePower") === "true" && $("div.matchRatingNew img#powerLevelScouter").length < 3)
            {
                Season.moduleSimSeasonBattle();
            }
            break;
        case getHHScriptVars("pagesIDSeason"):
            if (getStoredValue("HHAuto_Setting_SeasonMaskRewards") === "true")
            {
                setTimeout(Season.maskReward,500);
            }
            Season.getRemainingTime = callItOnce(Season.getRemainingTime);
            Season.getRemainingTime();
            if (getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsSeasonDiv();
            }
            break;
        case getHHScriptVars("pagesIDEvent"):
            if (getStoredValue("HHAuto_Setting_plusEvent") === "true" || getStoredValue("HHAuto_Setting_plusEventMythic") ==="true")
            {
                EventModule.parseEventPage();
                EventModule.moduleDisplayEventPriority();
            }
            if (getStoredValue("HHAuto_Setting_bossBangEvent") === "true")
            {
                EventModule.parseEventPage();
                setTimeout(BossBang.goToFightPage, randomInterval(500,1500));
            }
            if (getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
            {
                setTimeout(PathOfAttraction.Hide,500);
            }
            if (getStoredValue("HHAuto_Setting_showClubButtonInPoa") === "true")
            {
                PathOfAttraction.run = callItOnce(PathOfAttraction.run);
                PathOfAttraction.run();
            }
            if (getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPoaDiv();
            }
            break;
        case getHHScriptVars("pagesIDBossBang"):
            if (getStoredValue("HHAuto_Setting_bossBangEvent") === "true")
            {
                setTimeout(BossBang.skipFightPage, randomInterval(500,1500));
            }
            break;
        case getHHScriptVars("pagesIDPoA"):
            if (getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
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
            if (getStoredValue("HHAuto_Setting_showMarketTools") === "true")
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
            if (getStoredValue("HHAuto_Setting_PoVMaskRewards") === "true")
            {
                PathOfValue.maskReward();
            }
            PathOfValue.getRemainingTime = callItOnce(PathOfValue.getRemainingTime);
            PathOfValue.getRemainingTime();
            if (getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPovPogDiv();
            }
            break;
        case getHHScriptVars("pagesIDPoG"):
            if (getStoredValue("HHAuto_Setting_PoGMaskRewards") === "true")
            {
                PathOfGlory.maskReward();
            }
            PathOfGlory.getRemainingTime = callItOnce(PathOfGlory.getRemainingTime);
            PathOfGlory.getRemainingTime();
            if (getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPovPogDiv();
            }
            break;
        case getHHScriptVars("pagesIDSeasonalEvent"):
            if (getStoredValue("HHAuto_Setting_SeasonalEventMaskRewards") === "true")
            {
                SeasonalEvent.maskReward();
            }
            SeasonalEvent.getRemainingTime = callItOnce(SeasonalEvent.getRemainingTime);
            SeasonalEvent.getRemainingTime();
            if (getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                SeasonalEvent.displayRewardsSeasonalDiv();
                SeasonalEvent.displayGirlsMileStones();
            }
            break;
        case getHHScriptVars("pagesIDChampionsPage"):
            Champion.moduleSimChampions();
            break;
        case getHHScriptVars("pagesIDClubChampion"):
            Champion.moduleSimChampions();
            break;
        case getHHScriptVars("pagesIDQuest"):
            const haremItem = getStoredValue("HHAuto_Temp_haremGirlActions");
            const haremGirlMode = getStoredValue("HHAuto_Temp_haremGirlMode");
            if(haremGirlMode && haremItem === HaremGirl.AFFECTION_TYPE) {
                HaremGirl.payGirlQuest = callItOnce(HaremGirl.payGirlQuest);
                HaremGirl.payGirlQuest();
            }
            break;
        case getHHScriptVars("pagesIDClub"):
            Club.run();
            // if (!checkTimer('nextClubChampionTime') && getNextClubChampionTimer() == -1) {
            //     updateClubChampionTimer();
            // }
            break;
    }


    if(isNaN(getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
    {
        logHHAuto("AutoLoopTimeMili is not a number.");
        setDefaults(true);
    }
    else if (getStoredValue("HHAuto_Temp_autoLoop") === "true")
    {
        setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
    }
    else
    {
        logHHAuto("autoLoop Disabled");
    }

}