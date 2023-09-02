import { logHHAuto } from "../Utils";
import { setStoredValue } from "./StorageHelper";
import { canCollectCompetitionActive, toHHMMSS } from "./TimeHelper";

export let Timers = {};

export function setTimer(name, seconds)
{
    var ND=new Date().getTime() + seconds * 1000;
    Timers[name]=ND;
    setStoredValue("HHAuto_Temp_Timers", JSON.stringify(Timers));
    logHHAuto(name+" set to "+toHHMMSS(ND/1000-new Date().getTimezoneOffset()*60)+' ('+ toHHMMSS(seconds)+')');
}


export function clearTimer(name)
{
    delete Timers[name];
    setStoredValue("HHAuto_Temp_Timers", JSON.stringify(Timers));
}

export function checkTimer(name)
{
    if (!Timers[name] || Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

export function checkTimerMustExist(name)
{
    if (Timers[name] && Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

export function getTimer(name)
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
        if (!canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for contest";
        }
        return "No timer";
    }
    var diff=getSecondsLeft(name);
    if (diff<=0)
    {
        if (!canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for contest";
        }
        return "Time's up!";
    }
    return toHHMMSS(diff);
}