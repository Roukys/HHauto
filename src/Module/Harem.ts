import { 
    deleteStoredValue,
    getHHScriptVars,
    getHHVars,
    getStoredValue,
    getTextForUI,
    randomInterval,
    setStoredValue
} from '../Helper/index';
import { gotoPage } from '../Service/index';
import { fillHHPopUp, isJSON, logHHAuto, maskHHPopUp } from '../Utils/index';
import { HHAuto_inputPattern, HHStoredVarPrefixKey } from '../config/index';
import { HaremGirl } from "./harem/HaremGirl";


export class Harem {
    static filterGirlMapCanUpgrade(a)
    {
        return a.gData.can_upgrade;
    }

    static clearHaremToolVariables()
    {
        // logHHAuto('clearHaremToolVariables');
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlEnd");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlPayLast");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlLimit");
    }

    static getGirlMapSorted(inSortType = "DateAcquired",inSortReversed = true )
    {
        let girlsMap = getHHVars('GirlSalaryManager.girlsMap');
        if (girlsMap !== null)
        {

            girlsMap = Object.values(girlsMap);
            if (girlsMap.length > 0)
            {
                //console.log(inSortType);
                if (getHHScriptVars("haremSortingFunctions").hasOwnProperty(inSortType))
                {
                    girlsMap.sort(getHHScriptVars("haremSortingFunctions")[inSortType]);
                }
                else
                {
                    logHHAuto("Unknown sorting function, returning Girls Map sorted by date acquired.");
                    girlsMap.sort(getHHScriptVars("haremSortingFunctions").DateAcquired);
                }
            }
            if (inSortReversed)
            {
                girlsMap.reverse();
            }
            /*for(let i=0;i<5;i++)
                console.log(girlsMap[i].gData.name, getGirlUpgradeCost(girlsMap[i].gData.rarity, girlsMap[i].gData.graded + 1));*/
        }
        return girlsMap;
    }

    
    static getGirlsList() {
        let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
        const isGirlMap = girlsDataList!==null;
        if (!isGirlMap) { girlsDataList = getHHVars("girlsDataList"); }

        let keys = Object.keys(girlsDataList);

        var girlList = new Map()
        for (let j = 0, l = keys.length; j < l; j++){
            let key = parseInt(keys[j], 10);
            let girlData = {gId: key, shards: 100}
            girlList.set(key, girlData);
        }
        return girlList;
    }
    
    static selectNextUpgradableGirl()
    {
        const HaremSortMenuSortSelector = <HTMLSelectElement>document.getElementById("HaremSortMenuSortSelector");
        const HaremSortMenuSortReverse = <HTMLInputElement>document.getElementById("HaremSortMenuSortReverse");
        const selectedSortFunction = HaremSortMenuSortSelector.options[HaremSortMenuSortSelector.selectedIndex].value;
        const isReverseChecked = HaremSortMenuSortReverse.checked;
        setStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
        const girlsMap = Harem.getGirlMapSorted(selectedSortFunction,isReverseChecked);
        if (girlsMap === null )
            return;
        const currentSelectedGirlIndex = girlsMap.findIndex((element) => element.gId === $('#harem_left .girls_list div.opened[girl]').attr('girl'))+1;
        const upgradableGirls = girlsMap.slice(currentSelectedGirlIndex).filter(Harem.filterGirlMapCanUpgrade)
        if (upgradableGirls.length > 0)
        {
            gotoPage(`/harem/${upgradableGirls[0].gId}`);
            logHHAuto("Going to : "+upgradableGirls[0].gData.name);
        }
        else
        {
            logHHAuto("No upgradble girls.");
        }
    }
    
    static popUpHaremSort()
    {
        const menuID = "haremNextUpgradableGirl";
        let HaremSortMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
        +    '<p id="HaremSortMenuSortText">'+getTextForUI("HaremSortMenuSortText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row;align-items: center;">'
        +     '<div style="padding:10px"><select id="HaremSortMenuSortSelector"></select></div>'
        +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
        +      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
        +      '<div><input id="HaremSortMenuSortReverse" type="checkbox"></div>'
        +     '</div>'
        +    '</div>'
        +    '<div style="display:flex;flex-direction:row;align-items:center;">'
        +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
        //+      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
        //+      '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
        +     '</div>'
        +     '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">'+getTextForUI("Launch","elementText")+'</label></div>'
        +    '</div>'
        +  '</div>'
        fillHHPopUp("HaremSortMenu",getTextForUI(menuID,"elementText"), HaremSortMenu);

        $("#HaremSortMenuLaunch").on("click", Harem.selectNextUpgradableGirl);
        const selectorOptions = <HTMLSelectElement>document.getElementById("HaremSortMenuSortSelector");
        const HaremSortMenuSortReverse = <HTMLInputElement>document.getElementById("HaremSortMenuSortReverse");

        const storedDefaultSort = (getStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort")))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

        for (let sortFunction of Object.keys(getHHScriptVars("haremSortingFunctions")))
        {
            let optionElement = document.createElement("option");
            optionElement.value = sortFunction;
            optionElement.text = getTextForUI("HaremSortMenuSortBy","elementText") + getTextForUI(sortFunction,"elementText");
            if ( storedDefaultSort.sortFunction === sortFunction)
            {
                optionElement.selected = true;
            }
            selectorOptions.add(optionElement);
        }

        HaremSortMenuSortReverse.checked = storedDefaultSort.reverse;
    }

    static moduleHaremNextUpgradableGirl()
    {
        const menuID = "haremNextUpgradableGirl";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null)
        {
            $("#contains_all section").prepend(menuHidden);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), Harem.popUpHaremSort);
        }
        else
        {
            return;
        }
    }

    static haremOpenFirstXUpgradable()
    {
        const menuID = "haremOpenFirstXUpgradable";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null)
        {
            var upgradableGirlz:any[] = [];
            var nextUpgradable = 0;
            var openedGirlz = 0;
            var maxOpenedGirlz:any;
            $("#contains_all section").prepend(menuHidden);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), popUpHaremSort);
        }
        else
        {
            return;
        }
        function popUpHaremSort()
        {
            let HaremSortMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
            +    '<p id="HaremSortMenuSortText">'+getTextForUI("HaremSortMenuSortText","elementText")+'</p>'
            +    '<div style="display:flex;flex-direction:row;align-items: center;">'
            +     '<div style="padding:10px"><select id="HaremSortMenuSortSelector"></select></div>'
            +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
            +      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
            +      '<div><input id="HaremSortMenuSortReverse" type="checkbox"></div>'
            +     '</div>'
            +    '</div>'
            +    '<div style="display:flex;flex-direction:row;align-items:center;">'
            +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
            //+      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
            +      '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
            +     '</div>'
            +     '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">'+getTextForUI("Launch","elementText")+'</label></div>'
            +    '</div>'
            +  '</div>'
            fillHHPopUp("HaremSortMenu",getTextForUI(menuID,"elementText"), HaremSortMenu);

            $("#HaremSortMenuLaunch").on("click", prepareUpgradable);
            const selectorOptions = <HTMLSelectElement>document.getElementById("HaremSortMenuSortSelector");
            const storedDefaultSort = (getStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort")))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

            for (let sortFunction of Object.keys(getHHScriptVars("haremSortingFunctions")))
            {
                let optionElement = document.createElement("option");
                optionElement.value = sortFunction;
                optionElement.text = getTextForUI("HaremSortMenuSortBy","elementText") + getTextForUI(sortFunction,"elementText");
                if ( storedDefaultSort.sortFunction === sortFunction)
                {
                    optionElement.selected = true;
                }
                selectorOptions.add(optionElement);
            }
        }
        function prepareUpgradable()
        {
            const HaremSortMenuSortSelector = <HTMLSelectElement>document.getElementById("HaremSortMenuSortSelector");
            const HaremSortMenuSortReverse = <HTMLInputElement>document.getElementById("HaremSortMenuSortReverse");
            const HaremSortMenuSortNumber = <HTMLInputElement>document.getElementById("HaremSortMenuSortNumber");
            const selectedSortFunction = HaremSortMenuSortSelector.options[HaremSortMenuSortSelector.selectedIndex].value;
            const isReverseChecked = HaremSortMenuSortReverse.checked;
            setStoredValue(HHStoredVarPrefixKey+"Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
            const girlsMap = Harem.getGirlMapSorted(selectedSortFunction,isReverseChecked);
            if (girlsMap === null )
                return;
            openedGirlz = 0;
            maxOpenedGirlz = Number(HaremSortMenuSortNumber.value);
            upgradableGirlz = girlsMap.filter(Harem.filterGirlMapCanUpgrade);
            //console.log(maxOpenedGirlz);
            if (upgradableGirlz.length > 0)
            {
                haremOpenGirlUpgrade();
            }
        }
        function haremOpenGirlUpgrade(first = true)
        {
            if (nextUpgradable<upgradableGirlz.length && openedGirlz < maxOpenedGirlz)
            {
                const girlzQuests = getHHVars('girl_quests');
                if (girlzQuests !== null)
                {
                    let upgradeURL = girlzQuests[upgradableGirlz[nextUpgradable].gId].for_upgrade.url;
                    //console.log(upgradeButton.length);
                    if (upgradeURL.length === 0 )
                    {
                        if (first)
                        {
                            setTimeout(function() { haremOpenGirlUpgrade(false);},1000);
                        }
                        else
                        {
                            nextUpgradable++;
                            haremOpenGirlUpgrade();
                        }
                    }
                    else
                    {
                        //console.log(upgradeButton[0].getAttribute("href"));
                        //upgradeButton[0].setAttribute("target","_blank");
                        //console.log(upgradeButton[0]);
                        //upgradeButton[0].click();
                        GM.openInTab(window.location.protocol+"//"+window.location.hostname+upgradeURL, true);
                        nextUpgradable++;
                        openedGirlz++;
                        haremOpenGirlUpgrade();
                    }
                }
                else
                {
                    logHHAuto("Unable to find girl_quest array.");
                }
            }
        }

    }

    static moduleHaremExportGirlsData()
    {
        const menuID = "ExportGirlsData";
        let ExportGirlsData = `<div style="position: absolute;left: 36%;top: 20px;width:60px;z-index:10" class="tooltipHH" id="${menuID}"><span class="tooltipHHtext">${getTextForUI("ExportGirlsData","tooltip")}</span><label style="font-size:small" class="myButton" id="ExportGirlsDataButton">${getTextForUI("ExportGirlsData","elementText")}</label></div>`;
        if (document.getElementById(menuID) === null)
        {
            $("#contains_all section").prepend(ExportGirlsData);
            $("#ExportGirlsDataButton").on("click", saveHHGirlsAsCSV);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), saveHHGirlsAsCSV);
        }
        else
        {
            return;
        }


        function saveHHGirlsAsCSV() {
            var dataToSave="";
            dataToSave = extractHHGirls();
            var name='HH_GirlData_'+Date.now()+'.csv';
            const a = document.createElement('a')
            a.download = name
            a.href = URL.createObjectURL(new Blob([dataToSave], {type: 'text/plain'}))
            a.click()
        }

        function extractHHGirls()
        {
            var dataToSave = "Name,Rarity,Class,Figure,Level,Stars,Of,Left,Hardcore,Charm,Know-how,Total,Position,Eyes,Hair,Zodiac,Own,Element\r\n";
            var gMap = getHHVars('GirlSalaryManager.girlsMap');
            if(gMap === null)
            {
                // error
                logHHAuto("Girls Map was undefined...! Error, cannot export girls.");
            }
            else
            {
                try{
                    var cnt = 1;
                    for(var key in gMap)
                    {
                        cnt++;
                        var gData = gMap[key].gData;
                        dataToSave += gData.name + ",";
                        dataToSave += gData.rarity + ",";
                        dataToSave += gData.class + ",";
                        dataToSave += gData.figure + ",";
                        dataToSave += gData.level + ",";
                        dataToSave += gData.graded + ",";
                        dataToSave += gData.nb_grades + ",";
                        dataToSave += Number(gData.nb_grades)-Number(gData.graded) + ",";
                        dataToSave += gData.caracs.carac1 + ",";
                        dataToSave += gData.caracs.carac2 + ",";
                        dataToSave += gData.caracs.carac3 + ",";
                        dataToSave += Number(gData.caracs.carac1)+Number(gData.caracs.carac2)+Number(gData.caracs.carac3) + ",";
                        dataToSave += gData.position_img + ",";
                        dataToSave += stripSpan(gData.ref.eyes) + ",";
                        dataToSave += stripSpan(gData.ref.hair) + ",";
                        dataToSave += gData.ref.zodiac.substring(3) + ",";
                        dataToSave += gData.own + ",";
                        dataToSave += gData.element + "\r\n";

                    }
                    //            logHHAuto(dataToSave);

                }
                catch(exp){
                    // error
                    logHHAuto("Catched error : Girls Map had undefined property...! Error, cannot export girls : "+exp);
                }
            }
            return dataToSave;
        }

        function stripSpan(tmpStr)
        {
            var newStr = "";
            while(tmpStr.indexOf(">") > -1)
            {
                tmpStr = tmpStr.substring(tmpStr.indexOf(">") + 1);
                newStr += tmpStr.slice(0, tmpStr.indexOf("<"));
                //        tmpStr = tmpStr.substring(tmpStr.indexOf(">")+1);
            }
            return newStr;
        }
    }

    static getFilteredGirlList() {
        // Store girls for harem tools
        let filteredGirlsList:string[] = [];

        if (unsafeWindow.harem.filteredGirlsList.length > 0) {
            unsafeWindow.harem.filteredGirlsList.forEach((girl) => {
                if (girl.shards >= 100) filteredGirlsList.push(""+girl.id_girl);
            });
        }
        else if (unsafeWindow.harem.filteredGirlsList.length == 0 && unsafeWindow.harem.preselectedGirlId != null) {
            unsafeWindow.harem.girlsBeforeSelected.forEach((girl) => {
                if (girl.shards >= 100) filteredGirlsList.push(""+girl.id_girl);
            });
            filteredGirlsList.push(unsafeWindow.harem.preselectedGirlId);
            unsafeWindow.harem.girlsAfterSelected.forEach((girl) => {
                if (girl.shards >= 100) filteredGirlsList.push(""+girl.id_girl);
            });
        }
        return filteredGirlsList;
    };

    static moduleHarem()
    {
        const menuIDXp = "haremGiveXP";
        const menuIDGifts = "haremGiveGifts";

        let menuHidden = `<div style="visibility:hidden" id="${menuIDXp}"></div>`;
        if (document.getElementById(menuIDXp) === null)
        {
            // Avoid looping on add menu item
            $("#contains_all section").prepend(menuHidden);

            var giveHaremXp = function() { Harem.fillCurrentGirlItem('experience');};
            var giveHaremGifts = function() { Harem.fillCurrentGirlItem('affection');};

            GM_registerMenuCommand(getTextForUI(menuIDXp,"elementText"), giveHaremXp);
            GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);
        }

        Harem.addGoToGirlPageButton();
        Harem.addGirlListMenu();
    }

    static fillCurrentGirlItem(haremItem, payLast=false){
        let filteredGirlsList = Harem.getFilteredGirlList();
        const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId

        if (filteredGirlsList && filteredGirlsList.length > 0) {
            let girlToGoTo = filteredGirlsList[0];
            if(displayedGirl && filteredGirlsList.indexOf(""+displayedGirl) >=0) {
                girlToGoTo = displayedGirl;
            }
            logHHAuto("Go to " + girlToGoTo);
            gotoPage('/girl/'+girlToGoTo,{resource:haremItem});
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
        }
        setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlActions", haremItem);
        setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlMode", 'list');
        if (payLast) setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlPayLast", 'true');
        setStoredValue(HHStoredVarPrefixKey+"Temp_filteredGirlsList", JSON.stringify(filteredGirlsList));
    };

    static addGoToGirlPageButton(){
        const goToGirlPageButtonId = 'goToGirlPage';
        if($('#'+goToGirlPageButtonId).length > 0) return;

        const displayedGirl = $('#harem_right .opened').attr('girl') || ''; // unsafeWindow.harem.preselectedGirlId
        const girlOwned = !(getHHVars('girlsDataList',false) != null && getHHVars('girlsDataList',false)[displayedGirl].shards < 100);

        GM_addStyle('#harem_right>div[girl] .middle_part div.avatar-box img.avatar { height: 365px; margin-bottom: 30px;}');
        GM_addStyle('#harem_right>div[girl] .middle_part div.avatar-box canvas.animated-girl-display { height: 59rem; top: -18rem;}');
        GM_addStyle('.goToGirlPage {position: relative; bottom: 46px; font-size: small; z-index:30;}');

        // using a for new tab option
        const goToGirlPageButton = '<div class="tooltipHH goToGirlPage"><span class="tooltipHHtext">'+getTextForUI("goToGirlPage","tooltip")+'</span><a href="/girl/'+displayedGirl+'?resource=experience" class="myButton" id="'+goToGirlPageButtonId+'">'+getTextForUI("goToGirlPage","elementText")+'</a></div>';
        var goToGirl = function(){
            const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId
            gotoPage('/girl/'+displayedGirl,{resource:'experience'});
        };
        $('#harem_right .middle_part').append(goToGirlPageButton);

        if(girlOwned) {
            GM_registerMenuCommand(getTextForUI('goToGirlPage',"elementText"), goToGirl);
        } else {
            $('#'+goToGirlPageButtonId).hide();
        }
    }

    static addGirlListMenu(){
        const girlListMenuButtonId = 'girlListMenu';
        if($('#'+girlListMenuButtonId).length > 0) return;

        var createMenuButton = function(menuId, disabled=false){
            return '<div class="tooltipHH">'
            +    '<span class="tooltipHHtext">'+getTextForUI(menuId,"tooltip")+'</span>'
            +    '<label style="font-size: initial;" class="myButton" '+(disabled?'disabled="disabled"':'')+' id="'+menuId+'Button">'+getTextForUI(menuId,"elementText")
            +'</label></div>';
        }
        
        const girlListMenuButton = '<div style="position: absolute;left: 250px;top: 50px; font-size: small; z-index:30;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("girlListMenu","tooltip")+'</span><label class="myButton" id="'+girlListMenuButtonId+'">+</label></div>';
        var openGirlMenu = function(){

            
            const menuIDXp = "haremGiveXP";
            const menuIDGifts = "haremGiveGifts";
            const menuIDMaxGifts = "haremGiveMaxGifts";
            const menuIDUpgradeMax = "haremUpgradeMax";
            const menuNextUpgrad = "haremNextUpgradableGirl";

            const menuIDXpButton = createMenuButton(menuIDXp);
            const menuIDGiftsButton = createMenuButton(menuIDGifts);
            const menuIDMaxGiftsButton = createMenuButton(menuIDMaxGifts);
            const menuIDUpgradeMaxButton = createMenuButton(menuIDUpgradeMax);
            const menuNextUpgradButton = createMenuButton(menuNextUpgrad);
            const imgPath = getHHScriptVars("baseImgPath");

            
            const girlListMenu = '<div style="padding:50px; display:flex;flex-direction:column;width:400px">'
            // +    '<p id="HaremGirlListMenuText">'+getTextForUI("girlListMenu","elementText")+'</p>'
            +    '<div class="optionsBoxWithTitle">'
            +       '<div class="optionsBoxTitle"><img class="iconImg" src="'+imgPath+'/design/ic_books_gray.svg"><span class="optionsBoxTitle">'+getTextForUI("experience","elementText")+'</span></div>'
            +       '<div class="optionsBox">'
            +         '<div style="padding:10px">'+menuIDXpButton+'</div>'
            +       '</div>'
            +    '</div>'
            +    '<div class="optionsBoxWithTitle">'
            +       '<div class="optionsBoxTitle"><img class="iconImg" src="'+imgPath+'/design/ic_gifts_gray.svg"><span class="optionsBoxTitle">'+getTextForUI("affection","elementText")+'</span></div>'
            +       '<div class="optionsBox">'
            +         '<div style="padding:10px">'+menuIDGiftsButton+'</div>'
            +         '<div style="padding:10px">'+menuIDMaxGiftsButton+'</div>'
            +         '<div style="padding:10px">'+menuIDUpgradeMaxButton+'</div>'
            +       '</div>'
            +    '</div>'
            +    '<div class="optionsBoxWithTitle">'
            +       '<div class="optionsBoxTitle"><img class="iconImg" src="'+imgPath+'/design_v2/affstar_upgrade.png"><span class="optionsBoxTitle">'+getTextForUI("upradable","elementText")+'</span></div>'
            +       '<div class="optionsBox">'
            +         '<div style="padding:10px">'+menuNextUpgradButton+'</div>'
            +       '</div>'
            +    '</div>'
            +  '</div>';
            fillHHPopUp("GirlListMenu",getTextForUI("girlListMenu","elementText"), girlListMenu);
            $('#'+menuIDXp+'Button').on("click", function() { Harem.fillCurrentGirlItem('experience');});
            $('#'+menuIDGifts+'Button').on("click", function() { Harem.fillCurrentGirlItem('affection');});
            $('#'+menuIDMaxGifts+'Button').on("click", function() {
                setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlEnd", 'true');
                Harem.fillCurrentGirlItem('affection');
            });
            $('#'+menuIDUpgradeMax+'Button').on("click", function() {
                setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlEnd", 'true');
                Harem.fillCurrentGirlItem('affection', true);
            });
            $('#'+menuNextUpgrad+'Button').on("click", function() { 
                maskHHPopUp();
                Harem.popUpHaremSort();
            });
        };
        $('#harem_left').append(girlListMenuButton);

        GM_registerMenuCommand(getTextForUI('girlListMenu',"elementText"), openGirlMenu);
        $('#'+girlListMenuButtonId).on("click", openGirlMenu);
    }
   
    static HaremSizeNeedsRefresh(inCustomExpi)
    {
        return ! isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")) || JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count_date < (new Date().getTime() - inCustomExpi * 1000);
    }

    static moduleHaremCountMax()
    {
        if (Harem.HaremSizeNeedsRefresh(getHHScriptVars("HaremMinSizeExpirationSecs")) && getHHVars('girlsDataList',false) !== null)
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize", JSON.stringify({count:Object.keys(getHHVars('girlsDataList',false)).length,count_date:new Date().getTime()}));
            logHHAuto("Harem size updated to : "+Object.keys(getHHVars('girlsDataList',false)).length);
        }
    }

    static getGirlUpgradeCost(inRarity, inTargetGrade)
    {
        const rarity = ["starting", "common", "rare", "epic", "legendary", "mythic"];
        const rarityFactors = [1, 2, 6, 14, 20, 50];
        const gradeFactors = [1, 2.5, 2.5, 2, 2, 2];
        const cost11 = 36000;
        let calculatedCosts = {};
        for (let i = 0;i <rarity.length; i++)
        {
            let currentRarityCosts = {};
            for (let j = 0;j < 6;j++)
            {
                let currentCost;
                if (i === 0 && j === 0)
                {
                    //console.log("init 1");
                    currentCost = cost11;
                }
                else if ( j === 0 )
                {
                    //console.log("init -1");
                    currentCost = calculatedCosts[rarity[0]][0]*rarityFactors[i];
                }
                else
                {
                    //console.log("-1");
                    currentCost = currentRarityCosts[j-1]*gradeFactors[j];
                }

                currentRarityCosts[j] = currentCost;
            }
            //console.log(current);
            calculatedCosts[rarity[i]] = currentRarityCosts;
        }
        return calculatedCosts[inRarity][inTargetGrade];
    }
}