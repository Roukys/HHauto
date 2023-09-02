import { getStoredValue } from "../Helper";

export let mouseBusy = false;
export let mouseBusyTimeout = 0;
export function makeMouseBusy(ms) {
    clearTimeout(mouseBusyTimeout);
    //logHHAuto('mouseBusy' + mouseBusy + ' ' + ms);
    mouseBusy = true;
    mouseBusyTimeout = setTimeout(function(){mouseBusy = false;}, ms);
};

export function bindMouseEvents(){
    const mouseTimeoutVal = Number.isInteger(Number(getStoredValue("HHAuto_Setting_mousePauseTimeout"))) ? Number(getStoredValue("HHAuto_Setting_mousePauseTimeout")) : 5000;
        document.onmousemove = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onscroll = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onmouseup = function() { makeMouseBusy(mouseTimeoutVal); };
}