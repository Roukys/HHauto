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
import { PlaceOfPower, Troll } from "../Module";
import { isJSON, logHHAuto } from "../Utils";
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
    if ( getStoredValue("HHAuto_Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        pSpendings = JSON.parse(getStoredValue("HHAuto_Temp_paranoiaSpendings"),reviverMap);
    }

    if ( getStoredValue("HHAuto_Temp_paranoiaQuestBlocked") !== undefined && pSpendings.has('quest'))
    {
        pSpendings.delete('quest');
    }

    if ( getStoredValue("HHAuto_Temp_paranoiaLeagueBlocked") !== undefined && pSpendings.has('challenge'))
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
    sessionStorage.removeItem('HHAuto_Temp_paranoiaSpendings');
    sessionStorage.removeItem('HHAuto_Temp_NextSwitch');
    sessionStorage.removeItem('HHAuto_Temp_paranoiaQuestBlocked');
    sessionStorage.removeItem('HHAuto_Temp_paranoiaLeagueBlocked');
}

export function updatedParanoiaSpendings(inSpendingFunction, inSpent)
{
    var currentPSpendings=new Map([]);
    // not set
    if ( getStoredValue("HHAuto_Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        currentPSpendings = JSON.parse(getStoredValue("HHAuto_Temp_paranoiaSpendings"),reviverMap);
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
        setStoredValue("HHAuto_Temp_paranoiaSpendings", JSON.stringify(currentPSpendings,replacerMap));

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
    if (getStoredValue("HHAuto_Temp_NextSwitch") !== undefined && getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "true")
    {
        toNextSwitch = Number((getStoredValue("HHAuto_Temp_NextSwitch")-new Date().getTime())/1000);

        //if autoLeague is on
        if(getHHScriptVars('isEnabledLeagues',false) && getStoredValue("HHAuto_Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20)
        {
            if ( getStoredValue("HHAuto_Temp_paranoiaLeagueBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.challenge.next_refresh_ts')))/Number(getHHVars('Hero.energies.challenge.seconds_per_point')));
                currentEnergy=Number(getHHVars('Hero.energies.challenge.amount'));
                maxEnergy=Number(getHHVars('Hero.energies.challenge.max_regen_amount'));
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
        if(getHHScriptVars('isEnabledQuest',false) && (getStoredValue("HHAuto_Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) && getStoredValue("HHAuto_Setting_autoSideQuest") === "true")))
        {
            if ( getStoredValue("HHAuto_Temp_paranoiaQuestBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.quest.next_refresh_ts')))/Number(getHHVars('Hero.energies.quest.seconds_per_point')));
                currentEnergy=Number(getHHVars('Hero.energies.quest.amount'));
                maxEnergy=Number(getHHVars('Hero.energies.quest.max_regen_amount'));
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
        if(getHHScriptVars('isEnabledTrollBattle',false) && getStoredValue("HHAuto_Setting_autoTrollBattle") === "true" && getHHVars('Hero.infos.questing.id_world')>0)
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.fight.next_refresh_ts')))/Number(getHHVars('Hero.energies.fight.seconds_per_point')));
            currentEnergy=Number(getHHVars('Hero.energies.fight.amount'));
            maxEnergy=Number(getHHVars('Hero.energies.fight.max_regen_amount'));
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
        if(getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeason") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.kiss.next_refresh_ts')))/Number(getHHVars('Hero.energies.kiss.seconds_per_point')));
            currentEnergy=Number(getHHVars('Hero.energies.kiss.amount'));
            maxEnergy=Number(getHHVars('Hero.energies.kiss.max_regen_amount'));
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
        if(getHHScriptVars('isEnabledPantheon',false) && getStoredValue("HHAuto_Setting_autoPantheon") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.worship.next_refresh_ts')))/Number(getHHVars('Hero.energies.worship.seconds_per_point')));
            currentEnergy=Number(getHHVars('Hero.energies.worship.amount'));
            maxEnergy=Number(getHHVars('Hero.energies.worship.max_regen_amount'));
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
        setStoredValue("HHAuto_Temp_paranoiaSpendings", JSON.stringify(paranoiaSpendings,replacerMap));
    }
}

export function flipParanoia()
{
    var burst=getBurst();

    var Setting=getStoredValue("HHAuto_Setting_paranoiaSettings");

    var S1=Setting.split('/').map(s=>s.split('|').map(s=>s.split(':')));

    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => {if (n<x[0]) {period=x[1]; return true;}});

    if (burst)
    {
        var periods=Object.assign(...S1[1].map(d => ({[d[0]]: d[1].split('-')})));

        toNextSwitch=getStoredValue("HHAuto_Temp_NextSwitch")?Number((getStoredValue("HHAuto_Temp_NextSwitch")-new Date().getTime())/1000):randomInterval(Number(periods[period][0]),Number(periods[period][1]));

        //match mythic new wave with end of sleep
        if (getStoredValue("HHAuto_Setting_autoTrollMythicByPassParanoia") === "true" && getTimer("eventMythicNextWave") !== -1 && toNextSwitch>getSecondsLeft("eventMythicNextWave"))
        {
            logHHAuto("Forced rest only until next mythic wave.");
            toNextSwitch=getSecondsLeft("eventMythicNextWave");
        }

        //bypass Paranoia if ongoing mythic
        if (getStoredValue("HHAuto_Setting_autoTrollMythicByPassParanoia") === "true" && getStoredValue("HHAuto_Temp_eventGirl") !==undefined && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true")
        {
            //             var trollThreshold = Number(getStoredValue("HHAuto_Setting_autoTrollThreshold"));
            //             if (getStoredValue("HHAuto_Setting_buyMythicCombat") === "true" || getStoredValue("HHAuto_Setting_autoTrollMythicByPassThreshold") === "true")
            //             {
            //                 trollThreshold = 0;
            //             }
            //mythic onGoing and still have some fight above threshold
            if (Number(getHHVars('Hero.energies.fight.amount')) > 0) //trollThreshold)
            {
                logHHAuto("Forced bypass Paranoia for mythic (can fight).");
                setTimer('paranoiaSwitch',60);
                return;
            }

            //mythic ongoing and can buyCombat
            // const Hero=getHero();
            // var price=Hero.get_recharge_cost("fight");
            if (Troll.canBuyFight().canBuy
                && getHHVars('Hero.energies.fight.amount')==0
               )
            {

                logHHAuto("Forced bypass Paranoia for mythic (can buy).");
                setTimer('paranoiaSwitch',60);
                return;
            }
        }

        if ( checkParanoiaSpendings() === -1 && getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "true" )
        {
            setStoredValue("HHAuto_Temp_NextSwitch", new Date().getTime() + toNextSwitch * 1000);
            setParanoiaSpendings();
            return;
        }

        if ( checkParanoiaSpendings() === 0 || getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "false" )
        {
            clearParanoiaSpendings();
            PlaceOfPower.cleanTempPopToStart();
            //going into hiding
            setStoredValue("HHAuto_Temp_burst", "false");
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
        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        setStoredValue("HHAuto_Temp_burst", "true");
        var b=S1[0][0][0].split('-');
        toNextSwitch=randomInterval(Number(b[0]),Number(b[1]));
    }
    var ND=new Date().getTime() + toNextSwitch * 1000;
    var message=period+(burst?" rest":" burst");
    logHHAuto("PARANOIA: "+message);
    setStoredValue("HHAuto_Temp_pinfo", message);

    setTimer('paranoiaSwitch',toNextSwitch);
    //force recheck non completed event after paranoia
    if (getStoredValue("HHAuto_Temp_burst") =="true")
    {
        let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
        for (let eventID of Object.keys(eventList))
        {
            //console.log(eventID);
            if (!eventList[eventID]["isCompleted"])
            {
                eventList[eventID]["next_refresh"]=new Date().getTime()-1000;
                //console.log("expire");
                if(Object.keys(eventList).length >0)
                {
                    setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
                }
            }
        }
        //sessionStorage.removeItem("HHAuto_Temp_eventsList");
        gotoPage(getHHScriptVars("pagesIDHome"));
    }
}