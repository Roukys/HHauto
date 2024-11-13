import { clearTimer, convertTimeToInt, getStoredValue, randomInterval, setTimer } from "../../Helper/index";
import { logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";
import { EventGirl, KKEventGirl } from "../../model/index";

export class MythicEvent {
    static parse(hhEvent: any, eventList: any, hhEventData: any, eventsGirlz: EventGirl[], eventChamps: EventGirl[]) {
        const eventID = hhEvent.eventId;
        let Priority: string[] = (getStoredValue(HHStoredVarPrefixKey + "Setting_eventTrollOrder") || '').split(";");
        let refreshTimer = randomInterval(3600, 4000);

        let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
        if (timeLeft !== undefined && timeLeft.length) {
            setTimer('eventMythicGoing', Number(convertTimeToInt(timeLeft)));
        } else setTimer('eventMythicGoing', refreshTimer);
        eventList[eventID] = {};
        eventList[eventID]["id"] = eventID;
        eventList[eventID]["type"] = hhEvent.eventType;
        eventList[eventID]["isMythic"] = true;
        eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
        eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
        eventList[eventID]["isCompleted"] = true;
        let allEventGirlz = hhEventData ? hhEventData.girls : [];
        for (let currIndex = 0; currIndex < allEventGirlz.length; currIndex++) {
            let girlData: KKEventGirl = allEventGirlz[currIndex];
            let ShardsQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.number';
            let timerQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.timer'
            if ($(ShardsQuery).length > 0) {
                let remShards = Number($(ShardsQuery)[0].innerText);
                let nextWave = ($(timerQuery).length > 0) ? convertTimeToInt($(timerQuery)[0].innerText) : -1;
                if (girlData.shards < 100) {
                    eventList[eventID]["isCompleted"] = false;
                    if (nextWave === -1) {
                        clearTimer('eventMythicNextWave');
                    }
                    else {
                        setTimer('eventMythicNextWave', nextWave);
                    }
                    const eventGirl = new EventGirl(girlData, eventID, eventList[eventID]["seconds_before_end"], true);
                    if (remShards !== 0) {

                        if (eventGirl.isOnTroll()) {
                            logHHAuto(`Event girl : ${eventGirl.toString()} with priority : ${Priority.indexOf('' + eventGirl.troll_id)}`, eventGirl);
                            eventsGirlz.push(eventGirl);
                        }
                    }
                    else {
                        if (nextWave === -1) {
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
}