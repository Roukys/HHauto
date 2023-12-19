import { 
    Leagues,
    Timers,
    Trollz,
    addEventsOnMenuItems,
    debugDeleteAllVars,
    debugDeleteTempVars,
    deleteStoredValue,
    doStatUpgrades,
    getHHScriptVars,
    getHHVars,
    getMenu,
    getMenuValues,
    getPage,
    getStorageItem,
    getStoredValue,
    getTextForUI,
    getTimeLeft,
    manageTranslationPopUp,
    maskInactiveMenus,
    migrateHHVars,
    saveHHStoredVarsDefaults,
    saveHHVarsSettingsAsJSON,
    setHHStoredVarToDefault,
    setMenuValues,
    setStoredValue,
    setTimer,
    setTimers
 } from '../Helper/index';
import {
    Booster,
    Club,
    Contest,
    DailyGoals,
    Market,
    Missions,
    MonthlyCards,
    PlaceOfPower,
    Troll
} from '../Module/index';
import { 
    fillHHPopUp,
    isJSON,
    logHHAuto,
    maskHHPopUp,
    myfileLoad_onChange,
    replaceCheatClick, 
    saveHHDebugLog
} from '../Utils/index';
import {
    HHStoredVarPrefixKey,
    HHStoredVars
} from '../config/index';
import { autoLoop, getBurst } from "./AutoLoop";
import { createPInfo } from "./InfoService";
import {
    bindMouseEvents
} from "./MouseService";
import { disableToolTipsDisplay, enableToolTipsDisplay, manageToolTipsDisplay } from "./TooltipService";

var started=false;
var debugMenuID;

export function setDefaults(force = false)
{
    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].storage !== undefined )
        {
            let storageItem = getStorageItem(HHStoredVars[i].storage);
            let isInvalid = false;
            //console.log(storageItem[i], storageItem[i] !== undefined);
            if (HHStoredVars[i].isValid !== undefined && storageItem[i] !== undefined)
            {
                isInvalid = !HHStoredVars[i].isValid.test(storageItem[i]);
                if (isInvalid)
                {
                    logHHAuto("HHStoredVar "+i+" is invalid, reseting.");
                    logHHAuto("HHStoredVar "+i+" current value : "+storageItem[i]);
                }
            }
            if (HHStoredVars[i].default !== undefined )
            {
                if (storageItem[i] === undefined || force || isInvalid)
                {
                    setHHStoredVarToDefault(i);
                }
            }
            else
            {
                if (force ||isInvalid)
                {
                    storageItem.removeItem(i);
                }
            }
        }
        else
        {
            logHHAuto("HHStoredVar "+i+" has no storage defined.");
        }
    }
}

export function hardened_start()
{
    debugMenuID = GM_registerMenuCommand(getTextForUI("saveDebug","elementText"), saveHHDebugLog);
    //GM_unregisterMenuCommand(debugMenuID);
    if (!started)
    {
        started=true;
        start();
    }

}

export function start() {

    if (unsafeWindow.Hero===undefined)
    {
        logHHAuto('???no Hero???');
        $('.hh_logo').click();
        setTimeout(hardened_start,5000);
        return;
    }
    Club.checkClubStatus();
    MonthlyCards.updateInputPattern();
    replaceCheatClick();
    migrateHHVars();

    if (getStoredValue(HHStoredVarPrefixKey+"Setting_leagueListDisplayPowerCalc") !== "true" && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeaguesPowerCalc") !== 'true')
    {
        // remove big var not removed from previous version
        deleteStoredValue(HHStoredVarPrefixKey+"Temp_LeagueOpponentList");
    }

    $('.redirect.gay').hide();
    $('.redirect.comix').hide();

    $('#starter_offer').hide();
    $('#starter_offer_background').hide();

    if (getStoredValue(HHStoredVarPrefixKey+"Temp_Timers"))
    {
        setTimers(JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_Timers")));
    }
    // clearEventData("onlyCheckEventsHHScript");
    setDefaults();

    if (getStoredValue(HHStoredVarPrefixKey+"Setting_mousePause") === "true") {
        bindMouseEvents();
    }

    $('#contains_all').prepend(getMenu());

    GM_addStyle(''
                +'#sMenuButton {'
                +'   position: absolute;'
                +'   top: 45px;'
                +'   right: 15px;'
                +'   z-index:5000;'
                +'}'
                +'@media only screen and (max-width: 1025px) {'
                +'#sMenuButton {'
                +'   width: 40px;'
                +'   height: 40px;'
                +'   top: 60px;'
                +'   right: 10px;'
                +'}}'
               );
    $("#contains_all nav").prepend('<div class="square_blue_btn" id="sMenuButton" ><img src="https://i.postimg.cc/bv7n83z3/script-Icon2.png"></div>');
   $("#sMenuButton").on("click", () => {
        const sMenu = document.getElementById("sMenu");
        if(sMenu != null) {
            if (sMenu.style.display === "none")
            {
                setMenuValues();
                sMenu.style.display = "flex";
                $('#contains_all')[0].style.zIndex = '9';
            }
            else
            {
                getMenuValues();
                sMenu.style.display = "none"
                $('#contains_all')[0].style.zIndex = "";
            }
        }
    });

    addEventsOnMenuItems();

    $("#showTooltips").on("change",() => {
        //console.log(this.checked);
        if ((<HTMLInputElement>$("#showTooltips")[0]).checked)
        {
            enableToolTipsDisplay(true);
        }
        else
        {
            disableToolTipsDisplay(true);
        }
    });

    const pInfoDiv = createPInfo();

    if(
        getPage()==getHHScriptVars("pagesIDMissions")
    || getPage()==getHHScriptVars("pagesIDContests")
    || getPage()==getHHScriptVars("pagesIDPowerplacemain")
    || getPage()==getHHScriptVars("pagesIDDailyGoals")
    )
    {
        Contest.styles();
        PlaceOfPower.styles();
        DailyGoals.styles();
        Missions.styles();
    }

    Booster.collectBoostersFromAjaxResponses();

    $('#contains_all').append(pInfoDiv);
    maskInactiveMenus();

    // Add auto troll options
    var trollOptions = <HTMLSelectElement>document.getElementById("autoTrollSelector");

    const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
    for (var i=0;i<=lastTrollIdAvailable;i++)
    {
        var option = document.createElement("option");
        option.value=i+'';
        option.text = Trollz[i];
        if(option.text !== 'EMPTY' && Trollz[i]) {
            // Supports for PH and missing trols or parallel advantures (id world "missing")
            trollOptions.add(option);
        }
    };

    var optionFWG = document.createElement("option");
    optionFWG.value = '98';
    optionFWG.text = getTextForUI("firstTrollWithGirls","elementText");
    trollOptions.add(optionFWG);

    var optionLWG = document.createElement("option");
    optionLWG.value = '99';
    optionLWG.text = getTextForUI("lastTrollWithGirls","elementText");
    trollOptions.add(optionLWG);

    // Add league options
    var leaguesOptions = <HTMLSelectElement>document.getElementById("autoLeaguesSelector");

    for (var j in Leagues)
    {
        var optionL = document.createElement("option");
        optionL.value=(Number(j)+1)+'';
        optionL.text = Leagues[j];
        leaguesOptions.add(optionL);
    };

    setMenuValues();
    getMenuValues();
    manageToolTipsDisplay();

    $("#git").on("click", function(){ window.open("https://github.com/Roukys/HHauto/wiki"); });
    $("#ReportBugs").on("click", function(){ window.open("https://github.com/Roukys/HHauto/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc"); });
    $("#loadConfig").on("click", function(){
        let LoadDialog='<p>After you select the file the settings will be automatically updated.</p><p> If nothing happened, then the selected file contains errors.</p><p id="LoadConfError"style="color:#f53939;"></p><p><label><input type="file" id="myfile" accept=".json" name="myfile"> </label></p>';
        fillHHPopUp("loadConfig",getTextForUI("loadConfig","elementText"), LoadDialog);
        $('#myfile').on('change', myfileLoad_onChange);

    });
    $("#saveConfig").on("click", saveHHVarsSettingsAsJSON);
    $("#saveDefaults").on("click", saveHHStoredVarsDefaults);
    $("#DebugMenu").on("click", function(){
        let debugDialog =   '<div style="padding:10px; display:flex;flex-direction:column">'
        +    '<p>HHAuto : v'+GM_info.script.version+'</p>'
        +    '<p>'+getTextForUI("DebugFileText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row">'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("saveDebug","tooltip")+'</span><label class="myButton" id="saveDebug">'+getTextForUI("saveDebug","elementText")+'</label></div>'
        +    '</div>'
        +    '<p>'+getTextForUI("DebugResetTimerText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row">'
        +     '<div style="padding-right:30px"class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("timerResetButton","tooltip")+'</span><label class="myButton" id="timerResetButton">'+getTextForUI("timerResetButton","elementText")+'</label></div>'
        +     '<div style="padding-right:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("timerResetSelector","tooltip")+'</span><select id="timerResetSelector"></select></div>'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("timerLeftTime","tooltip")+'</span><span id="timerLeftTime">'+getTextForUI("timerResetNoTimer","elementText")+'</span></div>'
        +    '</div>'
        +    '<p>'+getTextForUI("DebugOptionsText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row">'
        +     '<div style="padding-right:30px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("DeleteTempVars","tooltip")+'</span><label class="myButton" id="DeleteTempVars">'+getTextForUI("DeleteTempVars","elementText")+'</label></div>'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ResetAllVars","tooltip")+'</span><label class="myButton" id="ResetAllVars">'+getTextForUI("ResetAllVars","elementText")+'</label></div>'
        +    '</div>'
        +  '</div>'
        fillHHPopUp("DebugMenu",getTextForUI("DebugMenu","elementText"), debugDialog);
        $("#DeleteTempVars").on("click", function(){
            debugDeleteTempVars();
            location.reload();
        });
        $("#ResetAllVars").on("click", function(){
            debugDeleteAllVars();
            location.reload();
        });
        $("#saveDebug").on("click", saveHHDebugLog);

        $("#timerResetButton").on("click", function(){
            let timerSelector = <HTMLSelectElement>document.getElementById("timerResetSelector");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer","elementText") && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector","elementText"))
            {
                const sMenu = document.getElementById("sMenu");
                if(sMenu != null) sMenu.style.display = "none";
                maskHHPopUp();
                setTimer(timerSelector.options[timerSelector.selectedIndex].text,0);
                timerSelector.selectedIndex = 0;
            }
        });
        $(document).on('change',"#timerResetSelector", function() {
            let timerSelector = <HTMLSelectElement>document.getElementById("timerResetSelector");
            const timerLeftTime = document.getElementById("timerLeftTime");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer","elementText")  && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector","elementText"))
            {
                $("#timerLeftTime").text(getTimeLeft(timerSelector.options[timerSelector.selectedIndex].text));
            }
            else
            {
                $("#timerLeftTime").text( getTextForUI("timerResetNoTimer","elementText"));
            }
        });
        // Add Timer reset options //changed
        let timerOptions = <HTMLSelectElement>document.getElementById("timerResetSelector");
        var countTimers=0;
        let optionElement = document.createElement("option");
        optionElement.value = countTimers+'';
        optionElement.text = getTextForUI("timerResetSelector","elementText");
        countTimers++;
        timerOptions.add(optionElement);

        for (let i2 in Timers) {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers+'';
            countTimers++;
            optionElement.text = i2;
            timerOptions.add(optionElement);
        };

        if(countTimers === 1)
        {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers+'';
            optionElement.text = getTextForUI("timerResetNoTimer","elementText");
            timerOptions.add(optionElement);
        }

    });

    document.querySelectorAll("div#sMenu input[pattern]").forEach((currentInputElement) =>
                                                                  {
        const currentInput = <HTMLInputElement>currentInputElement;
        currentInput.addEventListener('input', () => {
            currentInput.style.backgroundColor = "";
            currentInput.checkValidity();
        });

        currentInput.addEventListener('invalid', () => {
            currentInput.style.backgroundColor = "red";
            //document.getElementById("master").checked = false;
            //setStoredValue(HHStoredVarPrefixKey+"Setting_master", "false");
        });
        currentInput.checkValidity();
    });



    setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
    if (typeof getStoredValue(HHStoredVarPrefixKey+"Temp_freshStart") == "undefined" || isNaN(Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")))) {
        setDefaults(true);
    }

    if (getBurst())
    {
        Market.doShopping();
        if ( getStoredValue(HHStoredVarPrefixKey+"Setting_autoStatsSwitch") ==="true" )
        {
            doStatUpgrades();
        }
    }

    if (unsafeWindow.hh_nutaku && window.top)
    {
        function Alive()
        {
            if(window.top) window.top.postMessage({ImAlive:true},'*');
            if (getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") =="true")
            {
                setTimeout(Alive,2000);
            }
        }
        Alive();
    }
    if (isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")) && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")).page?.indexOf(".html") > 0 )
    {
        //console.log("testingHome : setting to : "+getPage());
        setStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled", JSON.stringify({page:getPage(), dateTime:new Date().getTime()}));
    }
    if (isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")) && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")).page === getHHScriptVars("pagesIDHome"))
    {
        //console.log("testingHome : delete");
        deleteStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled");
    }
    getPage(true);
    setTimeout(autoLoop,1000);
    GM_registerMenuCommand(getTextForUI("translate","elementText"),manageTranslationPopUp);

};
