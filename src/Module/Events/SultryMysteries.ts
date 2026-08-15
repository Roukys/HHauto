// SultryMysteries.ts -- Sultry Mysteries event: shop refresh and auto-buying.
//
// Sultry Mysteries is a time-limited event featuring a special event shop.
// This module monitors the event shop for refresh timers, detects available
// items, and automates purchasing when configured. Requires a minimum player
// level to participate.
//
// Depends on: EventModule.ts (event detection and routing)
// Used by: EventModule.ts (called when Sultry Mysteries event is active)
//
import { ConfigHelper } from "../../Helper/ConfigHelper";
import { getHHVars } from "../../Helper/HHHelper";
import { HeroHelper } from "../../Helper/HeroHelper";
import { convertTimeToInt, randomInterval } from "../../Helper/TimeHelper";
import { checkTimer, setTimer } from "../../Helper/TimerHelper";
import { logHHAuto } from "../../Utils/LogUtils";
import { HHEvent, HHEventData, HHEventList } from "../../model/HHEvent";
import { resolveSultryMysteriesSecondsLeft } from "./SultryMysteries.pure";

export class SultryMysteries {
    static isEnabled(){
        return HeroHelper.getLevel()>=ConfigHelper.getHHScriptVars("LEVEL_MIN_EVENT_SM");
    }

    static parse(hhEvent: HHEvent, eventList: HHEventList, hhEventData: HHEventData) {
        const eventID = hhEvent.eventId;
        let refreshTimer = randomInterval(3600, 4000);

        // Grid tab (shown by default on /event.html) doesn't render this
        // timer -- it only appears after switching to the shop tab -- so
        // sm_event_data.seconds_until_event_end (available on either tab)
        // is tried first; the DOM reading is a fallback for when that
        // global isn't there.
        let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
        const domSecondsLeft = timeLeft !== undefined && timeLeft.length ? Number(convertTimeToInt(timeLeft)) : null;
        const hhVarSecondsLeft = getHHVars('sm_event_data.seconds_until_event_end', false);
        const secondsLeft = resolveSultryMysteriesSecondsLeft(hhVarSecondsLeft, domSecondsLeft, 3600);

        setTimer('eventSultryMysteryGoing', secondsLeft);

        eventList[eventID] = {};
        eventList[eventID]["id"] = eventID;
        eventList[eventID]["type"] = hhEvent.eventType;
        eventList[eventID]["seconds_before_end"] = new Date().getTime() + secondsLeft * 1000;
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