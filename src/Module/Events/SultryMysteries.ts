import { checkTimer, ConfigHelper, convertTimeToInt, HeroHelper, randomInterval, setTimer } from "../../Helper/index";
import { logHHAuto } from "../../Utils/LogUtils";

export class SultryMysteries {
    static isEnabled(){
        return HeroHelper.getLevel()>=ConfigHelper.getHHScriptVars("LEVEL_MIN_EVENT_SM");
    }

    static parse(hhEvent: any, eventList: any, hhEventData: any) {
        const eventID = hhEvent.eventId;
        let refreshTimer = randomInterval(3600, 4000);

        let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
        if (timeLeft !== undefined && timeLeft.length) {
            setTimer('eventSultryMysteryGoing', Number(convertTimeToInt(timeLeft)));
        } else setTimer('eventSultryMysteryGoing', 3600);

        eventList[eventID] = {};
        eventList[eventID]["id"] = eventID;
        eventList[eventID]["type"] = hhEvent.eventType;
        eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
        eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
        eventList[eventID]["isCompleted"] = false;

        if (checkTimer("eventSultryMysteryShopRefresh")) {
            logHHAuto("Refresh sultry mysteries shop content.");

            const shopButton = $('#shop_tab');
            const gridButton = $('#grid_tab');
            shopButton.trigger('click');

            setTimeout(function () { // Wait tab switch and timer init
                let shopTimeLeft = $('#contains_all #events #shop_tab_container .shop-section .shop-timer span[rel="expires"]').text();
                setTimer('eventSultryMysteryShopRefresh', Number(convertTimeToInt(shopTimeLeft)) + randomInterval(60, 180));
                eventList[eventID]["next_shop_refresh"] = new Date().getTime() + Number(shopTimeLeft) * 1000;

                setTimeout(function () { gridButton.trigger('click'); }, randomInterval(800, 1200));
            }, randomInterval(300, 500));
        }
    }
}