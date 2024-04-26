import { Contest } from '../Module/Contest';
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { hhTimerLocale, timerDefinitions } from "../i18n/index";
import { getHHVars } from "./HHHelper";
import { getStoredValue } from "./StorageHelper";
import { checkTimerMustExist, getSecondsLeft } from './TimerHelper';

export class TimeHelper {

    static canCollectCompetitionActive(): boolean
    {
        let safeTime = getStoredValue(HHStoredVarPrefixKey + "Setting_safeSecondsForContest") !== undefined ? Number(getStoredValue(HHStoredVarPrefixKey + "Setting_safeSecondsForContest")) : 120;
        if(isNaN(safeTime) || safeTime < 0) safeTime = 120;
        return getStoredValue(HHStoredVarPrefixKey + "Setting_waitforContest") !== "true" || !((getSecondsLeft('contestRemainingTime')-safeTime) < 0 && (getSecondsLeft('nextContestTime')+safeTime) > 0);
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