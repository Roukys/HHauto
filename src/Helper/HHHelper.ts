import { logHHAuto } from '../Utils/index';
import { getHHScriptVars } from "./ConfigHelper";

export function getHHVars(infoSearched, logging = true): any
{
    let returnValue:any = unsafeWindow;
    if (getHHScriptVars(infoSearched,false) !== null)
    {
        infoSearched = getHHScriptVars(infoSearched);
    }

    let splittedInfoSearched = infoSearched.split(".");

    for (let i=0;i<splittedInfoSearched.length;i++)
    {
        if (returnValue[splittedInfoSearched[i]] === undefined)
        {
            if (logging)
            {
                logHHAuto("HH var not found : "+infoSearched+" ("+splittedInfoSearched[i]+" not defined).");
            }
            return null;
        }
        else
        {
            returnValue = returnValue[splittedInfoSearched[i]];
        }
    }
    return returnValue;
}

export function setHHVars(infoSearched,newValue)
{
    let returnValue:any = unsafeWindow;
    if (getHHScriptVars(infoSearched,false) !== null)
    {
        infoSearched = getHHScriptVars(infoSearched);
    }

    let splittedInfoSearched = infoSearched.split(".");

    for (let i=0;i<splittedInfoSearched.length;i++)
    {
        if (returnValue[splittedInfoSearched[i]] === undefined)
        {
            logHHAuto("HH var not found : "+infoSearched+" ("+splittedInfoSearched[i]+" not defined).");
            return -1;
        }
        else if ( i === splittedInfoSearched.length - 1)
        {
            returnValue[splittedInfoSearched[i]] = newValue;
            return 0;
        }
        else
        {
            returnValue = returnValue[splittedInfoSearched[i]];
        }
    }
}
