import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { hhTimerLocale, timerDefinitions } from "../i18n/index";
import { getHHVars } from "./HHHelper";
import { getStoredValue } from "./StorageHelper";

declare global {
    interface Date {
       stdTimezoneOffset(): number;
       isDstObserved(): boolean;
    }
}

Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
/*
(new Date()).toLocaleString([], {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
  */

export class TimeHelper {

    static dSTOffset = -1;

    static getEETDSTOffset()
    {
        if(TimeHelper.dSTOffset < 0) {
            const today = new Date();

            function getEuropeStdTimezoneOffset(today)
            {
                // KK is in Sofia
                var jan = new Date(new Date(today.getFullYear(), 0, 1).toLocaleString('en-US', {timeZone:'Europe/Sofia'}));
                var jul = new Date(new Date(today.getFullYear(), 6, 1).toLocaleString('en-US', {timeZone:'Europe/Sofia'}));
                return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
            }

            function isDstObserved(today)
            {
                return today.getTimezoneOffset() < getEuropeStdTimezoneOffset(today);
            }
        
            if (isDstObserved(today))
            {
                TimeHelper.dSTOffset = 120; // Summer time
            }
            else
            {
                TimeHelper.dSTOffset = 60; // Winter time
            }
        }
        return TimeHelper.dSTOffset;
    }

    static getServerTS()
    {
        let sec_num = parseInt(getHHVars('server_now_ts'), 10);
        sec_num += TimeHelper.getEETDSTOffset() * 60;
        let days = Math.floor(sec_num / 86400);
        let hours = Math.floor(sec_num / 3600) % 24;
        let minutes = Math.floor(sec_num / 60) % 60;
        let seconds = sec_num % 60;
        return {days:days,hours:hours,minutes:minutes,seconds:seconds};
    }

    static canCollectCompetitionActive(): boolean
    {
        let safeTime = getStoredValue(HHStoredVarPrefixKey+"Setting_safeSecondsForContest") !== undefined ? Number(getStoredValue(HHStoredVarPrefixKey+"Setting_safeSecondsForContest")) : 120;
        if(isNaN(safeTime) || safeTime < 0) safeTime = 120;
        return getStoredValue(HHStoredVarPrefixKey+"Setting_waitforContest") !== "true" || TimeHelper.getSecondsLeftBeforeNewCompetition() > (30*60 + safeTime) && TimeHelper.getSecondsLeftBeforeNewCompetition() < (24*3600-safeTime);
    }

    static toHHMMSS(secs): string  {
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

    static getSecondsLeftBeforeEndOfHHDay(): number
    {
        let HHEndOfDay = {days:0,hours:13,minutes:0,seconds:0};
        let server_TS = TimeHelper.getServerTS();
        HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?0:1;
        let diffResetTime = (HHEndOfDay.days*86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
        return diffResetTime;
    }

    static getSecondsLeftBeforeNewCompetition(): number
    {
        let HHEndOfDay = {days:0,hours:13,minutes:30,seconds:0};
        let server_TS = TimeHelper.getServerTS();
        HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?0:1;
        let diffResetTime = (HHEndOfDay.days*86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
        return diffResetTime;
    }

    static debugDate(sec_num: number): string
    {
        let days = Math.floor(sec_num / 86400);
        let hours = Math.floor(sec_num / 3600) % 24;
        let minutes = Math.floor(sec_num / 60) % 60;
        let seconds = sec_num % 60;
        return JSON.stringify({days:days,hours:hours,minutes:minutes,seconds:seconds});
    }

    static sleep(waitTime) {
        return new Promise((resolve) => {
            setTimeout(resolve, waitTime);
        });
    }
}

export function convertTimeToInt(remainingTimer: string): number {
    let newTimer = 0;
    if (remainingTimer && remainingTimer.length > 0) {
        try{
            let splittedTime = remainingTimer.trim().split(' ');
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
        } catch ({ errName, message }) {
            logHHAuto(`ERROR: occured, reset to 15min: ${errName}, ${message}`);
            newTimer = randomInterval(15 * 60, 17 * 60);
        }
    } else {
        logHHAuto('No valid timer definitions, reset to 15min');
        newTimer = randomInterval(15*60, 17*60);
    }
    return newTimer;
}


export function getLimitTimeBeforeEnd(){
    return Number(getStoredValue(HHStoredVarPrefixKey+"Setting_collectAllTimer")) * 3600;
}


export function randomInterval(min: number, max: number): number // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}