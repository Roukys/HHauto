import { getStoredValue } from '../Helper/index';
import { HHStoredVarPrefixKey } from '../config/index';

export let mouseBusy:boolean = false;
export let mouseBusyTimeout:any = 0;
export function makeMouseBusy(ms) {
    clearTimeout(mouseBusyTimeout);
    //logHHAuto('mouseBusy' + mouseBusy + ' ' + ms);
    mouseBusy = true;
    mouseBusyTimeout = setTimeout(function(){mouseBusy = false;}, ms);
};

export function bindMouseEvents(){
    const mouseTimeoutVal = Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_mousePauseTimeout"))) ? Number(getStoredValue(HHStoredVarPrefixKey+"Setting_mousePauseTimeout")) : 5000;
        document.onmousemove = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onscroll = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onmouseup = function() { makeMouseBusy(mouseTimeoutVal); };
}