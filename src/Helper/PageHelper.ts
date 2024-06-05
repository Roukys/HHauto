import { PlaceOfPower } from '../Module/index';
import { isJSON, logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { ConfigHelper } from "./ConfigHelper";
import { getStoredValue, setStoredValue } from "./StorageHelper";
import { queryStringGetParam } from "./UrlHelper";

export function getPage(checkUnknown = false):string
{
    var ob = document.getElementById(ConfigHelper.getHHScriptVars("gameID"));
    if(ob===undefined || ob === null)
    {
        logHHAuto("Unable to find page attribute, stopping script");
        setStoredValue(HHStoredVarPrefixKey+"Setting_master", "false");
        setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        throw new Error("Unable to find page attribute, stopping script.");
        return "";
    }
    //var p=ob.className.match(/.*page-(.*) .*/i)[1];
    let activitiesMainPage = ConfigHelper.getHHScriptVars("pagesIDActivities");
    var tab = queryStringGetParam(window.location.search,'tab');
    var p:string=ob.getAttribute('page');
    let page = p;
    if (p==activitiesMainPage)
    {
        if (tab === 'contests' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='contests']").length>0)
        {
            page = ConfigHelper.getHHScriptVars("pagesIDContests");
        }
        if (tab === 'missions' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='missions']").length>0)
        {
            page = ConfigHelper.getHHScriptVars("pagesIDMissions");
        }
        if (tab === 'daily_goals' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='daily_goals']").length>0)
        {
            page = ConfigHelper.getHHScriptVars("pagesIDDailyGoals");

            if (tab === 'pop') {
                // Wrong POP targetted
                var index = queryStringGetParam(window.location.search,'index');
                if (index !== null)
                {
                    PlaceOfPower.addPopToUnableToStart(index,"Unable to go to Pop "+index+" as it is locked.");
                    PlaceOfPower.removePopFromPopToStart(index);
                }
            }
        }
        if (tab === 'pop' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='pop']").length>0)
        {
            // if on Pop menu
            var t;
            var popList= $("div.pop_list")
            if (popList.length == 1 || unsafeWindow.pop_list)
            {
                t = 'main';
            }
            else
            {
                // Keep this but not triggered anymore. When Wrong POP is targetted, daily goals is highlighted
                t = unsafeWindow.pop_index;
                checkUnknown = false;
                if (t === undefined)
                {
                    var index = queryStringGetParam(window.location.search,'index');
                    if (index !== null)
                    {
                        PlaceOfPower.addPopToUnableToStart(index,"Unable to go to Pop "+index+" as it is locked.");
                        PlaceOfPower.removePopFromPopToStart(index);
                        t='main';
                    }
                }
            }
            page = "powerplace"+t;
        }
    }
    if (checkUnknown)
    {
        const knownPages = ConfigHelper.getHHScriptVars("pagesKnownList");
        let isKnown = false;
        for (let knownPage of knownPages)
        {
            //console.log(knownPage)
            if (page === ConfigHelper.getHHScriptVars("pagesID"+knownPage))
            {
                isKnown = true;
            }
        }
        if (!isKnown && page )
        {
            let unknownPageList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_unkownPagesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_unkownPagesList")):{};
            logHHAuto("Page unkown for script : "+page+" / "+window.location.pathname);
            unknownPageList[page] = window.location.pathname;
            //console.log(unknownPageList);
            setStoredValue(HHStoredVarPrefixKey+"Temp_unkownPagesList", JSON.stringify(unknownPageList));
        }
    }
    return page;
}