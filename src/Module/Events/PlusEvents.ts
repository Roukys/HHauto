import { convertTimeToInt, getStoredValue, randomInterval, setTimer } from "../../Helper/index";
import { logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";
import { EventGirl, KKEventGirl } from "../../model/index";
import { EventModule } from "./EventModule";

export class PlusEvent {
    static parse(hhEvent: any, eventList: any, hhEventData: any, eventsGirlz: EventGirl[], eventChamps: EventGirl[]) {
        const eventID = hhEvent.eventId;
        let Priority: string[] = (getStoredValue(HHStoredVarPrefixKey + "Setting_eventTrollOrder") || '').split(";");
        let refreshTimer = randomInterval(3600, 4000);

        let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
        if (timeLeft !== undefined && timeLeft.length) {
            setTimer('eventGoing', Number(convertTimeToInt(timeLeft)));
        } else setTimer('eventGoing', refreshTimer);
        eventList[eventID] = {};
        eventList[eventID]["id"] = eventID;
        eventList[eventID]["type"] = hhEvent.eventType;
        eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
        eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
        eventList[eventID]["isCompleted"] = true;
        let allEventGirlz = hhEventData ? hhEventData.girls : [];
        for (let currIndex = 0; currIndex < allEventGirlz.length; currIndex++) {
            let girlData: KKEventGirl = allEventGirlz[currIndex];
            if (girlData.shards < 100) {
                eventList[eventID]["isCompleted"] = false;
                const eventGirl = new EventGirl(girlData, eventID, eventList[eventID]["seconds_before_end"]);

                if (eventGirl.isOnTroll()) {
                    logHHAuto(`Event girl : ${eventGirl.toString()} with priority : ${Priority.indexOf('' + eventGirl.troll_id)}`, eventGirl);
                    eventsGirlz.push(eventGirl);
                }
                if (eventGirl.isOnChampion()) {
                    logHHAuto(`Event girl : ${eventGirl.toString()}`, eventGirl);
                    eventChamps.push(eventGirl);
                }
            }
        }
        if (eventList[eventID]["isCompleted"]) {
            EventModule.collectEventChestIfPossible();
        }
    }
}