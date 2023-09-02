import { 
    deleteStoredValue,
    getHHScriptVars,
    getHHVars,
    getStoredValue,
    getTextForUI,
    randomInterval,
    setStoredValue
} from "../Helper";
import { gotoPage } from "../Service";
import { fillHHPopUp, isJSON, logHHAuto, maskHHPopUp } from "../Utils";
import { HHAuto_inputPattern } from "../config";


export class Harem {
    static filterGirlMapReadyForCollect(a)
    {
        return a.readyForCollect;
    }

    static filterGirlMapCanUpgrade(a)
    {
        return a.gData.can_upgrade;
    }

    static clearHaremToolVariables()
    {
        deleteStoredValue("HHAuto_Temp_haremGirlActions");
        deleteStoredValue("HHAuto_Temp_haremGirlMode");
        deleteStoredValue("HHAuto_Temp_haremGirlLimit");
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

    static moduleHaremNextUpgradableGirl()
    {
        const menuID = "haremNextUpgradableGirl";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null)
        {
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
            //+      '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
            +     '</div>'
            +     '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">'+getTextForUI("Launch","elementText")+'</label></div>'
            +    '</div>'
            +  '</div>'
            fillHHPopUp("HaremSortMenu",getTextForUI(menuID,"elementText"), HaremSortMenu);

            document.getElementById("HaremSortMenuLaunch").addEventListener("click", selectNextUpgradableGirl);
            let selectorOptions = document.getElementById("HaremSortMenuSortSelector");

            const storedDefaultSort = (getStoredValue("HHAuto_Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")))?JSON.parse(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

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

            document.getElementById("HaremSortMenuSortReverse").checked = storedDefaultSort.reverse;
        }
        function selectNextUpgradableGirl()
        {
            const selectedSortFunction = document.getElementById("HaremSortMenuSortSelector").options[document.getElementById("HaremSortMenuSortSelector").selectedIndex].value;
            const isReverseChecked = document.getElementById("HaremSortMenuSortReverse").checked;
            setStoredValue("HHAuto_Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
            const girlsMap = Harem.getGirlMapSorted(selectedSortFunction,isReverseChecked);
            if (girlsMap === null )
                return;
            const currentSelectedGirlIndex = girlsMap.findIndex((element) => element.gId === $('#harem_left .girls_list div.opened[girl]').attr('girl'))+1;
            const upgradableGirls = girlsMap.slice(currentSelectedGirlIndex).filter(filterGirlMapCanUpgrade)
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
    }

    static haremOpenFirstXUpgradable()
    {
        const menuID = "haremOpenFirstXUpgradable";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null)
        {
            var upgradableGirlz = [];
            var nextUpgradable = 0;
            var openedGirlz = 0;
            var maxOpenedGirlz;
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

            document.getElementById("HaremSortMenuLaunch").addEventListener("click", prepareUpgradable);
            let selectorOptions = document.getElementById("HaremSortMenuSortSelector");
            const storedDefaultSort = (getStoredValue("HHAuto_Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")))?JSON.parse(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

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
            const selectedSortFunction = document.getElementById("HaremSortMenuSortSelector").options[document.getElementById("HaremSortMenuSortSelector").selectedIndex].value;
            const isReverseChecked = document.getElementById("HaremSortMenuSortReverse").checked;
            setStoredValue("HHAuto_Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
            const girlsMap = Harem.getGirlMapSorted(selectedSortFunction,isReverseChecked);
            if (girlsMap === null )
                return;
            openedGirlz = 0;
            maxOpenedGirlz = Number(document.getElementById("HaremSortMenuSortNumber").value);
            upgradableGirlz = girlsMap.filter(filterGirlMapCanUpgrade);
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
            document.getElementById("ExportGirlsDataButton").addEventListener("click", saveHHGirlsAsCSV);
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
            dataToSave = "Name,Rarity,Class,Figure,Level,Stars,Of,Left,Hardcore,Charm,Know-how,Total,Position,Eyes,Hair,Zodiac,Own\r\n";
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
                        dataToSave += gData.own + "\r\n";

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

        
    static moduleHarem()
    {
        var getFilteredGirlList = function() {
            // Store girls for harem tools
            let filteredGirlsList = [];

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

        const menuIDXp = "haremGiveXP";
        const menuIDGifts = "haremGiveGifts";

        let menuHidden = `<div style="visibility:hidden" id="${menuIDXp}"></div>`;
        if (document.getElementById(menuIDXp) === null)
        {
            // Avoid looping on add menu item
            $("#contains_all section").prepend(menuHidden);

            var giveHaremItem = function(haremItem){
                let filteredGirlsList = getFilteredGirlList();
                const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId

                if (filteredGirlsList && filteredGirlsList.length > 0) {
                    let girlToGoTo = filteredGirlsList[0];
                    if(displayedGirl && filteredGirlsList.indexOf(""+displayedGirl) >=0) {
                        girlToGoTo = displayedGirl;
                    }
                    logHHAuto("Go to " + girlToGoTo);
                    gotoPage('/girl/'+girlToGoTo,{resource:haremItem});
                    setStoredValue("HHAuto_Temp_autoLoop", "false");
                    logHHAuto("setting autoloop to false");
                }
                setStoredValue("HHAuto_Temp_haremGirlActions", haremItem);
                setStoredValue("HHAuto_Temp_haremGirlMode", 'list');
                setStoredValue("HHAuto_Temp_filteredGirlsList", JSON.stringify(filteredGirlsList));
            };

            var giveHaremXp = function() {giveHaremItem('experience');};
            var giveHaremGifts = function() {giveHaremItem('affection');};

            GM_registerMenuCommand(getTextForUI(menuIDXp,"elementText"), giveHaremXp);
            GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);
        }
    }

    static HaremDisplayGirlPopup(haremItem,haremText,remainingTime)
    {
        $(".girl-leveler-panel .girl-section").prepend('<div id="popup_message_harem" class="HHpopup_message" name="popup_message_harem" style="" ><a id="popup_message_harem_close" class="close">&times;</a>'
                        +getTextForUI("give"+haremItem,"elementText")+' : <br>'+haremText+' ('+remainingTime+'sec)</div>');
        document.getElementById("popup_message_harem_close").addEventListener("click", function() {
            Harem.clearHaremToolVariables();
            location.reload();
        });
    }
    static HaremClearGirlPopup()
    {
        $("#popup_message_harem").each(function(){this.remove();});
    }

    HaremUpdateGirlPopup(haremItem,haremText,remainingTime)
    {
        Harem.HaremClearGirlPopup();
        Harem.HaremDisplayGirlPopup(haremItem,haremText,remainingTime);
    }

    static moduleHaremGirl()
    {
        var confirmMaxOut = function(){
            const confirmMaxOutButton = $('#girl_max_out_popup button.blue_button_L:not([disabled]):visible[confirm_callback]');
            if(confirmMaxOutButton.length > 0) {
                confirmMaxOutButton.click();
            } else logHHAuto('Confirm max out button not found');
        };
        var maxOutButtonAndConfirm = function(haremItem, girl) {
            const maxOutButton = $('#girl-leveler-max-out-'+haremItem+':not([disabled])');
            if(maxOutButton.length > 0) {
                logHHAuto('Max out ' + haremItem + ' for girl ' + girl.id_girl);
                maxOutButton.click();
                setTimeout(confirmMaxOut, randomInterval(700,1100));
                return true;
            } else {
                logHHAuto('Max out button for' + haremItem + ' for girl ' + girl.id_girl + ' not enabled');
                return false;
            }
        };
        var confirmAwake = function(){
            const confAwakButton = $('#awakening_popup button.awaken-btn:not([disabled]):visible');
            if(confAwakButton.length > 0) {
                confAwakButton.click(); // Page will be refreshed
                return true;
            } else {
                logHHAuto('Confirmation awake button is not enabled');
                Harem.clearHaremToolVariables();
                // TODO Do not clear in list mode
                return false;
            }
        };
        var awakGirl = function(girl) {
            const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
            const canXpGirl = numberOfGem >= girl.awakening_costs;
            const awakButton = $('#awaken:not([disabled])');
            if(awakButton.length > 0 && canXpGirl) {
                logHHAuto('Awake for girl ' + girl.id_girl);
                awakButton.click();
                setTimeout(confirmAwake, randomInterval(500,1000)); // Page will be refreshed if done
                return true;
            } else {
                logHHAuto('Awake button for girl ' + girl.id_girl + ' not enabled or not enough gems (' + numberOfGem +'<'+ girl.awakening_costs + ')');
                return false;
            }
        };

        var maxOutAndAwake = function(haremItem, selectedGirl){
            maxOutButtonAndConfirm(haremItem, selectedGirl);
            setTimeout(function() {
                awakGirl(selectedGirl);
            }, randomInterval(1500,2500));
        }

        const haremItem = getStoredValue("HHAuto_Temp_haremGirlActions");
        const haremGirlMode = getStoredValue("HHAuto_Temp_haremGirlMode");
        const haremGirlLimit = getStoredValue("HHAuto_Temp_haremGirlLimit");

        const menuID = "menuExp";
        const menuExp = '<div style="position: absolute;right: 50px;top: -10px; font-size: small;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExp","tooltip")+'</span><label style="width:100px" class="myButton" id="menuExp">'+getTextForUI("menuExp","elementText")+'</label></div>'
        const menuExpContent = '<div style="width:600px;justify-content: space-between;align-items: flex-start;"class="HHMenuRow">'
        +   '<div id="menuExp-moveLeft"></div>'
        +   '<div style="padding:10px; display:flex;flex-direction:column;">'
        +    '<p style="min-height:10vh;" id="menuExpText"></p>'
        +    '<div class="HHMenuRow">'
        +     '<p>'+getTextForUI("menuExpLevel","elementText")+'</p>'
        +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExpLevel","tooltip")+'</span><input id="menuExpLevel" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="'+getHHVars('Hero.infos.level')+'"></div>'
        +    '</div>'
        +    '<input id="menuExpMode" type="hidden" value="">'
        +    '<div style="padding:10px;justify-content:center" class="HHMenuRow">'
        +     '<div id="menuExpHide">'
        +      '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExpButton","tooltip")+'</span><label style="width:80px" class="myButton" id="menuExpButton">'+getTextForUI("menuExpButton","elementText")+'</label></div>'
        +     '</div>'
        +    '</div>'
        +   '</div>'
        +   '<div id="menuExp-moveRight"></div>'
        +  '</div>';

        try {
            const girl = unsafeWindow.girl;
            const numberOfGem =unsafeWindow.player_gems_amount[girl.element].amount;
            const canAwakeGirl = numberOfGem >= girl.awakening_costs;
            const canGiftGirl = girl.nb_grades > girl.graded;
            //logHHAuto("moduleHaremGirl: " + girl.id_girl);
            logHHAuto("Current level : " + girl.level + ', max level without gems : ' + girl.level_cap);
            logHHAuto("Number of gem needed in next awakening : " + girl.awakening_costs +" / Gem in stock : " + numberOfGem);
            logHHAuto("Girl grade : " + girl.graded + '/' + girl.nb_grades);

            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";

            var giveHaremGirlItem = function(haremItem){
                const selectedGirl = unsafeWindow.girl;
                $('#girl-leveler-tabs .switch-tab[data-tab="'+haremItem+'"]').click();
                const userHaremGirlLimit = Math.min(Number(document.getElementById("menuExpLevel").value), 750);

                if((Number(selectedGirl.level) + 50) <= Number(userHaremGirlLimit)) {
                    Harem.HaremDisplayGirlPopup(haremItem, selectedGirl.name + ' '+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"/"+userHaremGirlLimit, (1)*5 );

                    setStoredValue("HHAuto_Temp_haremGirlActions", haremItem);
                    setStoredValue("HHAuto_Temp_haremGirlMode", 'girl');
                    setStoredValue("HHAuto_Temp_haremGirlLimit", userHaremGirlLimit);

                    if((Number(selectedGirl.level) + 50) >= Number(userHaremGirlLimit)) {
                        maxOutButtonAndConfirm(haremItem, selectedGirl);
                        Harem.HaremClearGirlPopup();
                    }
                    else
                        maxOutAndAwake(haremItem, selectedGirl);
                } else{
                    if(Number(selectedGirl.level) >= Number(userHaremGirlLimit))
                        logHHAuto("Girl already above target, ignoring action");
                    else
                        logHHAuto("Girl and max out will be above target, ignoring action");
                }
            };

            var KeyUpExp = function(evt)
            {
                if (evt.key === 'Enter')
                {
                    maskHHPopUp();
                    giveHaremGirlItem(document.getElementById("menuExpMode").value);
                }
            }

            var displayExpMenu = function(haremItem){
                const selectedGirl = unsafeWindow.girl;

                fillHHPopUp(menuID,getTextForUI("menuExp","elementText"),menuExpContent);
                displayHHPopUp();
                document.getElementById("menuExpText").innerHTML = selectedGirl.name+" "+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"<br>"+getTextForUI("menuExpInfo","elementText")+"<br>";
                document.getElementById("menuExpMode").value = haremItem;

                document.removeEventListener('keyup', KeyUpExp, false);
                document.addEventListener('keyup', KeyUpExp, false);

                document.getElementById("menuExpButton").addEventListener("click", function()
                {
                    maskHHPopUp();
                    giveHaremGirlItem(haremItem);
                });
            }

            var giveHaremXp = function() {displayExpMenu('experience');};
            var giveHaremGifts = function() {displayExpMenu('affection');};

            if(canAwakeGirl)
                GM_registerMenuCommand(getTextForUI(menuIDXp,"elementText"), giveHaremXp);
            //if(canGiftGirl) // Not supported yet
            //   GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);

        } catch (error) {
            logHHAuto("ERROR: Can't perform action ");
            console.error(error);
        }

        try {
            const girl = unsafeWindow.girl;
            logHHAuto("moduleHaremGirl: " + girl.name + '(' + girl.id_girl + ')');
            if(!haremItem) {
                // No action to be peformed
                return;
            }
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false as action to be performed on girl");

            if(haremGirlMode === 'girl' && haremGirlLimit && (Number(girl.level) + 50) <= Number(haremGirlLimit))
            {
                logHHAuto("haremGirlMode: " + haremGirlMode);
                logHHAuto("haremGirlLimit: " + haremGirlLimit);
                Harem.HaremDisplayGirlPopup(haremItem, girl.name + ' '+girl.Xp.cur+"xp, level "+girl.level+"/"+haremGirlLimit, (1)*5 );
                if((Number(girl.level) + 50) >= Number(haremGirlLimit)) {
                    maxOutButtonAndConfirm(haremItem, girl);
                    Harem.HaremClearGirlPopup();

                    Harem.clearHaremToolVariables(); // TODO to make it mode list, do not clear ^^
                }
                else
                    maxOutAndAwake(haremItem, girl);
            }
            else if(haremGirlMode === 'list')
            {
                logHHAuto("Action to be performed : give " + haremItem);
                let nextGirlId = -1;
                let girlPosInList = 0;
                let remainingGirls = 0;
                let girlListProgress = '<br />' + getTextForUI("giveLastGirl","elementText");


                let filteredGirlsList = getStoredValue("HHAuto_Temp_filteredGirlsList")?JSON.parse(getStoredValue("HHAuto_Temp_filteredGirlsList")):[];
                logHHAuto("filteredGirlsList", filteredGirlsList);
                if (filteredGirlsList && filteredGirlsList.length > 0) {
                    girlPosInList = filteredGirlsList.indexOf(""+girl.id_girl);
                    if (girlPosInList >=0 && filteredGirlsList.length > (girlPosInList+1)) {
                        remainingGirls = filteredGirlsList.length - girlPosInList - 1;
                        nextGirlId = filteredGirlsList[girlPosInList+1];
                        girlListProgress = (girlPosInList+1) + '/' + filteredGirlsList.length;
                    } else {
                        logHHAuto("No more girls");
                    }
                } else {
                    logHHAuto("ERROR: no girls stored");
                }
                const canMaxOut = $('#girl-leveler-max-out-'+haremItem+':not([disabled])').length > 0;
                if (canMaxOut)
                {
                    Harem.HaremDisplayGirlPopup(haremItem, getTextForUI("giveMaxingOut","elementText")  + ' ' + girl.name + ' : '+ girlListProgress, (remainingGirls+1)*5 );
                    maxOutButtonAndConfirm(haremItem, girl);
                } else {
                    logHHAuto("Max out button not clickable or not found");
                    Harem.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + getTextForUI("giveMaxedOut","elementText")+' : '+ girlListProgress, (remainingGirls+1)*5 );
                }

                if (nextGirlId >= 0) {
                    logHHAuto('Go to next girl (' + nextGirlId + ') remaining ' + remainingGirls + ' girls');
                    gotoPage('/girl/'+nextGirlId,{resource:haremItem}, randomInterval(1500,2500));
                } else {
                    logHHAuto("Go back to harem list");
                    setStoredValue("HHAuto_Temp_autoLoop", "true");
                    gotoPage('/harem/'+girl.id_girl,{}, randomInterval(1500,2500));
                    Harem.clearHaremToolVariables();
                }
            } else {
                setStoredValue("HHAuto_Temp_autoLoop", "true");
                Harem.clearHaremToolVariables();
            }
        } catch (error) {
            logHHAuto("ERROR: Can't perform action ");
            console.error(error);
            setStoredValue("HHAuto_Temp_autoLoop", "true");
            Harem.clearHaremToolVariables();
        }
    }
        
    static HaremSizeNeedsRefresh(inCustomExpi)
    {
        return ! isJSON(getStoredValue("HHAuto_Temp_HaremSize")) || JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count_date < (new Date().getTime() - inCustomExpi * 1000);
    }

    static moduleHaremCountMax()
    {
        if (Harem.HaremSizeNeedsRefresh(getHHScriptVars("HaremMinSizeExpirationSecs")) && getHHVars('girlsDataList',false) !== null)
        {
            setStoredValue("HHAuto_Temp_HaremSize", JSON.stringify({count:Object.keys(getHHVars('girlsDataList',false)).length,count_date:new Date().getTime()}));
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