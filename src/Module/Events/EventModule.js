import {
    checkTimer,
    checkTimerMustExist,
    clearTimer,
    convertTimeToInt,
    getHHScriptVars, 
    getPage, 
    getStoredValue,
    getTextForUI,
    getTimeLeft,
    getTimer,
    queryStringGetParam,
    randomInterval,
    setStoredValue,
    setTimer
} from "../../Helper";
import { gotoPage } from "../../Service";
import { isJSON, logHHAuto } from "../../Utils";

export class EventModule {
    static clearEventData(inEventID)
    {
        //sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
        //sessionStorage.removeItem('HHAuto_Temp_eventGirl');
        //clearTimer('eventMythicNextWave');
        //clearTimer('eventRefreshExpiration');
        //sessionStorage.removeItem('HHAuto_Temp_EventFightsBeforeRefresh');
        let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
        let eventsGirlz = isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):[];
        let eventGirl =isJSON(getStoredValue("HHAuto_Temp_eventGirl"))?JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")):{};
        let eventChamps = isJSON(getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
        let hasMythic = false;
        let hasEvent = false;
        for (let prop of Object.keys(eventList))
        {
            if (
                eventList[prop]["seconds_before_end"]<new Date()
                ||
                (eventList[prop]["type"] === 'mythic' && getStoredValue("HHAuto_Setting_plusEventMythic") !=="true")
                ||
                (eventList[prop]["type"] === 'event' && getStoredValue("HHAuto_Setting_plusEvent") !=="true")
                ||
                (eventList[prop]["type"] === 'bossBang' && getStoredValue("HHAuto_Setting_bossBangEvent") !=="true")
                ||
                (eventList[prop]["type"] === 'sultryMysteries' && getStoredValue("HHAuto_Setting_sultryMysteriesEventRefreshShop") !=="true")
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
            sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
            sessionStorage.removeItem('HHAuto_Temp_eventGirl');
            sessionStorage.removeItem('HHAuto_Temp_eventsList');
            sessionStorage.removeItem('HHAuto_Temp_autoChampsEventGirls');
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
                sessionStorage.removeItem('HHAuto_Temp_autoChampsEventGirls');
            }
            else
            {
                setStoredValue("HHAuto_Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
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
                sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
            }
            else
            {
                setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
            }

            if (!eventList.hasOwnProperty(eventGirl.event_id) || eventGirl.event_id ===inEventID)
            {
                sessionStorage.removeItem('HHAuto_Temp_eventGirl');
            }

            setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
        }
    }


    static parseEventPage(inTab="global")
    {
        if(getPage() === getHHScriptVars("pagesIDEvent") )
        {
            let queryEventTabCheck=$("#contains_all #events");
            let eventHref = $("#contains_all #events .events-list .event-title.active").attr("href");
            let parsedURL = new URL(eventHref,window.location.origin);
            let eventID = queryStringGetParam(parsedURL.search,'tab');
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
            let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
            let eventsGirlz = isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):[];
            let eventChamps = isJSON(getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
            let Priority=(getStoredValue("HHAuto_Setting_eventTrollOrder")).split(";");
            const hhEventData = unsafeWindow.event_data;
            if ((hhEvent.isPlusEvent || hhEvent.isPlusEventMythic) && !hhEventData) {
                logHHAuto("Error getting current event Data from HH.");
            }

            let refreshTimer = 3600;
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
                    let girlData = allEventGirlz[currIndex];
                    if (girlData.shards < 100) {
                        eventList[eventID]["isCompleted"] = false;
                        let girlId = girlData.id_girl;
                        let girlName = girlData.name;
                        let girlShards = girlData.shards;
                        let TrollID;
                        let ChampID;

                        if (girlData.source) {
                            if (girlData.source.name === 'event_troll') {
                                try {
                                    let parsedURL = new URL(girlData.source.anchor_source.url,window.location.origin);
                                    TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                                    if (girlData.source.anchor_source.disabled) {
                                        logHHAuto("Troll " + TrollID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                        TrollID = undefined;
                                    }
                                } catch (error) {
                                    try {
                                        let parsedURL = new URL(girlData.source.anchor_win_from[0].url ,window.location.origin);
                                        TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                                        if (girlData.source.anchor_win_from.disabled) {
                                            logHHAuto("Troll " + TrollID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                            TrollID = undefined;
                                        }
                                    } catch (error) {
                                        logHHAuto("Can't get troll from girls " +  girlName + " (" + girlId + ")");
                                    }
                                }
                            } else if (girlData.source.name === 'event_champion_girl') {
                                try {
                                    ChampID = girlData.source.anchor_source.url.split('/champions/')[1];
                                    if (girlData.source.anchor_source.disabled) {
                                        logHHAuto("Champion " + ChampID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                        ChampID = undefined;
                                    }
                                } catch (error) {
                                    try {
                                        ChampID = girlData.source.anchor_win_from[0].url.split('/champions/')[1];
                                        if (girlData.source.anchor_win_from.disabled) {
                                            logHHAuto("Champion " + ChampID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                            ChampID = undefined;
                                        }
                                    } catch (error) {
                                        logHHAuto("Can't get champion from girls " +  girlName + " (" + girlId + ")");
                                    }
                                }
                            }
                        }
                        if (TrollID) {
                            logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                            eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"false",girl_name:girlName,event_id:eventID});
                        }
                        if (ChampID) {
                            logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at champ "+ChampID+" on event : ",eventID);
                            eventChamps.push({girl_id:girlId,champ_id:ChampID,girl_shards:girlShards,girl_name:girlName,event_id:eventID});
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
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["isMythic"]=true;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = true;
                setTimer('eventMythicGoing',Number(convertTimeToInt(timeLeft)));
                let allEventGirlz = hhEventData ? hhEventData.girls : [];
                for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
                {
                    let girlData = allEventGirlz[currIndex];
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
                            if (remShards !== 0 )
                            {
                                let girlId = girlData.id_girl;
                                let girlName = girlData.name;
                                let girlShards = girlData.shards;
                                let parsedURL = new URL(girlData.source.anchor_source.url,window.location.origin);
                                let TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                                if (girlData.source.anchor_source.disabled) {
                                    logHHAuto("Troll " + TrollID + " is not available for mythic girl " +  girlName + " (" + girlId + ") ignoring");
                                } else {
                                    logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                                    eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"true",girl_name:girlName,event_id:eventID});
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
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = $('#contains_all #events #boss_bang .completed-event').length > 0;
                setTimer('eventBossBangGoing',Number(convertTimeToInt(timeLeft)));
                let teamEventz = $('#contains_all #events #boss_bang .boss-bang-teams-container .boss-bang-team-slot');
                let teamFound = false;
                const firstTeamToStartWith = getStoredValue("HHAuto_Setting_bossBangMinTeam");
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
                                logHHAuto("Select team " + teamIndex + ", Ego: "+parseInt(teamEgo.text()));
                                setStoredValue("HHAuto_Temp_bossBangTeam", teamIndex);
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
                    setStoredValue("HHAuto_Setting_bossBangEvent", false);
                }
                if(!teamFound) {
                    setStoredValue("HHAuto_Temp_bossBangTeam", -1);
                }
            }
            if (hhEvent.isSultryMysteriesEvent)
            {
                logHHAuto("On going sultry mysteries event.");

                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length) {
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', 3600);

                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = false;
                setTimer('eventSultryMysteryGoing', Number(convertTimeToInt(timeLeft)));

                if (checkTimer("eventSultryMysteryShopRefresh")) {
                    logHHAuto("Refresh sultry mysteries shop content.");

                    const shopButton = $('#shop_tab');
                    const gridButton = $('#grid_tab');
                    shopButton.click();

                    setTimeout(function(){ // Wait tab switch and timer init
                        let shopTimeLeft=$('#contains_all #events #shop_tab_container .shop-section .shop-timer span[rel="expires"]').text();
                        setTimer('eventSultryMysteryShopRefresh', Number(convertTimeToInt(shopTimeLeft)));
                        eventList[eventID]["next_shop_refresh"]=new Date().getTime() + Number(shopTimeLeft) * 1000;

                        setTimeout(function(){gridButton.click();},randomInterval(800,1200));
                    },randomInterval(300,500));
                }
            }
            if(Object.keys(eventList).length >0)
            {
                setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
            }
            else
            {
                sessionStorage.removeItem("HHAuto_Temp_eventsList");
            }
            eventsGirlz = eventsGirlz.filter(function (a) {
                var a_weighted = Number(Priority.indexOf(a.troll_id));
                if ( a.is_mythic === "true" )
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

                            var a_weighted = Number(Priority.indexOf(a.troll_id));
                            if ( a.is_mythic === "true" )
                            {
                                a_weighted=a_weighted-Priority.length;
                            }
                            var b_weighted = Number(Priority.indexOf(b.troll_id));
                            if ( b.is_mythic === "true" )
                            {
                                b_weighted=b_weighted-Priority.length;
                            }
                            return a_weighted-b_weighted;

                        });
                        //logHHAuto({log:"Sorted EventGirls",eventGirlz:eventsGirlz});
                    }

                    setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
                    var chosenTroll = Number(eventsGirlz[0].troll_id)
                    logHHAuto("ET: "+chosenTroll);
                    setStoredValue("HHAuto_Temp_eventGirl", JSON.stringify(eventsGirlz[0]));
                }
                if (eventChamps.length>0)
                {
                    setStoredValue("HHAuto_Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
                }
                queryEventTabCheck[0].setAttribute('parsed', 'true');
                //setStoredValue("HHAuto_Temp_EventFightsBeforeRefresh", "20000");
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
                gotoPage(getHHScriptVars("pagesIDEvent"),{tab:inTab});
            }
            else
            {
                gotoPage(getHHScriptVars("pagesIDEvent"));
            }
            return true;
        }
    }

    static getEventType(inEventID){
        if(inEventID.startsWith(getHHScriptVars('mythicEventIDReg'))) return "mythic";
        if(inEventID.startsWith(getHHScriptVars('eventIDReg'))) return "event";
        if(inEventID.startsWith(getHHScriptVars('bossBangEventIDReg'))) return "bossBang";
        if(inEventID.startsWith(getHHScriptVars('sultryMysteriesEventIDReg'))) return "sultryMysteries";
    //    if(inEventID.startsWith(getHHScriptVars('poaEventIDReg'))) return "poa";
    //    if(inEventID.startsWith('cumback_contest_')) return "";
    //    if(inEventID.startsWith('legendary_contest_')) return "";
        return "";
    }

    static getEvent(inEventID){
        const eventType = EventModule.getEventType(inEventID);
        const isPlusEvent = inEventID.startsWith(getHHScriptVars('eventIDReg')) && getStoredValue("HHAuto_Setting_plusEvent") ==="true";
        const isPlusEventMythic = inEventID.startsWith(getHHScriptVars('mythicEventIDReg')) && getStoredValue("HHAuto_Setting_plusEventMythic") ==="true";
        const isBossBangEvent = inEventID.startsWith(getHHScriptVars('bossBangEventIDReg')) && getStoredValue("HHAuto_Setting_bossBangEvent") ==="true";
        const isSultryMysteriesEvent = inEventID.startsWith(getHHScriptVars('sultryMysteriesEventIDReg')) && getStoredValue("HHAuto_Setting_sultryMysteriesEventRefreshShop") === "true";
        return {
            eventTypeKnown: eventType !== '',
            eventId: inEventID,
            eventType: eventType,
            isPlusEvent: isPlusEvent, // and activated
            isPlusEventMythic: isPlusEventMythic, // and activated
            isBossBangEvent: isBossBangEvent, // and activated
            isSultryMysteriesEvent: isSultryMysteriesEvent, // and activated
            isEnabled: isPlusEvent || isPlusEventMythic || isBossBangEvent || isSultryMysteriesEvent
        }
    }

    static isEventActive(inEventID)
    {
        let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
        if (eventList.hasOwnProperty(inEventID) && eventList[inEventID]["isCompleted"]) {
            return eventList[inEventID]["seconds_before_end"]>new Date()
        }
        return false;
    }

    static checkEvent(inEventID)
    {
        let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
        const hhEvent = EventModule.getEvent(inEventID);
        if(hhEvent.eventTypeKnown && !hhEvent.isEnabled)
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
                    );
            }
        }
    }

    static displayPrioInDailyMissionGirl(baseQuery){
        let allEventGirlz = unsafeWindow.event_data ? unsafeWindow.event_data.girls : [];
        if(!allEventGirlz) return;
        for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
        {
            let girlData = allEventGirlz[currIndex];
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

    static moduleDisplayEventPriority()
    {
        if ($('.HHEventPriority').length  > 0) {return}
        const baseQuery="#events .scroll-area .nc-event-list-reward-container .nc-event-list-reward";
        EventModule.displayPrioInDailyMissionGirl(baseQuery);

        let eventGirlz=isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):{};
        let eventChamps = isJSON(getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
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
                    $(query).click();
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
                $('.potions-paths-progress-bar-section')[0].scrollTop = '0';
            }
        }
    }
    static collectEventChestIfPossible()
    {
        if (getStoredValue("HHAuto_Setting_collectEventChest") === "true") {
            const eventChestId = "#extra-rewards-claim-btn:not([disabled])";
            if ($(eventChestId).length > 0) {
                logHHAuto("Collect event chest");
                $(eventChestId).click();
            }
        }
    }

    static parsePageForEventId()
    {
        let eventQuery = '#contains_all #homepage .event-widget a[rel="event"]:not([href="#"])';
        let mythicEventQuery = '#contains_all #homepage .event-widget a[rel="mythic_event"]:not([href="#"])';
        let bossBangEventQuery = '#contains_all #homepage .event-widget a[rel="boss_bang_event"]:not([href="#"])';
        let sultryMysteriesEventQuery = '#contains_all #homepage .event-widget a[rel="sm_event"]:not([href="#"])';
        let seasonalEventQuery = '#contains_all #homepage .seasonal-event a'; // Mega event have same query
        let povEventQuery = '#contains_all #homepage .season-pov-container a[rel="path-of-valor"]';
        let pogEventQuery = '#contains_all #homepage .season-pov-container a[rel="path-of-glory"]';
        let eventIDs=[];
        let bossBangEventIDs=[];

        if (getPage()===getHHScriptVars("pagesIDEvent"))
        {
            if (queryStringGetParam(window.location.search,'tab') !== null)
            {
                eventIDs.push(queryStringGetParam(window.location.search,'tab'));
            }
        }
        else if (getPage() === getHHScriptVars("pagesIDHome"))
        {
            let parsedURL;
            let queryResults=$(eventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(mythicEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(bossBangEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    bossBangEventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(sultryMysteriesEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            if (queryResults.length <= 0 && getTimer("eventSultryMysteryShopRefresh") !== -1)
            {
                // event is over
                clearTimer("eventSultryMysteryShopRefresh");
            }
            queryResults=$(seasonalEventQuery);
            if((getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true" || getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true") && queryResults.length == 0)
            {
                logHHAuto("No seasonal event found, deactivate collect.");
                setStoredValue("HHAuto_Setting_autoSeasonalEventCollect", "false");
                setStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll", "false");
            }
            queryResults=$(povEventQuery);
            if((getStoredValue("HHAuto_Setting_autoPoVCollect") === "true" || getStoredValue("HHAuto_Setting_autoPoVCollectAll") === "true") && queryResults.length == 0)
            {
                logHHAuto("No pov event found, deactivate collect.");
                setStoredValue("HHAuto_Setting_autoPoVCollect", "false");
                setStoredValue("HHAuto_Setting_autoPoVCollectAll", "false");
            }
            queryResults=$(pogEventQuery);
            if((getStoredValue("HHAuto_Setting_autoPoGCollect") === "true" || getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true") && queryResults.length == 0)
            {
                logHHAuto("No pog event found, deactivate collect.");
                setStoredValue("HHAuto_Setting_autoPoGCollect", "false");
                setStoredValue("HHAuto_Setting_autoPoGCollectAll", "false");
            }
        }
        
        return {eventIDs:eventIDs,bossBangEventIDs:bossBangEventIDs};
    }
}