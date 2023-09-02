import { extractHHVars, getStoredValue, setStoredValue } from "../Helper/StorageHelper";
import { getBrowserData } from "./BrowserUtils";

export function logHHAuto(...args)
{

    let stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
    let match
    try {
        match = stackTrace.match(/at Object\.(\w+) \((\S+)\)/);
        match[1] // throw error if match is null
    } catch {
        // Firefox
        match = stackTrace.match(/\n(\w+)@(\S+)/);
    }
    let [callerName, callerPlace] = [match[1], match[2]]

    let currDate = new Date();
    var prefix = currDate.toLocaleString()+"."+currDate.getMilliseconds()+":"+callerName;
    var text;
    var currentLoggingText;
    var nbLines;
    var maxLines = 500;

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
    currentLoggingText = getStoredValue("HHAuto_Temp_Logging")!==undefined?getStoredValue("HHAuto_Temp_Logging"):"reset";
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
    if( nbLines >maxLines)
    {
        var keys=Object.keys(currentLoggingText);
        //console.log("Debug : removing old lines");
        for(var i = 0; i < nbLines-maxLines; i++)
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

    setStoredValue("HHAuto_Temp_Logging", JSON.stringify(currentLoggingText));

}


export function saveHHDebugLog()
{
    var dataToSave={}

    var name='HH_DebugLog_'+Date.now()+'.log';
    dataToSave['HHAuto_browserVersion']=getBrowserData(window.navigator || navigator);
    dataToSave['HHAuto_scriptHandler']=GM_info.scriptHandler+' '+GM_info.version;
    dataToSave['HHAuto_version']=GM_info.script.version;
    dataToSave['HHAuto_HHSite']=window.location.origin;
    extractHHVars(dataToSave,true);
    const a = document.createElement('a')
    a.download = name
    a.href = URL.createObjectURL(new Blob([JSON.stringify(dataToSave, null, 2)], {type: 'application/json'}))
    a.click()
}