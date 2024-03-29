import { deleteStoredValue, extractHHVars, getLocalStorageSize, getStoredValue, setStoredValue } from "../Helper/StorageHelper";
import { HHStoredVarPrefixKey } from '../config/index';
import { getBrowserData } from "./BrowserUtils";

const MAX_LINES = 500

export function cleanLogsInStorage() {
    var currentLoggingText: any = {};
    let currDate = new Date();
    var prefix = currDate.toLocaleString() + "." + currDate.getMilliseconds() + ":cleanLogsInStorage";
    currentLoggingText[prefix] = 'Cleaned logging, storage size before clean ' + getLocalStorageSize();
    setStoredValue(HHStoredVarPrefixKey + "Temp_Logging", JSON.stringify(currentLoggingText));

    // Delete big temp in storage
    deleteStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList");
}

export function logHHAuto(...args)
{

    const stackTrace = (new Error()).stack || '';
    let match
    const regExps = [/at Object\.([\w_.]+) \((\S+)\)/, /\n([\w_.]+)@(\S+)/, /\)\n    at ([\w_.]+) \((\S+)\)/];
    regExps.forEach(element => {
        if(!(match && match.length >= 2)) match = stackTrace.match(element);
    });
    if(!(match && match.length >= 2)) match = ['Unknown','Unknown'];

    const callerName = match[1];

    let currDate = new Date();
    var prefix = currDate.toLocaleString()+"."+currDate.getMilliseconds()+":"+callerName;
    var text:any;
    var currentLoggingText:any;
    var nbLines:number;

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };
    if (args.length === 1)
    {
        if (typeof args[0] === 'string' || args[0] instanceof String)
        {
            text = args[0];
        }
        else
        {
            text = JSON.stringify(args[0], getCircularReplacer(), 2);
        }
    }
    else
    {
        text = JSON.stringify(args, getCircularReplacer(), 2);
    }
    currentLoggingText = getStoredValue(HHStoredVarPrefixKey+"Temp_Logging")!==undefined?getStoredValue(HHStoredVarPrefixKey+"Temp_Logging"):"reset";
    //console.log("debug : ",currentLoggingText);
    if (!currentLoggingText.startsWith("{"))
    {
        //console.log("debug : delete currentLog");
        currentLoggingText={};
    }
    else
    {

        currentLoggingText = JSON.parse(currentLoggingText);
    }
    nbLines = Object.keys(currentLoggingText).length;
    //console.log("Debug : Counting log lines : "+nbLines);
    if (nbLines > MAX_LINES)
    {
        var keys=Object.keys(currentLoggingText);
        //console.log("Debug : removing old lines");
        for (var i = 0; i < nbLines - MAX_LINES; i++)
        {
            //console.log("debug delete : "+currentLoggingText[keys[i]]);
            delete currentLoggingText[keys[i]];
        }
    }
    let count=1;
    let newPrefix = prefix;
    while (currentLoggingText.hasOwnProperty(newPrefix) && count < 10)
    {
        newPrefix = prefix + "-" + count;
        count++;
    }
    prefix=newPrefix;
    console.log(prefix+":"+text);
    currentLoggingText[prefix]=text;

    setStoredValue(HHStoredVarPrefixKey+"Temp_Logging", JSON.stringify(currentLoggingText));

}

export function saveHHDebugLog()
{
    var dataToSave={}

    var name='HH_DebugLog_'+Date.now()+'.log';
    dataToSave['HHAuto_browserVersion']=getBrowserData(window.navigator || navigator);
    dataToSave['HHAuto_scriptHandler']=GM_info.scriptHandler+' '+GM_info.version;
    dataToSave['HHAuto_version']=GM_info.script.version;
    dataToSave['HHAuto_HHSite']=window.location.origin;
    dataToSave['HHAuto_storageSize'] = getLocalStorageSize();
    extractHHVars(dataToSave,true);
    const a = document.createElement('a')
    a.download = name
    a.href = URL.createObjectURL(new Blob([JSON.stringify(dataToSave, null, 2)], {type: 'application/json'}))
    a.click()
}