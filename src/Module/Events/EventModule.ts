import {
    TimeHelper,
    checkTimer,
    checkTimerMustExist,
    clearTimer,
    convertTimeToInt,
    ConfigHelper, 
    getLimitTimeBeforeEnd, 
    getPage, 
    getSecondsLeft, 
    getStoredValue,
    getTextForUI,
    getTimeLeft,
    getTimer,
    queryStringGetParam,
    randomInterval,
    setStoredValue,
    setTimer
} from "../../Helper/index";
import { gotoPage } from "../../Service/index";
import { isJSON, logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";
import {
    EventGirl,
    KKEventGirl
} from "../../model/index";
import { DoublePenetration } from "./DoublePenetration";
import { PathOfAttraction } from "./PathOfAttraction";
import { SultryMysteries } from "./SultryMysteries";

export class EventModule {
    static clearEventData(inEventID:string)
    {
        //clearTimer('eventMythicNextWave');
        //clearTimer('eventRefreshExpiration');
        //sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_EventFightsBeforeRefresh');
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList")):{};
        let eventsGirlz: EventGirl[] = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz")):[];
        let eventGirl = EventModule.getEventGirl();
        let eventMythicGirl = EventModule.getEventMythicGirl();
        let eventChamps:EventGirl[] = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls")):[];
        let hasMythic = false;
        let hasEvent = false;
        for (let prop of Object.keys(eventList))
        {
            if (
                eventList[prop]["seconds_before_end"]<new Date()
                ||
                (eventList[prop]["type"] === 'mythic' && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") !=="true")
                ||
                (eventList[prop]["type"] === 'event' && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") !=="true")
                ||
                (eventList[prop]["type"] === 'bossBang' && getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent") !=="true")
                ||
                (eventList[prop]["type"] === 'sultryMysteries' && getStoredValue(HHStoredVarPrefixKey+"Setting_sultryMysteriesEventRefreshShop") !=="true")
            )
            {
                delete eventList[prop];
            }
            else
            {
                if (! eventList[prop]["isCompleted"])
                {
                    if (eventList[prop]["isMythic"])
                    {
                        hasMythic = true;
                    }
                    else
                    {
                        hasEvent = true;
                    }
                }

            }
        }
        if (hasMythic === false)
        {
            clearTimer('eventMythicNextWave');
            clearTimer('eventMythicGoing');
        }
        if (hasEvent === false)
        {
            clearTimer('eventGoing');
        }
        if (Object.keys(eventList).length === 0)
        {
            sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_eventsGirlz');
            sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_eventGirl');
            sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_eventMythicGirl');
            sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_eventsList');
            sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_autoChampsEventGirls');
        }
        else
        {
            //console.log(JSON.stringify(eventChamps));
            eventChamps = eventChamps.filter(function (a) {
                if ( !eventList.hasOwnProperty(a.event_id) || a.event_id === inEventID)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            });

            if(Object.keys(eventChamps).length === 0)
            {
                sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_autoChampsEventGirls');
            }
            else
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
            }


            eventsGirlz = eventsGirlz.filter(function (a) {
                if ( !eventList.hasOwnProperty(a.event_id) || a.event_id === inEventID)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            });
            if(Object.keys(eventsGirlz).length === 0)
            {
                sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_eventsGirlz');
            }
            else
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz", JSON.stringify(eventsGirlz));
            }

            if (!eventList.hasOwnProperty(eventGirl.event_id) || eventGirl.event_id ===inEventID)
            {
                sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_eventGirl');
            }

            if (!eventList.hasOwnProperty(eventMythicGirl.event_id) || eventMythicGirl.event_id === inEventID)
            {
                sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_eventMythicGirl');
            }

            setStoredValue(HHStoredVarPrefixKey+"Temp_eventsList", JSON.stringify(eventList));
        }
    }

    static getDisplayedIdEventPage(logging=true):string {
        let eventHref = $("#contains_all #events .events-list .event-title.active").attr("href") || '';
        if (!eventHref && logging) {
            logHHAuto('Error href not found for current event');
        }
        if (eventHref) {
            let parsedURL = new URL(eventHref,window.location.origin);
            return queryStringGetParam(parsedURL.search,'tab') || '';
        }
        return '';
    }

    static showCompletedEvent(){
        try {
            if($('img.eventCompleted').length <= 0) {
                let oneEventCompleted = false;
                if($(`#contains_all #homepage .event-widget a:not([href="#"])`).length > 0) {
                    const img = $(`<div class="tooltipHH" style="display: inline-block;">`
                                    +`<span class="tooltipHHtext">${getTextForUI('eventCompleted',"tooltip")}</span>`
                                    +`<img src=${ConfigHelper.getHHScriptVars("powerCalcImages")['plus']} class="eventCompleted" title="${getTextForUI('eventCompleted',"tooltip")}" />`
                                +`</div>`);

                    const eventList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList")):{};
                    for (let eventID of Object.keys(eventList))
                    {
                        if (eventList[eventID]["isCompleted"])
                        {
                            const eventTimer = $(`#contains_all #homepage .event-widget a[href*="${eventID}"] .timer p`);
                            eventTimer.append(img);
                            oneEventCompleted = true;
                        }
                    }
                }
                if(!oneEventCompleted) {
                    const eventTimer = $(`#contains_all #homepage`);
                    eventTimer.append($(`<img src=${ConfigHelper.getHHScriptVars("powerCalcImages")['minus']} class="eventCompleted" style="display:none" />`));
                }
            }
        } catch (error) { /* ignore errors */}
    }

    static parseEventPage(inTab="global")
    {
        if(getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent") )
        {
            let queryEventTabCheck=$("#contains_all #events");
            const eventID:string = EventModule.getDisplayedIdEventPage();
            if (inTab !== "global" && inTab !== eventID)
            {
                if(eventID == '') {
                    logHHAuto("ERROR: No event Id found in current page, clear event data and go to home");
                    EventModule.clearEventData(inTab);
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                } else {
                    logHHAuto("Wrong event opened, need to change event page");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDEvent"),{tab:inTab});
                }
                return true;
            }

            const hhEvent = EventModule.getEvent(eventID);
            if (!hhEvent.eventTypeKnown)
            {
                if (queryEventTabCheck.attr('parsed') === undefined)
                {
                    logHHAuto("Not parsable event");
                    queryEventTabCheck[0].setAttribute('parsed', 'true');
                }
                return false;
            }
            if (queryEventTabCheck.attr('parsed') !== undefined)
            {
                if (!EventModule.checkEvent(eventID))
                {
                    //logHHAuto("Events already parsed.");
                    return false;
                }
            }
            queryEventTabCheck[0].setAttribute('parsed', 'true');
            logHHAuto("On event page : " + eventID);
            EventModule.clearEventData(eventID);
            //let eventsGirlz=[];
            let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList")):{};
            let eventsGirlz: EventGirl[] = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz")):[];
            let eventChamps: EventGirl[] = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls")):[];
            let Priority: string[] =(getStoredValue(HHStoredVarPrefixKey+"Setting_eventTrollOrder") || '').split(";");
            const hhEventData = unsafeWindow.event_data;
            if ((hhEvent.isPlusEvent || hhEvent.isPlusEventMythic) && !hhEventData) {
                logHHAuto("Error getting current event Data from HH.");
            }

            let refreshTimer = randomInterval(3600, 4000);
            if (hhEvent.isPlusEvent)
            {
                logHHAuto("On going event.");
                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length)
                {
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = true;
                let allEventGirlz = hhEventData ? hhEventData.girls : [];
                for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
                {
                    let girlData:KKEventGirl = allEventGirlz[currIndex];
                    if (girlData.shards < 100) {
                        eventList[eventID]["isCompleted"] = false;
                        const eventGirl = new EventGirl(girlData, eventID, eventList[eventID]["seconds_before_end"]);

                        if (eventGirl.isOnTroll()) {
                            logHHAuto(`Event girl : ${eventGirl.toString()} with priority : ${Priority.indexOf(''+eventGirl.troll_id)}`, eventGirl);
                            eventsGirlz.push(eventGirl);
                        }
                        if (eventGirl.isOnChampion()) {
                            logHHAuto(`Event girl : ${eventGirl.toString()}`, eventGirl);
                            eventChamps.push(eventGirl);
                        }
                    }
                }
                if(eventList[eventID]["isCompleted"]){
                    EventModule.collectEventChestIfPossible();
                }
            }
            if (hhEvent.isPlusEventMythic)
            {
                logHHAuto("On going mythic event.");
                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length)
                {
                    setTimer('eventMythicGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventMythicGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["isMythic"]=true;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = true;
                let allEventGirlz = hhEventData ? hhEventData.girls : [];
                for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
                {
                    let girlData:KKEventGirl = allEventGirlz[currIndex];
                    let ShardsQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.number';
                    let timerQuery= '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.timer'
                    if ($(ShardsQuery).length > 0 )
                    {
                        let remShards=Number($(ShardsQuery)[0].innerText);
                        let nextWave=($(timerQuery).length > 0)?convertTimeToInt($(timerQuery)[0].innerText):-1;
                        if (girlData.shards < 100)
                        {
                            eventList[eventID]["isCompleted"] = false;
                            if (nextWave === -1)
                            {
                                clearTimer('eventMythicNextWave');
                            }
                            else
                            {
                                setTimer('eventMythicNextWave',nextWave);
                            }
                            const eventGirl = new EventGirl(girlData, eventID, eventList[eventID]["seconds_before_end"], true);
                            if (remShards !== 0 )
                            {

                                if (eventGirl.isOnTroll()) {
                                    logHHAuto(`Event girl : ${eventGirl.toString()} with priority : ${Priority.indexOf(''+eventGirl.troll_id)}`, eventGirl);
                                    eventsGirlz.push(eventGirl);
                                }
                            }
                            else
                            {
                                if (nextWave === -1)
                                {
                                    eventList[eventID]["isCompleted"] = true;
                                    clearTimer('eventMythicNextWave');
                                }
                            }
                        } else {
                            // No more needed if girl is owned
                            clearTimer('eventMythicNextWave');
                        }
                    }
                }
            }
            if (hhEvent.isBossBangEvent)
            {
                logHHAuto("On going bossBang event.");
                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length)
                {
                    setTimer('eventBossBangGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventBossBangGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = $('#contains_all #events #boss_bang .completed-event').length > 0;
                let teamEventz = $('#contains_all #events #boss_bang .boss-bang-teams-container .boss-bang-team-slot');
                let teamFound = false;
                const firstTeamToStartWith = getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangMinTeam");
                if($('.boss-bang-team-ego', teamEventz[firstTeamToStartWith -1]).length > 0)
                {
                    // Do not trigger event if not all teams are set
                    for (let currIndex = teamEventz.length-1;currIndex>=0 && !teamFound;currIndex--)
                    {
                        // start with last team first
                        let teamz = $(teamEventz[currIndex]);
                        const teamIndex = teamz.data('slot-index');
                        const teamEgo = $('.boss-bang-team-ego', teamz);
                        if(teamEgo.length > 0 && parseInt(teamEgo.text()) > 0) {
                            if(!teamFound) {
                                if(!teamz.hasClass('.selected-hero-team')) teamz.click();
                                teamFound = true;
                                logHHAuto("Select team " + (teamIndex+1) + ", Ego: "+parseInt(teamEgo.text()));
                                setStoredValue(HHStoredVarPrefixKey+"Temp_bossBangTeam", teamIndex);
                                return true;
                            }
                        } else {
                            logHHAuto("Team " + teamIndex + " not eligible");
                        }
                    }
                }
                else if(eventList[eventID]["isCompleted"])
                {
                    logHHAuto("Boss bang completed, disabled boss bang event setting");
                    setStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent", false);
                }
                if(!teamFound) {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_bossBangTeam", -1);
                }
            }
            if (hhEvent.isSultryMysteriesEvent)
            {
                logHHAuto("On going sultry mysteries event.");

                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length) {
                    setTimer('eventSultryMysteryGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventSultryMysteryGoing', 3600);

                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = false;

                if (checkTimer("eventSultryMysteryShopRefresh")) {
                    logHHAuto("Refresh sultry mysteries shop content.");

                    const shopButton = $('#shop_tab');
                    const gridButton = $('#grid_tab');
                    shopButton.click();

                    setTimeout(function(){ // Wait tab switch and timer init
                        let shopTimeLeft=$('#contains_all #events #shop_tab_container .shop-section .shop-timer span[rel="expires"]').text();
                        setTimer('eventSultryMysteryShopRefresh', Number(convertTimeToInt(shopTimeLeft)) + randomInterval(60,180) );
                        eventList[eventID]["next_shop_refresh"]=new Date().getTime() + Number(shopTimeLeft) * 1000;

                        setTimeout(function(){gridButton.click();},randomInterval(800,1200));
                    },randomInterval(300,500));
                }
            }
            if (hhEvent.isDPEvent)
            {
                logHHAuto("On going double penetration event.");

                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                let dpRemainingTime = 3600;
                if (timeLeft !== undefined && timeLeft.length) {
                    dpRemainingTime = Number(convertTimeToInt(timeLeft));
                }
                setTimer('eventDPGoing', dpRemainingTime);

                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + dpRemainingTime * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = false;

                if(getStoredValue(HHStoredVarPrefixKey+"Setting_autodpEventCollect") === "true" || dpRemainingTime < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey+"Setting_autodpEventCollectAll") === "true") {
                    DoublePenetration.goAndCollect(dpRemainingTime);
                }
            }
            if (hhEvent.isPoa)
            {
                logHHAuto("On going path of Attraction event.");
                PathOfAttraction.getRemainingTime();
                const poAEnd = getSecondsLeft("PoARemainingTime");
                logHHAuto("PoA end in " + TimeHelper.debugDate(poAEnd));
                
                let refreshTimerPoa = ConfigHelper.getHHScriptVars('maxCollectionDelay');
                if (poAEnd < Math.max(refreshTimerPoa, getLimitTimeBeforeEnd()) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoACollectAll") === "true") {
                    refreshTimerPoa = Math.min(refreshTimerPoa, getLimitTimeBeforeEnd());
                }
                logHHAuto("PoA next refres in " + TimeHelper.debugDate(refreshTimerPoa));

                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"] = new Date().getTime() + poAEnd * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimerPoa * 1000;
                eventList[eventID]["isCompleted"] = PathOfAttraction.isCompleted();

                const manualCollectAll = getStoredValue(HHStoredVarPrefixKey + "Temp_poaManualCollectAll") === 'true';

                if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollect") === "true" || manualCollectAll || poAEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoACollectAll") === "true") {
                    PathOfAttraction.goAndCollect(manualCollectAll);
                }
            }
            if(Object.keys(eventList).length >0)
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_eventsList", JSON.stringify(eventList));
            }
            else
            {
                sessionStorage.removeItem(HHStoredVarPrefixKey+"Temp_eventsList");
            }
            eventsGirlz = eventsGirlz.filter(function (a) {
                var a_weighted = Number(Priority.indexOf(''+a.troll_id));
                if ( a.is_mythic )
                {
                    return true;
                }
                else
                {
                    return a_weighted !== -1;
                }
            });

            if (eventsGirlz.length>0 || eventChamps.length>0)
            {
                if (eventsGirlz.length>0)
                {
                    if (Priority[0]!=='')
                    {
                        eventsGirlz.sort(function (a, b) {

                            var a_weighted = Number(Priority.indexOf(''+a.troll_id));
                            if ( a.is_mythic )
                            {
                                a_weighted=a_weighted-Priority.length;
                            }
                            var b_weighted = Number(Priority.indexOf(''+b.troll_id));
                            if ( b.is_mythic )
                            {
                                b_weighted=b_weighted-Priority.length;
                            }
                            return a_weighted-b_weighted;

                        });
                        //logHHAuto({log:"Sorted EventGirls",eventGirlz:eventsGirlz});
                    }

                    setStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz", JSON.stringify(eventsGirlz));
                    EventModule.saveEventGirl(eventsGirlz[0]);
                }
                if (eventChamps.length>0)
                {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
                }
                queryEventTabCheck[0].setAttribute('parsed', 'true');
                //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", "20000");
                //setTimer('eventRefreshExpiration', 3600);
            }
            else
            {
                queryEventTabCheck[0].setAttribute('parsed', 'true');
                EventModule.clearEventData(eventID);
            }
            return false;
        }
        else
        {
            if (inTab !== "global")
            {
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDEvent"),{tab:inTab});
            }
            else
            {
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDEvent"));
            }
            return true;
        }
    }

    static saveEventGirl(eventGirlz: EventGirl){
        var chosenTroll = Number(eventGirlz.troll_id)
        logHHAuto("ET: " + chosenTroll);
        if (!eventGirlz.is_mythic) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl", JSON.stringify(eventGirlz));
        } else {
            // setStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl", JSON.stringify(eventGirlz)); // TODO remove when migration is done
            setStoredValue(HHStoredVarPrefixKey + "Temp_eventMythicGirl", JSON.stringify(eventGirlz));
        }
    }

    static getEventGirl(): EventGirl{
        return isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl")) : {}
    }

    static getEventMythicGirl(): EventGirl{
        return isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventMythicGirl")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventMythicGirl")) : {}
    }

    static getEventType(inEventID:string){
        if(inEventID.startsWith(ConfigHelper.getHHScriptVars('mythicEventIDReg'))) return "mythic";
        if(inEventID.startsWith(ConfigHelper.getHHScriptVars('eventIDReg'))) return "event";
        if(inEventID.startsWith(ConfigHelper.getHHScriptVars('bossBangEventIDReg'))) return "bossBang";
        if(inEventID.startsWith(ConfigHelper.getHHScriptVars('sultryMysteriesEventIDReg'))) return "sultryMysteries";
        if(inEventID.startsWith(ConfigHelper.getHHScriptVars('doublePenetrationEventIDReg'))) return "doublePenetration";
        if(inEventID.startsWith(ConfigHelper.getHHScriptVars('poaEventIDReg'))) return "poa";
    //    if(inEventID.startsWith('cumback_contest_')) return "";
    //    if(inEventID.startsWith('legendary_contest_')) return "";
    //    if(inEventID.startsWith('dpg_event_')) return ""; // Double date
        return "";
    }

    static getEvent(inEventID:string){
        const eventType = EventModule.getEventType(inEventID);
        const isPlusEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('eventIDReg')) && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") ==="true";
        const isPlusEventMythic = inEventID.startsWith(ConfigHelper.getHHScriptVars('mythicEventIDReg')) && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true";
        const isBossBangEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('bossBangEventIDReg')) && getStoredValue(HHStoredVarPrefixKey+"Setting_bossBangEvent") ==="true";
        const isSultryMysteriesEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('sultryMysteriesEventIDReg')) && getStoredValue(HHStoredVarPrefixKey+"Setting_sultryMysteriesEventRefreshShop") === "true" && SultryMysteries.isEnabled();
        const isDPEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('doublePenetrationEventIDReg'));
        const isPoa = inEventID.startsWith(ConfigHelper.getHHScriptVars('poaEventIDReg'));
        return {
            eventTypeKnown: eventType !== '',
            eventId: inEventID,
            eventType: eventType,
            isPlusEvent: isPlusEvent, // and activated
            isPlusEventMythic: isPlusEventMythic, // and activated
            isBossBangEvent: isBossBangEvent, // and activated
            isSultryMysteriesEvent: isSultryMysteriesEvent, // and activated
            isDPEvent: isDPEvent, // and activated
            isPoa: isPoa, // and activated
            isEnabled: isPlusEvent || isPlusEventMythic || isBossBangEvent || isSultryMysteriesEvent || isDPEvent || isPoa
        }
    }

    static isEventActive(inEventID:string)
    {
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
        if (eventList.hasOwnProperty(inEventID) && !eventList[inEventID]["isCompleted"]) {
            return eventList[inEventID]["seconds_before_end"]>new Date()
        }
        return false;
    }

    static checkEvent(inEventID:string)
    {
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList")):{};
        const hhEvent = EventModule.getEvent(inEventID);
        if(!hhEvent.eventTypeKnown || hhEvent.eventTypeKnown && !hhEvent.isEnabled)
        {
            return false;
        }
        if (!eventList.hasOwnProperty(inEventID))
        {
            return true;
        }
        else
        {
            if (eventList[inEventID]["isCompleted"])
            {
                return false;
            }
            else
            {
            return (
                    eventList[inEventID]["next_refresh"]<new Date()
                    ||
                    (hhEvent.isPlusEventMythic && checkTimerMustExist('eventMythicNextWave'))
                    ||
                    (hhEvent.isSultryMysteriesEvent && checkTimerMustExist('eventSultryMysteryShopRefresh'))
                    ||
                    (hhEvent.isDPEvent && checkTimerMustExist('nextDpEventCollectTime'))
                    );
            }
        }
    }

    static displayPrioInDailyMissionGirl(baseQuery:string){
        let allEventGirlz = unsafeWindow.event_data ? unsafeWindow.event_data.girls : [];
        if(!allEventGirlz) return;
        for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
        {
            let girlData:KKEventGirl = allEventGirlz[currIndex];
            if (girlData.shards < 100 && girlData.source && girlData.source.name === 'event_dm') {

                let query=baseQuery+"[data-select-girl-id="+girlData.id_girl+"]";
                if ($(query).length >0 )
                {
                    let currentGirl=$(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority" title="'+getTextForUI('dailyMissionGirlTitle','elementText')+'">DM</div>');
                    $(query).css('position','relative');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                }
            }
        }
    }

    static hideOwnedGilrs() 
    {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_hideOwnedGirls") === "true") {
            if ($('.nc-event-list-reward.already-owned').length > 10 && $('.nc-event-list-reward.girl_ico').length > 30) {
                $('.nc-event-list-reward.already-owned').parent().hide();
            }
        }
    }

    static moduleDisplayEventPriority()
    {
        if ($('.HHEventPriority').length  > 0) {return}
        const baseQuery:string = "#events .scroll-area .nc-event-list-reward-container .nc-event-list-reward";
        EventModule.displayPrioInDailyMissionGirl(baseQuery);

        let eventGirlz:EventGirl[]=isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsGirlz")):[];
        let eventChamps:EventGirl[] = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_autoChampsEventGirls")):[];
        //$("div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward div.HHEventPriority").each(function(){this.remove();});
        if ( eventGirlz.length >0 || eventChamps.length >0)
        {
            var girl;
            var prio;
            var idArray;
            var currentGirl;
            for ( var ec=eventChamps.length;ec>0;ec--)
            {
                idArray = Number(ec)-1;
                girl = Number(eventChamps[idArray].girl_id);
                let query=baseQuery+"[data-select-girl-id="+girl+"]";
                if ($(query).length >0 )
                {
                    currentGirl=$(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority">C'+eventChamps[idArray].champ_id+'</div>');
                    $(query).css('position','relative');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                }
            }
            for ( var e=eventGirlz.length;e>0;e--)
            {
                idArray = Number(e)-1;
                girl = Number(eventGirlz[idArray].girl_id);
                let query=baseQuery+"[data-select-girl-id="+girl+"]";
                if ($(query).length >0 )
                {
                    currentGirl=$(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority">'+e+'</div>');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                    $(query).css('position','relative');
                    $(query).trigger('click');
                }
            }
        }
    }

    
    static displayGenericRemainingTime(scriptId, aRel, hhtimerId, timerName, timerEndDateName)
    {
        const displayTimer = $(scriptId).length === 0;
        if(getTimer(timerName) !== -1)
        {
            const domSelector = '#homepage a[rel="'+aRel+'"] .notif-position > span';
            if ($("#"+hhtimerId).length === 0)
            {
                if (displayTimer)
                {
                    $(domSelector).prepend('<span id="'+hhtimerId+'"></span>')
                    GM_addStyle('#'+hhtimerId+'{position: absolute;top: 26px;left: 30px;width: 100px;font-size: .6rem ;z-index: 1;}');
                }
            }
            else
            {
                if (!displayTimer)
                {
                    $("#"+hhtimerId)[0].remove();
                }
            }
            if (displayTimer)
            {
                $("#"+hhtimerId)[0].innerText = getTimeLeft(timerName);
            }
        }
        else
        {
            if (getStoredValue(timerEndDateName) !== undefined)
            {
                setTimer(timerName,getStoredValue(timerEndDateName)-(Math.ceil(new Date().getTime())/1000));
            }
        }
    }
    static moduleSimPoVPogMaskReward(containerId)
    {
        var arrayz;
        var nbReward;
        let modified = false;
        arrayz = $('.potions-paths-tier:not([style*="display:none"]):not([style*="display: none"])');
        //doesn sure about  " .purchase-pov-pass"-button visibility
        if ($('#'+containerId+' .potions-paths-second-row .purchase-pass:not([style*="display:none"]):not([style*="display: none"])').length)
        {
            nbReward = 1;
        }
        else
        {
            nbReward = 2;
        }
        var obj;
        if (arrayz.length > 0)
        {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--)
            {
                obj = $(arrayz[i2]).find('.claimed-slot:not([style*="display:none"]):not([style*="display: none"])');
                if (obj.length >= nbReward)
                {
                    //console.log("width : "+arrayz[i2].offsetWidth);
                    //document.getElementById('rewards_cont_scroll').scrollLeft-=arrayz[i2].offsetWidth;
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }

        if (modified)
        {
            let divToModify = $('.potions-paths-progress-bar-section');
            if (divToModify.length > 0)
            {
                $('.potions-paths-progress-bar-section')[0].scrollTop = 0;
            }
        }
    }
    static collectEventChestIfPossible()
    {
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_collectEventChest") === "true") {
            const eventChestId = "#extra-rewards-claim-btn:not([disabled])";
            if ($(eventChestId).length > 0) {
                logHHAuto("Collect event chest");
                $(eventChestId).click();
            }
        }
    }

    static parsePageForEventId()
    {
        const eventQuery = '#contains_all #homepage .event-widget a[rel="event"]:not([href="#"])';
        const mythicEventQuery = '#contains_all #homepage .event-widget a[rel="mythic_event"]:not([href="#"])';
        const bossBangEventQuery = '#contains_all #homepage .event-widget a[rel="boss_bang_event"]:not([href="#"])';
        const sultryMysteriesEventQuery = '#contains_all #homepage .event-widget a[rel="sm_event"]:not([href="#"])';
        const dpEventQuery = '#contains_all #homepage .event-widget a[rel="dp_event"]:not([href="#"])';
        const seasonalEventQuery = '#contains_all #homepage .seasonal-event a, #contains_all #homepage .mega-event a';
        const povEventQuery = '#contains_all #homepage .event-container a[rel="path-of-valor"]';
        const pogEventQuery = '#contains_all #homepage .event-container a[rel="path-of-glory"]';
        const poaEventQuery = '#contains_all #homepage .event-widget a[rel="path_event"]:not([href="#"])';
        let eventIDs:string[] =[];
        let ongoingEventIDs:string[] =[];
        let bossBangEventIDs:string[]=[];
        const currentPage = getPage();

        function parseForEventId(query:string, eventList:string[]){
            let parsedURL:URL;
            let eventId:string;
            let queryResults=$(query);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href")||'',window.location.origin);
                eventId = queryStringGetParam(parsedURL.search,'tab') || '';
                if (eventId !== '' && EventModule.checkEvent(eventId))
                {
                    eventList.push(eventId);
                }
                if (eventId !== '') { ongoingEventIDs.push(eventId); }
            }
        }

        if (currentPage === ConfigHelper.getHHScriptVars("pagesIDEvent"))
        {
            const currentPageEventId: string = EventModule.getDisplayedIdEventPage();
            if (currentPageEventId !== null && EventModule.checkEvent(currentPageEventId))
            {
                eventIDs.push(currentPageEventId);
            }

            let parsedURL:URL;
            let eventId:string;
            let eventsQuery = '.events-list a.event-title:not(.active)';
            let queryResults=$(eventsQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href")||'',window.location.origin);
                eventId = queryStringGetParam(parsedURL.search,'tab') || '';
                if (eventId !== '' && EventModule.checkEvent(eventId))
                {
                    eventIDs.push(eventId);
                }
            }
        }
        else if (currentPage === ConfigHelper.getHHScriptVars("pagesIDHome"))
        {
            let queryResults:any;
            parseForEventId(eventQuery,eventIDs);
            parseForEventId(mythicEventQuery,eventIDs);
            parseForEventId(poaEventQuery,eventIDs);
            parseForEventId(bossBangEventQuery,bossBangEventIDs);
            parseForEventId(sultryMysteriesEventQuery,eventIDs);
            if ($(sultryMysteriesEventQuery).length <= 0 && getTimer("eventSultryMysteryShopRefresh") !== -1)
            {
                // event is over
                clearTimer("eventSultryMysteryShopRefresh");
            }
            parseForEventId(dpEventQuery,eventIDs);

            if(getStoredValue(HHStoredVarPrefixKey+"Setting_autodpEventCollect") === "true" && $(dpEventQuery).length == 0)
            {
                logHHAuto("No double penetration event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey+"Setting_autodpEventCollect", "false");
            }
            queryResults=$(seasonalEventQuery);
            if((getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollect") === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollectAll") === "true") && queryResults.length == 0)
            {
                logHHAuto("No seasonal event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollect", "false");
                setStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollectAll", "false");
            }
            queryResults=$(povEventQuery);
            if((getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollect") === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollectAll") === "true") && queryResults.length == 0)
            {
                logHHAuto("No pov event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollect", "false");
                setStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollectAll", "false");
            }
            queryResults=$(pogEventQuery);
            if((getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollect") === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollectAll") === "true") && queryResults.length == 0)
            {
                logHHAuto("No pog event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollect", "false");
                setStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollectAll", "false");
            }
        }
/*
        if (currentPage === ConfigHelper.getHHScriptVars("pagesIDEvent") || currentPage === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            const eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
            for (const eventIDStored of Object.keys(eventList)) {
                //console.log(eventID);
                if (!ongoingEventIDs.includes(eventIDStored)) {
                    logHHAuto(`Event ${eventIDStored} seems not available anymore, removing from store`);
                    EventModule.clearEventData(eventIDStored);
                }
            }
        }
*/
        return {eventIDs:eventIDs,bossBangEventIDs:bossBangEventIDs};
    }
}
