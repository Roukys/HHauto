import {
    getHHScriptVars,
    getHHVars,
    getHero,
    getSecondsLeft,
    getStoredValue,
    getTimer,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { LeagueHelper, Pantheon, PlaceOfPower, QuestHelper, Season, Troll } from "../Module";
import { isJSON, logHHAuto } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";
import { getBurst } from "./AutoLoop";
import { gotoPage } from "./PageNavigationService";


function replacerMap(key, value) {
    const originalObject = this[key];
    if(originalObject instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
        };
    } else {
        return value;
    }
}

function reviverMap(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

export function checkParanoiaSpendings(spendingFunction)
{
    var pSpendings=new Map([]);
    // not set
    if ( getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        pSpendings = JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaSpendings"),reviverMap);
    }

    if ( getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked") !== undefined && pSpendings.has('quest'))
    {
        pSpendings.delete('quest');
    }

    if ( getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaLeagueBlocked") !== undefined && pSpendings.has('challenge'))
    {
        pSpendings.delete('challenge');
    }

    // for all count remaining
    if (spendingFunction === undefined)
    {
        var spendingsRemaining=0;
        for (var i of pSpendings.values())
        {
            spendingsRemaining+=i;
        }
        //logHHAuto("Paranoia spending remaining : "+JSON.stringify(pSpendings,replacerMap));
        return spendingsRemaining;
    }
    else
    {
        // return value if exist else -1
        if (!pSpendings.has(spendingFunction))
        {
            return -1;
        }
        return pSpendings.get(spendingFunction);
    }
}

export function clearParanoiaSpendings()
{
    sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_paranoiaSpendings');
    sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_NextSwitch');
    sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_paranoiaQuestBlocked');
    sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_paranoiaLeagueBlocked');
}

export function updatedParanoiaSpendings(inSpendingFunction, inSpent)
{
    var currentPSpendings=new Map([]);
    // not set
    if ( getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        currentPSpendings = JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaSpendings"),reviverMap);
        if (currentPSpendings.has(inSpendingFunction))
        {
            let currValue = currentPSpendings.get(inSpendingFunction);
            currValue -= inSpent;

            if (currValue >0)
            {
                logHHAuto("Spent "+inSpent+" "+inSpendingFunction+", remains "+currValue+" before Paranoia.");
                currentPSpendings.set(inSpendingFunction,currValue);
            }
            else
            {
                currentPSpendings.delete(inSpendingFunction);
            }
        }
        logHHAuto("Remains to spend before Paranoia : "+JSON.stringify(currentPSpendings,replacerMap));
        setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaSpendings", JSON.stringify(currentPSpendings,replacerMap));

    }
}

//sets spending to do before paranoia
export function setParanoiaSpendings()
{
    var maxPointsDuringParanoia;
    var totalPointsEndParanoia;
    var paranoiaSpendings=new Map([]);
    var paranoiaSpend;
    var currentEnergy;
    var maxEnergy;
    var toNextSwitch;
    if (getStoredValue(HHStoredVarPrefixKey+"Temp_NextSwitch") !== undefined && getStoredValue(HHStoredVarPrefixKey+"Setting_paranoiaSpendsBefore") === "true")
    {
        toNextSwitch = Number((getStoredValue(HHStoredVarPrefixKey+"Temp_NextSwitch")-new Date().getTime())/1000);

        //if autoLeague is on
        if(getHHScriptVars('isEnabledLeagues',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20)
        {
            if ( getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaLeagueBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.challenge.next_refresh_ts')))/Number(getHHVars('Hero.energies.challenge.seconds_per_point')));
                currentEnergy=LeagueHelper.getEnergy();
                maxEnergy=LeagueHelper.getEnergyMax();
                totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if ( totalPointsEndParanoia >= maxEnergy)
                {
                    paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("challenge",paranoiaSpend);
                    logHHAuto("Setting Paranoia spendings for league : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
                }
                else
                {
                    logHHAuto("Setting Paranoia spendings for league : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
                }
            }
        }
        //if autoquest is on
        if(getHHScriptVars('isEnabledQuest',false) && (getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true")))
        {
            if ( getStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaQuestBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.quest.next_refresh_ts')))/Number(getHHVars('Hero.energies.quest.seconds_per_point')));
                currentEnergy=QuestHelper.getEnergy();
                maxEnergy=QuestHelper.getEnergyMax();
                totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if ( totalPointsEndParanoia >= maxEnergy)
                {
                    paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("quest",paranoiaSpend);
                    logHHAuto("Setting Paranoia spendings for quest : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
                }
                else
                {
                    logHHAuto("Setting Paranoia spendings for quest : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
                }
            }
        }
        //if autoTrollBattle is on
        if(getHHScriptVars('isEnabledTrollBattle',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle") === "true" && getHHVars('Hero.infos.questing.id_world')>0)
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.fight.next_refresh_ts')))/Number(getHHVars('Hero.energies.fight.seconds_per_point')));
            currentEnergy=Troll.getEnergy();
            maxEnergy=Troll.getEnergyMax();
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("fight",paranoiaSpend);
                logHHAuto("Setting Paranoia spendings for troll : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                logHHAuto("Setting Paranoia spendings for troll : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }
        //if autoSeason is on
        if(getHHScriptVars('isEnabledSeason',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeason") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.kiss.next_refresh_ts')))/Number(getHHVars('Hero.energies.kiss.seconds_per_point')));
            currentEnergy=Season.getEnergy();
            maxEnergy=Season.getEnergyMax();
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("kiss",paranoiaSpend);
                logHHAuto("Setting Paranoia spendings for Season : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                logHHAuto("Setting Paranoia spendings for Season : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }
        //if autoPantheon is on
        if(getHHScriptVars('isEnabledPantheon',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheon") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.worship.next_refresh_ts')))/Number(getHHVars('Hero.energies.worship.seconds_per_point')));
            currentEnergy=Pantheon.getEnergy();
            maxEnergy=Pantheon.getEnergyMax();
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("worship",paranoiaSpend);
                logHHAuto("Setting Paranoia spendings for Pantheon : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                logHHAuto("Setting Paranoia spendings for Pantheon : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }

        logHHAuto("Setting paranoia spending to : "+JSON.stringify(paranoiaSpendings,replacerMap));
        setStoredValue(HHStoredVarPrefixKey+"Temp_paranoiaSpendings", JSON.stringify(paranoiaSpendings,replacerMap));
    }
}

export function flipParanoia()
{
    var burst=getBurst();

    var Setting=getStoredValue(HHStoredVarPrefixKey+"Setting_paranoiaSettings");

    var S1=Setting.split('/').map(s=>s.split('|').map(s=>s.split(':')));

    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => {if (n<x[0]) {period=x[1]; return true;}});

    if (burst)
    {
        var periods=Object.assign(...S1[1].map(d => ({[d[0]]: d[1].split('-')})));

        toNextSwitch=getStoredValue(HHStoredVarPrefixKey+"Temp_NextSwitch")?Number((getStoredValue(HHStoredVarPrefixKey+"Temp_NextSwitch")-new Date().getTime())/1000):randomInterval(Number(periods[period][0]),Number(periods[period][1]));

        //match mythic new wave with end of sleep
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollMythicByPassParanoia") === "true" && getTimer("eventMythicNextWave") !== -1 && toNextSwitch>getSecondsLeft("eventMythicNextWave"))
        {
            logHHAuto("Forced rest only until next mythic wave.");
            toNextSwitch=getSecondsLeft("eventMythicNextWave");
        }

        //bypass Paranoia if ongoing mythic
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollMythicByPassParanoia") === "true" && getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !==undefined && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic==="true")
        {
            //             var trollThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold"));
            //             if (getStoredValue(HHStoredVarPrefixKey+"Setting_buyMythicCombat") === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollMythicByPassThreshold") === "true")
            //             {
            //                 trollThreshold = 0;
            //             }
            //mythic onGoing and still have some fight above threshold
            if (Troll.getEnergy() > 0) //trollThreshold)
            {
                logHHAuto("Forced bypass Paranoia for mythic (can fight).");
                setTimer('paranoiaSwitch',60);
                return;
            }

            //mythic ongoing and can buyCombat
            // const Hero=getHero();
            // var price=Hero.get_recharge_cost("fight");
            if (Troll.canBuyFight().canBuy && Troll.getEnergy()==0)
            {

                logHHAuto("Forced bypass Paranoia for mythic (can buy).");
                setTimer('paranoiaSwitch',60);
                return;
            }
        }

        if ( checkParanoiaSpendings() === -1 && getStoredValue(HHStoredVarPrefixKey+"Setting_paranoiaSpendsBefore") === "true" )
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_NextSwitch", new Date().getTime() + toNextSwitch * 1000);
            setParanoiaSpendings();
            return;
        }

        if ( checkParanoiaSpendings() === 0 || getStoredValue(HHStoredVarPrefixKey+"Setting_paranoiaSpendsBefore") === "false" )
        {
            clearParanoiaSpendings();
            PlaceOfPower.cleanTempPopToStart();
            //going into hiding
            setStoredValue(HHStoredVarPrefixKey+"Temp_burst", "false");
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        else
        {
            //refresh remaining
            //setParanoiaSpendings(toNextSwitch);
            //let spending go before going in paranoia
            return;
        }
    }
    else
    {
        //if (getPage()!=getHHScriptVars("pagesIDHome")) return;
        //going to work
        setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        setStoredValue(HHStoredVarPrefixKey+"Temp_burst", "true");
        var b=S1[0][0][0].split('-');
        toNextSwitch=randomInterval(Number(b[0]),Number(b[1]));
    }
    var ND=new Date().getTime() + toNextSwitch * 1000;
    var message=period+(burst?" rest":" burst");
    logHHAuto("PARANOIA: "+message);
    setStoredValue(HHStoredVarPrefixKey+"Temp_pinfo", message);

    setTimer('paranoiaSwitch',toNextSwitch);
    //force recheck non completed event after paranoia
    if (getStoredValue(HHStoredVarPrefixKey+"Temp_burst") =="true")
    {
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList")):{};
        for (let eventID of Object.keys(eventList))
        {
            //console.log(eventID);
            if (!eventList[eventID]["isCompleted"])
            {
                eventList[eventID]["next_refresh"]=new Date().getTime()-1000;
                //console.log("expire");
                if(Object.keys(eventList).length >0)
                {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_eventsList", JSON.stringify(eventList));
                }
            }
        }
        //sessionStorage.removeItem(HHStoredVarPrefixKey+"Temp_eventsList");
        gotoPage(getHHScriptVars("pagesIDHome"));
    }
}