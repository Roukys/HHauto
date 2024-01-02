import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { setStoredValue } from "./StorageHelper";
import { TimeHelper } from "./TimeHelper";

export let Timers = {};

export function setTimers(timer) {
    Timers = timer;
}

export function setTimer(name, seconds)
{
    var ND=new Date().getTime() + seconds * 1000;
    Timers[name]=ND;
    setStoredValue(HHStoredVarPrefixKey+"Temp_Timers", JSON.stringify(Timers));
    logHHAuto(name+" set to "+TimeHelper.toHHMMSS(ND/1000-new Date().getTimezoneOffset()*60)+' ('+ TimeHelper.toHHMMSS(seconds)+')');
}


export function clearTimer(name: string)
{
    delete Timers[name];
    setStoredValue(HHStoredVarPrefixKey+"Temp_Timers", JSON.stringify(Timers));
}

export function checkTimer(name: string)
{
    if (!Timers[name] || Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

export function checkTimerMustExist(name: string)
{
    if (Timers[name] && Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

export function getTimer(name: string)
{
    if (!Timers[name])
    {
        return -1;
    }
    return Timers[name];
}

export function getSecondsLeft(name)
{
    if (!Timers[name])
    {
        return 0;
    }
    var result = Math.ceil(Timers[name]/1000)-Math.ceil(new Date().getTime()/1000);
    if (result >0)
    {
        return result;
    }
    else
    {
        return 0;
    }
}

export function getTimeLeft(name)
{
    const timerWaitingCompet = ['nextPachinkoTime','nextPachinko2Time','nextPachinkoEquipTime','nextSeasonTime','nextLeaguesTime'];
    if (!Timers[name])
    {
        if (!TimeHelper.canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for contest";
        }
        return "No timer";
    }
    var diff=getSecondsLeft(name);
    if (diff<=0)
    {
        if (!TimeHelper.canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for contest";
        }
        return "Time's up!";
    }
    return TimeHelper.toHHMMSS(diff);
}