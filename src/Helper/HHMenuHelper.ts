import { LeagueHelper } from '../Module/League';
import { setDefaults } from '../Service/index';
import { isDisplayedHHPopUp, logHHAuto } from '../Utils/index';
import { HHAuto_inputPattern, HHStoredVarPrefixKey, HHStoredVars } from '../config/index';
import { ConfigHelper } from "./ConfigHelper";
import { getTextForUI } from "./LanguageHelper";
import { NumberHelper, add1000sSeparator1 } from "./NumberHelper";
import { getPage } from './PageHelper';
import { getStorageItem, getStoredValue, setStoredValue } from "./StorageHelper";

export class HHMenu {
    static BUTTON_MENU_ID = 'sMenuButton';

    createMenuButton() {
        if ($('#' + HHMenu.BUTTON_MENU_ID).length > 0) return;
        if (getPage() == ConfigHelper.getHHScriptVars("pagesIDHome")) {
            GM_addStyle(''
                + '#sMenuButton {'
                + '   position: absolute;'
                + '   top: 65px;'
                + '   right: 15px;'
                + '   z-index:5000;'
                + '}'
                + '@media only screen and (max-width: 1025px) {'
                + '#sMenuButton {'
                + '   width: 40px;'
                + '   height: 40px;'
                + '   top: 55px;'
                + '   right: 40px;'
                + '}}'
            );
        } else {
            GM_addStyle(''
                + '#sMenuButton {'
                + '   position: absolute;'
                + '   top: 45px;'
                + '   right: 15px;'
                + '   z-index:5000;'
                + '}'
                + '@media only screen and (max-width: 1025px) {'
                + '#sMenuButton {'
                + '   width: 40px;'
                + '   height: 40px;'
                + '   top: 60px;'
                + '   right: 10px;'
                + '}}'
            );
        }
        $("#contains_all nav").prepend('<div class="square_blue_btn" id="' + HHMenu.BUTTON_MENU_ID + '" ><img src="https://i.postimg.cc/bv7n83z3/script-Icon2.png"></div>');
        $("#sMenuButton").on("click", () => {
            const sMenu = document.getElementById("sMenu");
            if (sMenu != null) {
                if (sMenu.style.display === "none") {
                    setMenuValues();
                    sMenu.style.display = "flex";
                    $('#contains_all')[0].style.zIndex = '9';
                }
                else {
                    getMenuValues();
                    sMenu.style.display = "none"
                    $('#contains_all')[0].style.zIndex = "";
                }
            }
        });
    }

    _createHtmlOption(value:string, text:string) {
        var option = document.createElement("option");
        option.value = value;
        option.text = text;
        return option;
    }

    fillTrollSelectMenu(lastTrollIdAvailable: number) {
        var trollOptions = <HTMLSelectElement>document.getElementById("autoTrollSelector");
        try {
            const trollz = ConfigHelper.getHHScriptVars("trollzList");
            for (var i = 0; i <= lastTrollIdAvailable; i++) {
                var option = this._createHtmlOption(i + '', trollz[i]);
                if (option.text !== 'EMPTY' && trollz[i]) {
                    // Supports for PH and missing trols or parallel advantures (id world "missing")
                    trollOptions.add(option);
                }
            }
            
        } catch ({ errName, message }) {
            trollOptions.add(this._createHtmlOption('0', 'Error!'));
            logHHAuto(`Error filling trolls: ${errName}, ${message}`);
        }

        trollOptions.add(this._createHtmlOption('98', getTextForUI("firstTrollWithGirls", "elementText")));
        trollOptions.add(this._createHtmlOption('99', getTextForUI("lastTrollWithGirls", "elementText")));
    }

    fillLeagueSelectMenu() {
        var leaguesOptions = <HTMLSelectElement>document.getElementById("autoLeaguesSelector");
        try{
            const leagues = ConfigHelper.getHHScriptVars("leaguesList");

            for (var j in leagues) {
                leaguesOptions.add(this._createHtmlOption((Number(j) + 1) + '', leagues[j]));
            };
        } catch ({ errName, message }) {
            leaguesOptions.add(this._createHtmlOption('0', 'Error!'));
            logHHAuto(`Error filling leagues: ${errName}, ${message}`);
        }
    }

    fillLeaguSortMenu() {
        var sortsOptions = <HTMLSelectElement>document.getElementById("autoLeaguesSortMode");
        sortsOptions.add(this._createHtmlOption(LeagueHelper.SORT_DISPLAYED, getTextForUI("autoLeaguesdisplayedOrder", "elementText")));
        sortsOptions.add(this._createHtmlOption(LeagueHelper.SORT_POWER, getTextForUI("autoLeaguesPower", "elementText")));
        sortsOptions.add(this._createHtmlOption(LeagueHelper.SORT_POWERCALC, getTextForUI("autoLeaguesPowerCalc", "elementText")));
    }

    // replaceMenuIconWithWarning() {
    //     $('#' + HHMenu.BUTTON_MENU_ID + ' img')
    //         .attr('src', 'https://i.postimg.cc/3JCgVBdK/Opponent-orange.png')
    //         .attr('title', getTextForUI("scriptWarning", "tooltip"));
    // }
}

export function maskInactiveMenus()
{
    let menuIDList =["isEnabledDailyGoals", "isEnabledPoV", "isEnabledPoG",
                    "isEnabledSeasonalEvent" , "isEnabledBossBangEvent" , "isEnabledSultryMysteriesEvent",
                    "isEnabledDailyRewards", "isEnabledFreeBundles", "isEnabledMission","isEnabledContest",
                    "isEnabledTrollBattle","isEnabledPowerPlaces","isEnabledSalary","isEnabledPachinko","isEnabledQuest","isEnabledSideQuest","isEnabledSeason","isEnabledLeagues",
                    "isEnabledAllChamps","isEnabledChamps","isEnabledClubChamp","isEnabledPantheon","isEnabledShop"];
    for (let menu of menuIDList)
    {
        const menuElement = document.getElementById(menu);
        if ( menuElement !== null && ConfigHelper.getHHScriptVars(menu,false) !== null && !ConfigHelper.getHHScriptVars(menu,false) )
        {
            menuElement.style.display = "none";
        }
    }
}

export function hhButton(textKeyId, buttonId){
    return `<div class="tooltipHH">`
                +`<span class="tooltipHHtext">${getTextForUI(textKeyId,"tooltip")}</span>`
                +`<label class="myButton" id="${buttonId}">${getTextForUI(textKeyId,"elementText")}</label>`
            +`</div>`;
}

export function hhMenuSwitch(textKeyAndInputId, isEnabledDivId='', isKobanSwitch=false){
    return `<div ${isEnabledDivId ? 'id="'+isEnabledDivId+'"' : '' } class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="tooltipHH">`
            +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
            +`<label class="switch"><input id="${textKeyAndInputId}" type="checkbox"><span class="slider round ${isKobanSwitch ? 'kobans' : ''}"></span></label>`
        +`</div>`
    +`</div>`;
}

export function hhMenuSwitchWithImg(textKeyAndInputId, imgPath, isKobanSwitch=false) {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="imgAndObjectRow">`
            +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/${imgPath}" />`
            +`<div style="padding-left:5px">`
                +`<div class="tooltipHH">`
                    +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
                    +`<label class="switch"><input id="${textKeyAndInputId}" type="checkbox"><span class="slider round ${isKobanSwitch ? 'kobans' : ''}"></span></label>`
                +`</div>`
            +`</div>`
        +`</div>`
    +`</div>`;
}

export function hhMenuSelect(textKeyAndInputId, inputStyle = '', options = '') {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="tooltipHH">`
            + `<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
            + `<select id="${textKeyAndInputId}" style="${inputStyle}" >${options}</select>`
        +`</div>`
    +`</div>`;
}

export function hhMenuInput(textKeyAndInputId, inputPattern, inputStyle='', inputClass='', inputMode='text') {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="tooltipHH">`
            +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
            +`<input id="${textKeyAndInputId}" class="${inputClass}" style="${inputStyle}" required pattern="${inputPattern}" type="text" inputMode="${inputMode}">`
        +`</div>`
    +`</div>`;
}

export function hhMenuInputWithImg(textKeyAndInputId, inputPattern, inputStyle, imgPath, inputMode='text') {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="imgAndObjectRow">`
            +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/${imgPath}" />`
            +`<div style="padding-left:5px">`
                +`<div class="tooltipHH">`
                    +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
                    +`<input style="${inputStyle}" id="${textKeyAndInputId}" required pattern="${inputPattern}" type="text" inputMode="${inputMode}">`
                +`</div>`
            +`</div>`
        +`</div>`
    +`</div>`;
}

export function switchHHMenuButton(isActive)
{
    var element = document.getElementById("sMenuButton");
    if(element !== null)
    {
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_master") === "false")
        {
            element.style["background-color"] = "red";
            element.style["background-image"] = "none";
        }
        else if (isActive)
        {
            element.style["background-color"] = "green";
            element.style["background-image"] = "none";
        }
        else
        {
            element.style.removeProperty('background-color');
            element.style.removeProperty('background-image');
        }
    }
}

export function setMenuValues()
{
    if (document.getElementById("sMenu") === null)
    {
        return;
    }
    setDefaults();

    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].storage !== undefined && HHStoredVars[i].HHType !== undefined)
        {
            let storageItem = getStorageItem(HHStoredVars[i].storage);
            let menuID:string = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace(HHStoredVarPrefixKey+HHStoredVars[i].HHType+"_","");
            const menuElement = document.getElementById(menuID);
            if (
                HHStoredVars[i].setMenu !== undefined
                && storageItem[i] !== undefined
                && HHStoredVars[i].setMenu
                && HHStoredVars[i].valueType !== undefined
                && HHStoredVars[i].menuType !== undefined
                && menuElement != null
            )
            {
                let itemValue = storageItem[i];
                switch (HHStoredVars[i].valueType)
                {
                    case "Long Integer":
                        itemValue = NumberHelper.add1000sSeparator(itemValue);
                        break;
                    case "Boolean":
                        itemValue = itemValue === "true";
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,itemValue);
                menuElement[HHStoredVars[i].menuType] = itemValue;
            } else if(menuElement == null) {
                // logHHAuto('ERROR: Element with ID "'+menuID+'" not found');
            }
        }
        else
        {
            logHHAuto("HHStoredVar "+i+" has no storage or type defined.");
        }
    }
}


export function getMenuValues()
{
    if (document.getElementById("sMenu") === null)
    {
        return;
    }
    if (isDisplayedHHPopUp() === 'loadConfig') {return}

    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].storage !== undefined && HHStoredVars[i].HHType !== undefined)
        {
            let storageItem = getStorageItem(HHStoredVars[i].storage);
            let menuID = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace(HHStoredVarPrefixKey+HHStoredVars[i].HHType+"_","");
            const menuElement = document.getElementById(menuID);
            if (
                HHStoredVars[i].getMenu !== undefined
                && document.getElementById(menuID) !== null
                && HHStoredVars[i].getMenu
                && HHStoredVars[i].valueType !== undefined
                && HHStoredVars[i].menuType !== undefined
                && menuElement != null
            )
            {
                let currentValue = storageItem[i];
                let menuValue = String(menuElement[HHStoredVars[i].menuType]);
                switch (HHStoredVars[i].valueType)
                {
                    case "Long Integer":
                        menuValue = String(NumberHelper.remove1000sSeparator(menuValue));
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,menuValue,document.getElementById(menuID),HHStoredVars[i].valueType);
                storageItem[i] = menuValue;
                //console.log(i,currentValue, menuValue);
                if (currentValue !== menuValue && HHStoredVars[i].newValueFunction !== undefined)
                {
                    //console.log(currentValue,menuValue);
                    HHStoredVars[i].newValueFunction.apply();
                }
            }
        }
        else
        {
            logHHAuto("HHStoredVar "+i+" has no storage or type defined.");
        }
    }
    setDefaults();
}


export function preventKobanUsingSwitchUnauthorized()
{

    if (this.checked && !(<HTMLInputElement>document.getElementById("spendKobans0")).checked)
    {
        let idToDisable = this.id;
        setTimeout(function(){(<HTMLInputElement>document.getElementById(idToDisable)).checked = false;},500);
    }
}

export function addEventsOnMenuItems()
{
    for (let i of Object.keys(HHStoredVars))
    {
        //console.log(i);
        if (HHStoredVars[i].HHType !== undefined )
        {
            let menuID = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace(HHStoredVarPrefixKey+HHStoredVars[i].HHType+"_","");
            const menuElement = document.getElementById(menuID);
            if(menuElement != null) {
                if ( HHStoredVars[i].valueType === "Long Integer")
                {
                    menuElement.addEventListener("keyup",add1000sSeparator1);
                }
                if (HHStoredVars[i].events !== undefined )
                {
                    for (let event of Object.keys(HHStoredVars[i].events))
                    {
                        menuElement.addEventListener(event,HHStoredVars[i].events[event]);
                    }
                }
                if (HHStoredVars[i].kobanUsing !== undefined && HHStoredVars[i].kobanUsing)
                {
                    menuElement.addEventListener("change", preventKobanUsingSwitchUnauthorized);
                }
                if (HHStoredVars[i].menuType !== undefined && HHStoredVars[i].menuType === "checked")
                {
                    menuElement.addEventListener("change",function ()
                                                                    {
                        if (HHStoredVars[i].newValueFunction !== undefined)
                        {
                            HHStoredVars[i].newValueFunction.apply();
                        }
                        setStoredValue(i,(<HTMLInputElement>this).checked)
                    });
                }
            }
        }
    }
}


export function getMenu() {
    const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';
    
    const getLeftColumn = () => {
        return `<div class="optionsColumn" style="min-width: 185px;">`
            +`<div style="padding:3px; display:flex; flex-direction:column;">`
                +`<span>HH Automatic ++</span>`
                +`<span style="font-size:smaller;">Version ${GM.info.script.version}</span>`
                +`<div class="internalOptionsRow" style="padding:3px">`
                    + hhButton('gitHub', 'git')
                    + hhButton('ReportBugs', 'ReportBugs')
                    + hhButton('DebugMenu', 'DebugMenu')
                +`</div>`
                +`<div class="internalOptionsRow" style="padding:3px">`
                    + hhButton('saveConfig', 'saveConfig')
                    + hhButton('loadConfig', 'loadConfig')
                +`</div>`
                +`<div class="internalOptionsRow" style="padding:3px">`
                    + hhButton('saveDefaults', 'saveDefaults')
                +`</div>`
            +`</div>`
            +`<div class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/panel.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("globalTitle","elementText")}</span>`
                +`</div>`
                +`<div class="rowOptionsBox" style="display:grid;grid-auto-flow: column;">`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('master') // Master switch
                        + hhMenuSwitch('paranoia')
                        +`<div id="isEnabledMousePause" class="labelAndButton">`
                            +`<span class="HHMenuItemName">${getTextForUI("mousePause","elementText")}</span>`
                            +`<div class="tooltipHH">`
                                +`<span class="tooltipHHtext">${getTextForUI("mousePause","tooltip")}</span>`
                                +`<label class="switch">`
                                    +`<input id="mousePause" type="checkbox">`
                                    +`<span class="slider round">`
                                    +`</span>`
                                +`</label>`
                                +`<input style="text-align:center; width:40px" id="mousePauseTimeout" required pattern="${HHAuto_inputPattern.mousePauseTimeout}" type="text">`
                            +`</div>`
                        +`</div>`
                        + hhMenuInput('collectAllTimer', HHAuto_inputPattern.collectAllTimer, 'text-align:center; width:25px')
                    +`</div>`
                    +`<div class="optionsColumn">`
                        +`<div class="labelAndButton">`
                            +`<span class="HHMenuItemName">${getTextForUI("waitforContest","elementText")}</span>`
                            +`<div class="tooltipHH">`
                                +`<span class="tooltipHHtext">${getTextForUI("waitforContest","tooltip")}</span>`
                                +`<label class="switch">`
                                    +`<input id="waitforContest" type="checkbox">`
                                    +`<span class="slider round">`
                                    +`</span>`
                                +`</label>`
                                +`<input style="text-align:center; width:30px" id="safeSecondsForContest" required pattern="${HHAuto_inputPattern.safeSecondsForContest}" type="text">`
                            +`</div>`
                        +`</div>`
                        + hhMenuSwitch('settPerTab')
                        + hhMenuSwitch('paranoiaSpendsBefore')
                        + hhMenuSwitch('autoFreeBundlesCollect', 'isEnabledFreeBundles')
                        + hhMenuSwitch('collectEventChest')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/pictures/design/ic_hard_currency.png" />`
                    +`<span class="optionsBoxTitle">Kobans</span>`
                +`</div>`
                +`<div class="rowOptionsBox">`
                    + hhMenuSwitchWithImg('spendKobans0', 'design/menu/affil_prog.svg', true)
                    + hhMenuInputWithImg('kobanBank', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:50px', 'pictures/design/ic_hard_currency.png' )
                +`</div>`
            +`</div>`
            +`<div class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/sex_friends.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("displayTitle","elementText")}</span>`
                +`</div>`
                +`<div class="rowOptionsBox">`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('showInfo')
                        + hhMenuSwitch('showTooltips')
                    +`</div>`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('showCalculatePower')
                        + hhMenuSwitch('showAdsBack')
                    +`</div>`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('showRewardsRecap')
                        + hhMenuSwitch('showInfoLeft')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledPoa" class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<span class="optionsBoxTitle">${getTextForUI("poaTitle","elementText")}</span>`
                +`</div>`
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                        + hhMenuSwitch('PoAMaskRewards')
                        + hhMenuSwitch('autoPoACollect')
                        + hhMenuSwitch('autoPoACollectAll')
                    +`</div>`
                +`</div>`
            +`</div>`
        +`</div>`;
    }

    const getMiddleColumn = () => {
        return `<div class="optionsColumn" style="min-width: 500px;">`
            +`<div class="optionsRow">`
                +`<div class="optionsColumn">`
                    +`<div class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/missions.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoActivitiesTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox" style="border:none;padding:0">`
                            +`<div class="internalOptionsRow">`
                                +`<div id="isEnabledMission" class="internalOptionsRow optionsBox" style="padding:0;margin:0 3px 0 0;">`
                                    + hhMenuSwitch('autoMission')
                                    + hhMenuSwitch('autoMissionCollect')
                                    + hhMenuSwitch('autoMissionKFirst')
                                    + hhMenuSwitch('compactMissions')
                                    + hhMenuSwitch('invertMissions')
                                +`</div>`
                                +`<div id="isEnabledContest" class="internalOptionsRow optionsBox" style="padding:0;margin:0 0 0 3px;">`
                                    + hhMenuSwitch('autoContest')
                                    + hhMenuSwitch('compactEndedContests')
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div class="optionsBox" style="border:none;padding:0">`
                        +`<div class="internalOptionsRow">`
                            +`<div id="isEnabledPowerPlaces" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("powerPlacesTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow">`
                                        + hhMenuSwitch('autoPowerPlaces')
                                        + hhMenuInput('autoPowerPlacesIndexFilter', HHAuto_inputPattern.autoPowerPlacesIndexFilter, 'width: 100px;' )
                                        + hhMenuSwitch('autoPowerPlacesAll')
                                    +`</div>`
                                    +`<div class="internalOptionsRow">`
                                        + hhMenuSwitch('autoPowerPlacesPrecision')
                                        + hhMenuSwitch('autoPowerPlacesInverted')
                                        + hhMenuSwitch('autoPowerPlacesWaitMax')
                                        + hhMenuSwitch('compactPowerPlace')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledPowerPlaces" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    + `<span class="optionsBoxTitle">${getTextForUI("dailyGoalsTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow">`
                                        + hhMenuSwitch('autoDailyGoalsCollect')
                                        + hhMenuSwitch('compactDailyGoals')
                                    + `</div>`
                                + `</div>`  
                                + `<div id="isEnabledPachinko" class="rowOptionsBox">`
                                    + `<div class="internalOptionsRow" style="justify-content: space-between">`
                                        + hhMenuSwitchWithImg('autoFreePachinko', 'pictures/design/menu/pachinko.svg')
                                    + `</div>`
                                + `</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsColumn">`
                    +`<div class="optionsBoxTitle">`
                    +`</div>`
                    +`<div id="isEnabledSalary" class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitchWithImg('autoSalary', 'pictures/design/harem.svg')
                            + hhMenuInput('autoSalaryMinSalary', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                            + hhMenuInput('autoSalaryMaxTimer', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                        + `</div>`
                        + `<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoSalaryResetFilters')
                            + hhMenuSwitch('autoSalaryUseFilter')
                            + hhMenuInput('autoSalaryFilter', HHAuto_inputPattern.autoSalaryFilter, 'width:55px')
                        +`</div>`
                    +`</div>`
                    +`<div class="optionsRow">`
                        +`<div id="isEnabledQuest" class="rowOptionsBox">`
                            +`<div class="internalOptionsRow">`
                                + hhMenuSwitchWithImg('autoQuest', 'design/menu/forward.svg')
                                + hhMenuSwitch('autoSideQuest', 'isEnabledSideQuest')
                                + hhMenuInputWithImg('autoQuestThreshold', HHAuto_inputPattern.autoQuestThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_quest.png', 'numeric')
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsRow">`
                +`<div id="isEnabledSeason" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/seasons.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoSeasonTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoSeason')
                            + hhMenuSwitch('autoSeasonCollect')
                            + hhMenuSwitch('autoSeasonCollectAll')
                            + hhMenuSwitch('SeasonMaskRewards')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoSeasonPassReds', '', true)
                            + hhMenuSwitch('autoSeasonBoostedOnly')
                            + hhMenuSwitch('autoSeasonSkipLowMojo')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuInputWithImg('autoSeasonThreshold', HHAuto_inputPattern.autoSeasonThreshold, 'text-align:center; width:25px', 'pictures/design/ic_kiss.png', 'numeric' )
                            + hhMenuInputWithImg('autoSeasonRunThreshold', HHAuto_inputPattern.autoSeasonRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_kiss.png', 'numeric' )
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledLeagues" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/leaderboard.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoLeaguesTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoLeagues')
                            + hhMenuSelect('autoLeaguesSortMode', 'width:85px;')
                            + hhMenuSwitch('autoLeaguesCollect')
                            + hhMenuSwitch('autoLeaguesBoostedOnly')
                            + hhMenuSwitch('leagueListDisplayPowerCalc')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSelect('autoLeaguesSelector')
                            + hhMenuSwitch('autoLeaguesAllowWinCurrent')
                            + hhMenuSwitch('autoLeaguesForceOneFight')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuInputWithImg('autoLeaguesThreshold', HHAuto_inputPattern.autoLeaguesThreshold, 'text-align:center; width:25px', 'pictures/design/league_points.png', 'numeric' )
                            + hhMenuInputWithImg('autoLeaguesRunThreshold', HHAuto_inputPattern.autoLeaguesRunThreshold, 'text-align:center; width:25px', 'pictures/design/league_points.png', 'numeric' )
                            + hhMenuInput('autoLeaguesSecurityThreshold', HHAuto_inputPattern.autoLeaguesSecurityThreshold, 'text-align:center; width:25px', '', 'numeric' )
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsRow">`
                +`<div id="isEnabledPoV" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("povTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('PoVMaskRewards')
                            + hhMenuSwitch('autoPoVCollect')
                            + hhMenuSwitch('autoPoVCollectAll')
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledPoG" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("pogTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('PoGMaskRewards')
                            + hhMenuSwitch('autoPoGCollect')
                            + hhMenuSwitch('autoPoGCollectAll')
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledSeasonalEvent" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("seasonalEventTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('SeasonalEventMaskRewards')
                            + hhMenuSwitch('autoSeasonalEventCollect')
                            + hhMenuSwitch('autoSeasonalEventCollectAll')
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledTrollBattle" class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/pictures/design/menu/map.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("autoTrollTitle","elementText")}</span>`
                +`</div>`
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow" style="justify-content: space-between">`
                        + hhMenuSwitch('autoTrollBattle')
                        + hhMenuSelect('autoTrollSelector')
                        + hhMenuInputWithImg('autoTrollThreshold', HHAuto_inputPattern.autoTrollThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_fight.png', 'numeric' )
                        + hhMenuInputWithImg('autoTrollRunThreshold', HHAuto_inputPattern.autoTrollRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_fight.png', 'numeric' )
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitch('useX10Fights', '', true)
                        + hhMenuSwitch('useX10FightsAllowNormalEvent')
                        + hhMenuInput('minShardsX10', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
                        + hhMenuSwitch('useX50Fights', '', true)
                        + hhMenuSwitch('useX50FightsAllowNormalEvent')
                        + hhMenuInput('minShardsX50', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitch('plusEvent')
                        + hhMenuInput('eventTrollOrder', HHAuto_inputPattern.eventTrollOrder, 'width:150px')
                        + hhMenuSwitch('buyCombat', '', true)
                        + hhMenuInput('autoBuyTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
                        + hhMenuInput('buyCombTimer', HHAuto_inputPattern.buyCombTimer, 'text-align:center; width:40px', '', 'numeric')
                    +`</div>`
                    +`<div class="internalOptionsRow separator">`
                        + hhMenuSwitch('plusEventMythic')
                        + hhMenuSwitch('autoTrollMythicByPassParanoia')
                        + hhMenuSwitch('buyMythicCombat', '', true)
                        + hhMenuInput('autoBuyMythicTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
                        + hhMenuInput('buyMythicCombTimer', HHAuto_inputPattern.buyMythicCombTimer, 'text-align:center; width:40px', '', 'numeric')
                        + hhMenuSwitch('plusEventMythicSandalWood')
                    +`</div>`
                +`</div>`
            +`</div>`
        +`</div>`;
    }

    const getRightColumn = () => {
        return `<div class="optionsColumn" style="width: 340px;">`
            +`<div id="isEnabledAllChamps" class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("autoChampsTitle","elementText")}</span>`
                +`</div>`
                +`<div class="optionsBox">`
                    +`<div id="isEnabledChamps" class="internalOptionsRow">`
                        + hhMenuSwitch('autoChamps')
                        + hhMenuSwitch('autoChampsForceStart')
                        + hhMenuSwitchWithImg('autoChampsUseEne', 'pictures/design/ic_energy_quest.png')
                        + hhMenuInput('autoChampsFilter', HHAuto_inputPattern.autoChampsFilter, 'text-align:center; width:55px')
                        + hhMenuSwitch('autoChampsForceStartEventGirl')
                    +`</div>`
                    +`<div id="isEnabledClubChamp" class="internalOptionsRow separator">`
                        + hhMenuSwitch('autoClubChamp')
                        + hhMenuSwitch('autoClubForceStart')
                        + hhMenuInputWithImg('autoClubChampMax', HHAuto_inputPattern.autoClubChampMax, 'text-align:center; width:45px', 'pictures/design/champion_ticket.png', 'numeric')
                        + hhMenuSwitch('showClubButtonInPoa')
                        + hhMenuSwitch('autoChampAlignTimer')
                    +`</div>`
                    +`<div class="internalOptionsRow separator">`
                        + hhMenuInput('autoChampsTeamLoop', HHAuto_inputPattern.autoChampsTeamLoop, 'text-align:center; width:25px', '', 'numeric')
                        + hhMenuInput('autoChampsGirlThreshold', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:center; width:45px')
                        + hhMenuSwitch('autoChampsTeamKeepSecondLine')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledPantheon" class="">` // optionsBoxWithTitle
                // +`<div class="optionsBoxTitle">`
                //     +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
                //     +`<span class="optionsBoxTitle">${getTextForUI("autoPantheonTitle","elementText")}</span>`
                // +`</div>`
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                        + hhMenuSwitch('autoPantheon')
                        + hhMenuInputWithImg('autoPantheonThreshold', HHAuto_inputPattern.autoPantheonThreshold, 'text-align:center; width:25px', 'pictures/design/ic_worship.svg' , 'numeric')
                        + hhMenuInputWithImg('autoPantheonRunThreshold', HHAuto_inputPattern.autoPantheonRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_worship.svg' , 'numeric')
                        + hhMenuSwitch('autoPantheonBoostedOnly')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledLabyrinth" class="" style="display:none">` // optionsBoxWithTitle
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                        + hhMenuSwitch('autoLabyrinth')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledShop" class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/shop.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("autoBuy","elementText")}</span>`
                +`</div>`
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoStatsSwitch', 'design/ic_plus.svg')
                        + hhMenuInput('autoStats', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoExpW', 'design/ic_books_gray.svg')
                        + hhMenuInput('maxExp', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                        + hhMenuInput('autoExp', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoAffW', 'design/ic_gifts_gray.svg')
                        + hhMenuInput('maxAff', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                        + hhMenuInput('autoAff', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoBuyBoosters', 'design/ic_boosters_gray.svg', true)
                        + hhMenuInput('maxBooster', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                        + hhMenuInput('autoBuyBoostersFilter', HHAuto_inputPattern.autoBuyBoostersFilter, 'text-align:center; width:70px')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('showMarketTools', 'design/menu/panel.svg')
                        + hhMenuSwitch('updateMarket')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsRow" style="display:block">`
                +`<div id="isEnabledEvents" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("eventTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox" style="border-style: dotted;">`
                        +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            +`<div class="optionsBox">`
                                +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                    + hhMenuSwitch('hideOwnedGirls')
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledDPEvent" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("doublePenetrationEventTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('autodpEventCollect')
                                        + hhMenuSwitch('autodpEventCollectAll')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            +`<div id="isEnabledSultryMysteriesEvent" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("sultryMysteriesEventTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('sultryMysteriesEventRefreshShop')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledBossBangEvent" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("bossBangEventTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('bossBangEvent')
                                        + hhMenuInput('bossBangMinTeam', HHAuto_inputPattern.bossBangMinTeam, 'text-align:center; width:25px', '', 'numeric')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
        +`</div>`;
    }

    // Add UI buttons.
    return `<div id="sMenu" class="HHAutoScriptMenu" style="display: none;">`
        +`<div style="position: absolute;left: 380px;color: #F00">${getTextForUI("noOtherScripts","elementText")}</div>`
        +`<div class="optionsRow">`
            + getLeftColumn()
            + getMiddleColumn()
            + getRightColumn()
        +`</div>`
    +`</div>`
}