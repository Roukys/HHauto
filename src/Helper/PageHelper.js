import { PlaceOfPower } from "../Module";
import { isJSON, logHHAuto } from "../Utils";
import { getHHScriptVars } from "./ConfigHelper";
import { getStoredValue, setStoredValue } from "./StorageHelper";
import { queryStringGetParam } from "./UrlHelper";

export function getPage(checkUnknown = false)
{
    var ob = document.getElementById(getHHScriptVars("gameID"));
    if(ob===undefined || ob === null)
    {
        logHHAuto("Unable to find page attribute, stopping script");
        setStoredValue("HHAuto_Setting_master", "false");
        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        throw new Error("Unable to find page attribute, stopping script.");
        return "";
    }
    //var p=ob.className.match(/.*page-(.*) .*/i)[1];
    let activitiesMainPage = getHHScriptVars("pagesIDActivities");
    var tab = queryStringGetParam(window.location.search,'tab');
    var p=ob.getAttribute('page');
    let page = p;
    if (p==activitiesMainPage)
    {
        if (tab === 'contests' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='contests']").length>0)
        {
            page = getHHScriptVars("pagesIDContests");
        }
        if (tab === 'missions' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='missions']").length>0)
        {
            page = getHHScriptVars("pagesIDMissions");
        }
        if (tab === 'daily_goals' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='daily_goals']").length>0)
        {
            page = getHHScriptVars("pagesIDDailyGoals");

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
            if (popList.attr('style') !='display:none' )
            {
                t = 'main';
            }
            else
            {
                // Keep this but not triggered anymore. When Wrong POP is targetted, daily goals is highlighted
                t=$(".pop_thumb_selected").attr("pop_id");
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
        const knownPages = getHHScriptVars("pagesKnownList");
        let isKnown = false;
        for (let knownPage of knownPages)
        {
            //console.log(knownPage)
            if (page === getHHScriptVars("pagesID"+knownPage))
            {
                isKnown = true;
            }
        }
        if (!isKnown && page )
        {
            let unknownPageList = isJSON(getStoredValue("HHAuto_Temp_unkownPagesList"))?JSON.parse(getStoredValue("HHAuto_Temp_unkownPagesList")):{};
            logHHAuto("Page unkown for script : "+page+" / "+window.location.pathname);
            unknownPageList[page] = window.location.pathname;
            //console.log(unknownPageList);
            setStoredValue("HHAuto_Temp_unkownPagesList", JSON.stringify(unknownPageList));
        }
    }
    return page;
}