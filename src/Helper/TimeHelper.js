import { logHHAuto } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";
import { hhTimerLocale, timerDefinitions } from "../i18n";
import { getHHVars } from "./HHHelper";
import { getStoredValue } from "./StorageHelper";

export function getServerTS()
{
    let sec_num = parseInt(getHHVars('server_now_ts'), 10);
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600) % 24;
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;
    return {days:days,hours:hours,minutes:minutes,seconds:seconds};
}

export function toHHMMSS(secs)  {
    var sec_num = parseInt(secs, 10);
    var days = Math.floor(sec_num / 86400);
    var hours = Math.floor(sec_num / 3600) % 24;
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    var n=0;
    return [days,hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => {if (v !== "00"){n++; return true;} return n > 0})
        .join(":");
}

export function getSecondsLeftBeforeEndOfHHDay()
{
    let HHEndOfDay = {days:0,hours:11,minutes:0,seconds:0};
    let server_TS = getServerTS();
    HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?0:1;
    let diffResetTime = (HHEndOfDay.days*86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
    return diffResetTime;
}

export function getSecondsLeftBeforeNewCompetition()
{
    let HHEndOfDay = {days:0,hours:11,minutes:30,seconds:0};
    let server_TS = getServerTS();
    HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?0:1;
    let diffResetTime = (HHEndOfDay.days*86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
    return diffResetTime;
}

export function debugDate(sec_num){
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600) % 24;
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;
    return JSON.stringify({days:days,hours:hours,minutes:minutes,seconds:seconds});
}

export function convertTimeToInt(remainingTimer){
    let newTimer = 0;
    if (remainingTimer && remainingTimer.length > 0) {
        let splittedTime = remainingTimer.split(' ');
        for (let i = 0; i < splittedTime.length; i++) {
            let timerSymbol = splittedTime[i].match(/[^0-9]+/)[0];
            switch (timerSymbol) {
                case timerDefinitions[hhTimerLocale].days:
                    newTimer += parseInt(splittedTime[i])*86400;
                    break;
                case timerDefinitions[hhTimerLocale].hours:
                    newTimer += parseInt(splittedTime[i])*3600;
                    break;
                case timerDefinitions[hhTimerLocale].minutes:
                    newTimer += parseInt(splittedTime[i])*60;
                    break;
                case timerDefinitions[hhTimerLocale].seconds:
                    newTimer += parseInt(splittedTime[i]);
                    break;
                default:
                    logHHAuto('Timer symbol not recognized: ' + timerSymbol);
            }
        }
    } else {
            logHHAuto('No valid timer definitions, reset to 15min');
            newTimer = randomInterval(15*60, 17*60);
    }
    return newTimer;
}

export function canCollectCompetitionActive()
{
    return getStoredValue(HHStoredVarPrefixKey+"Setting_waitforContest") !== "true" || getSecondsLeftBeforeNewCompetition() > 32*60 && getSecondsLeftBeforeNewCompetition() < (24*3600-2*60);
}


export function getLimitTimeBeforeEnd(){
    return Number(getStoredValue(HHStoredVarPrefixKey+"Setting_collectAllTimer")) * 3600;
}


export function randomInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}