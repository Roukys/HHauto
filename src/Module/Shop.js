import {
    checkTimer,
    convertTimeToInt,
    getHHScriptVars,
    getHHVars,
    getPage,
    getStoredValue,
    getTextForUI,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { gotoPage } from "../Service";
import { isJSON, logHHAuto } from "../Utils";
import { HHAuto_inputPattern, HHStoredVarPrefixKey } from "../config";
import { Booster } from "./Booster";

export class Shop {

    static isTimeToCheckShop() {
        const updateMarket = getStoredValue(HHStoredVarPrefixKey+"Setting_updateMarket")  === "true";
        const needBoosterStatus = Booster.needBoosterStatusFromStore();
        return (updateMarket || needBoosterStatus) && ( getStoredValue(HHStoredVarPrefixKey+"Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )
    }

    static updateShop()
    {
        if(getPage() !== getHHScriptVars("pagesIDShop"))
        {
            logHHAuto("Navigating to Market window.");
            gotoPage(getHHScriptVars("pagesIDShop"));
            return true;
        }
        else {
            logHHAuto("Detected Market Screen. Fetching Assortment");
    
            var assA=[];
            var assB=[];
            var assG=[];
            var assP=[];
            $('#shops div.armor.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assA.push(JSON.parse(this.dataset.d));});
            $('#shops div.booster.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assB.push(JSON.parse(this.dataset.d));});
            $('#shops div.gift.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assG.push(JSON.parse(this.dataset.d));});
            $('#shops div.potion.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assP.push(JSON.parse(this.dataset.d));});
    
            var HaveAff=0;
            var HaveExp=0;
            var HaveBooster={};
            $('#shops div.gift.player-inventory-content .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveAff+=d.quantity*d.item.value;}});
            $('#shops div.potion.player-inventory-content .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveExp+=d.quantity*d.item.value;}});
    
            $('#shops div.booster.player-inventory-content .slot').each(function(){ if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveBooster[d.item.identifier] = d.quantity;}});
    
            setStoredValue(HHStoredVarPrefixKey+"Temp_haveAff", HaveAff);
            setStoredValue(HHStoredVarPrefixKey+"Temp_haveExp", HaveExp);
            setStoredValue(HHStoredVarPrefixKey+"Temp_haveBooster", JSON.stringify(HaveBooster));
    
            logHHAuto('counted '+getStoredValue(HHStoredVarPrefixKey+"Temp_haveAff")+' Aff, '+getStoredValue(HHStoredVarPrefixKey+"Temp_haveExp")+' Exp, Booster: ' + JSON.stringify(HaveBooster));
    
            setStoredValue(HHStoredVarPrefixKey+"Temp_storeContents", JSON.stringify([assA,assB,assG,assP]));
            setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel", getHHVars('Hero.infos.level'));
    
            var nshop;
            let shopFrozenTimer = $('.shop div.shop_count span[rel="expires"]').first().text();
            if (nshop === undefined && shopFrozenTimer.length > 0)
            {
                nshop = convertTimeToInt(shopFrozenTimer);
            }
            let shopTimer=60;
            if(nshop !== undefined && nshop !== 0)
            {
                // if (Number(nshop)+1 > 2*60*60)
                // {
                //     shopTimer=2*60*60;
                // }
                // else
                // {
                    shopTimer=Number(nshop)+1;
                // }
            }
            setTimer('nextShopTime',shopTimer + randomInterval(60,180));
            if (isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled"))
                && getPage() === JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled")).page)
            {
                gotoPage(getHHScriptVars("pagesIDHome"));
                logHHAuto("Go to Home after Shopping");
            }
        }
        return false;
    }

    static moduleShopActions()
    {
        const itemsQuery = '#player-inventory.armor .slot:not(.empty):not([menuSellLocked]):not(.mythic)';
        appendMenuSell();
    
        /**
         * @return "potion" / "gift" / player-stats / armor / booster / null
         */
        function getShopType()
        {
            const shopSelected = $('section #shops #tabs-switcher .market-menu-switch-tab.active');
            if (shopSelected.length > 0)
            {
                return shopSelected.attr("type");
            }
            else
            {
                return null;
            }
        }
    
        function menuSellListItems()
        {
            if ($('#menuSellList>.tItems').length === 0)
            {
                GM_addStyle('.tItems {border-collapse: collapse;} '
                            +'.tItems td,th {border: 1px solid #1B4F72;} '
                            +'.tItemsColGroup {border: 3px solid #1B4F72;} '
                            +'.tItemsTh1 {background-color: #2874A6;color: #fff;} '
                            +'.tItemsTh2 {background-color: #3498DB;color: #fff;} '
                            +'.tItemsTBody tr:nth-child(odd) {background-color: #85C1E9;} '
                            +'.tItemsTBody tr:nth-child(even) {background-color: #D6EAF8;} '
                            +'.tItemsTdItems[itemsLockStatus="allLocked"] {color: #FF0000} '
                            +'.tItemsTdItems[itemsLockStatus="noneLocked"] {color: #1B4F72}'
                            +'.tItemsTdItems[itemsLockStatus="someLocked"] {color: #FFA500}');
            }
    
            let itemsCaracsNb=16;
            let itemsCaracs=[];
            for (let i=1;i<itemsCaracsNb+1;i++)
            {
                itemsCaracs.push(i);
            }
            itemsCaracs.push('mythic'); // Needed for mythic equipement, can't use generic method for them
    
            let itemsRarity=["common", "rare", "epic", "legendary", "mythic"];
            let itemsLockedStatus=["not_locked","locked"];
    
            let itemsTypeNb=6;
            let itemsType=[];
            for (let i=1;i<itemsTypeNb+1;i++)
            {
                itemsType.push(i);
            }
    
            let itemsList={};
            for (let c of itemsCaracs)
            {
                let filteredCarac;
                if(c === 'mythic') {
                    filteredCarac = $('#player-inventory.armor .slot:not(.empty)[data-d*=\'"rarity":"mythic"\']');
                } else {
                    filteredCarac = $('#player-inventory.armor .slot:not(.empty)[data-d*=\'"name_add":"'+c+'"\']');
                }
    
                itemsList[c] = {};
                for (let t of itemsType)
                {
                    let filteredType = filteredCarac.filter('[data-d*=\'"subtype":"'+t+'"\']');
                    itemsList[c][t] = {};
                    for (let r of itemsRarity)
                    {
                        let filteredRarity = filteredType.filter('[data-d*=\'"rarity":"'+r+'"\']');
                        itemsList[c][t][r] = {};
                        for (let l of itemsLockedStatus)
                        {
                            let filteredStatus = filteredRarity.filter(l==="locked"?'[menuSellLocked]':':not([menuSellLocked])');
                            itemsList[c][t][r][l]=filteredStatus.length;
                        }
                    }
                }
            }
    
            let itemsListMenu = '<table class="tItems">'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <thead class="tItemsTHead">'
            +'  <tr>'
            +'   <th class="tItemsTh1">'+getTextForUI("Rarity","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[0]+'" colspan="6">'+getTextForUI("RarityCommon","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[1]+'" colspan="6">'+getTextForUI("RarityRare","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[2]+'" colspan="6">'+getTextForUI("RarityEpic","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[3]+'" colspan="6">'+getTextForUI("RarityLegendary","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[4]+'" colspan="6">'+getTextForUI("RarityMythic","elementText")+'</th>'
            +'  </tr>'
            +'  <tr>'
            +'   <th class="tItemsTh2">'+getTextForUI("equipementCaracs","elementText")+'/'+getTextForUI("equipementType","elementText")+'</th>';
    
            for (let r of itemsRarity)
            {
                itemsListMenu+='   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[0]+';r:'+r+'">'+getTextForUI("equipementHead","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[1]+';r:'+r+'">'+getTextForUI("equipementBody","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[2]+';r:'+r+'">'+getTextForUI("equipementLegs","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[3]+';r:'+r+'">'+getTextForUI("equipementFlag","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[4]+';r:'+r+'">'+getTextForUI("equipementPet","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[5]+';r:'+r+'">'+getTextForUI("equipementWeapon","elementText")+'</th>';
            }
    
            itemsListMenu+='  </tr>'
                +' </thead>'
                +' <tbody class="tItemsTBody">';
    
            for (let c of itemsCaracs)
            {
                if(c === 'mythic') {
                    itemsListMenu +='  <tr>'
                        +'   <td class="type" menuSellFilter="c:'+c+';t:*;r:*">'+getTextForUI("RarityMythic","elementText")+'</td>';
                } else {
                    let ext= (c === 16)?"svg":"png";
                    itemsListMenu +='  <tr>'
                        +'   <td class="type" menuSellFilter="c:'+c+';t:*;r:*"><img style="height:20px;width:20px" src="'+getHHScriptVars("baseImgPath")+'/pictures/misc/items_icons/'+c+'.'+ext+'"></td>';
                }
    
                for (let r of itemsRarity)
                {
                    for (let t of itemsType)
                    {
                        let allItems = itemsList[c][t][r];
                        let total = allItems[itemsLockedStatus[0]]+allItems[itemsLockedStatus[1]];
                        let displayNb = allItems[itemsLockedStatus[0]]+'/'+total;
                        let itemsLockStatus;
                        if (total === 0)
                        {
                            displayNb = "";
                        }
                        if (allItems[itemsLockedStatus[1]] === 0)
                        {
                            //no lock
                            itemsLockStatus="noneLocked";
                        }
                        else if (allItems[itemsLockedStatus[1]] === total)
                        {
                            //all locked
                            itemsLockStatus="allLocked";
                        }
                        else
                        {
                            //some locked
                            itemsLockStatus="someLocked";
                        }
    
                        itemsListMenu +='   <td class="tItemsTdItems" itemsLockStatus="'+itemsLockStatus+'" menuSellFilter="c:'+c+';t:'+t+';r:'+r+'"'+'>'+displayNb+'</td>';
                    }
                }
    
                itemsListMenu +='  </tr>';
            }
    
    
    
            itemsListMenu +=' </tbody>'
                +'</table>';
            document.getElementById("menuSellList").innerHTML = itemsListMenu;
    
            function setSlotFilter(inCaracsValue,inTypeValue,inRarityValue,inLockedValue)
            {
                let filter='#player-inventory.armor .slot:not(.empty)';
                if (inCaracsValue !== "*" )
                {
                    filter+='[data-d*=\'"name_add":"'+inCaracsValue+'"\']';
                }
                if (inTypeValue !== "*" )
                {
                    filter+='[data-d*=\'"subtype":"'+inTypeValue+'"\']';
                }
                if (inRarityValue !== "*" )
                {
                    filter+='[data-d*=\'"rarity":"'+inRarityValue+'"\']';
                }
                if (inLockedValue === "locked" || inLockedValue === true)
                {
                    filter+='[menuSellLocked]';
                }
                else
                {
                    filter+=':not([menuSellLocked])';
                }
                return filter;
            }
    
            function setCellsFilter(inCaracsValue,inTypeValue,inRarityValue)
            {
                let filter='table.tItems [menuSellFilter*="';
                if (inCaracsValue !== "*" )
                {
                    filter+='c:'+inCaracsValue+';';
                }
                if (inTypeValue !== "*" )
                {
                    filter+='t:'+inTypeValue+';';
                }
                if (inRarityValue !== "*" )
                {
                    filter+='r:'+inRarityValue;
                }
                filter+='"]';
                return filter;
            }
    
            $('table.tItems [menuSellFilter] ').each(function(){
                this.addEventListener("click", function(){
                    let toLock = !(this.getAttribute("itemsLockStatus") === "allLocked");
                    let c=this.getAttribute("menuSellFilter").split(";")[0].split(":")[1];
                    let t=this.getAttribute("menuSellFilter").split(";")[1].split(":")[1];
                    let r=this.getAttribute("menuSellFilter").split(";")[2].split(":")[1];
                    AllLockUnlock(setSlotFilter(c,t,r,!toLock),toLock);
                    let newLockStatus = toLock?"allLocked":"noneLocked";
                    $(setCellsFilter(c,t,r)).each(function(){
                        this.setAttribute("itemsLockStatus",newLockStatus);
                    });
                });
            });
        }
    
        function AllLockUnlock(inFilter,lock)
        {
            if (lock)
            {
                $(inFilter).each(function(){
                    this.setAttribute("menuSellLocked", "");
                    $(this).prepend('<img class="menuSellLocked" style="position:absolute;width:32px;height:32px" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">');
                });
            }
            else
            {
                $(inFilter).each(function(){
                    this.removeAttribute("menuSellLocked");
                    this.querySelector("img.menuSellLocked").remove();
                });
            }
        }
    
        function lockUnlock(inFilter)
        {
            if ($(inFilter).length >0)
            {
                let currentLock = $(inFilter)[0].getAttribute("menuSellLocked");
                if (currentLock === null )
                {
                    $(inFilter)[0].setAttribute("menuSellLocked", "");
                    $(inFilter).prepend('<img class="menuSellLocked" style="position:absolute;width:32px;height:32px" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">');
                }
                else
                {
                    $(inFilter)[0].removeAttribute("menuSellLocked");
                    $(inFilter+" img.menuSellLocked")[0].remove();
                }
            }
        }
    
        let menuSellStop = false;
        var allLoaded = false;
        var menuSellMaxItems = "all";
        let fetchStarted = false;
        //ugly hack
        let loadingAnimationStart = unsafeWindow.loadingAnimation.start;
        let loadingAnimationStop = unsafeWindow.loadingAnimation.stop;
        function appendMenuSell()
        {
            let menuID = "SellDialog"
            if (getShopType() !== "armor")
            {
                if (document.getElementById(menuID) !== null)
                {
                    try
                    {
                        $(document).off('ajaxComplete',checkAjaxComplete);
                        for (let menu of ["menuSell", "menuSellLock", "menuSellMaskLocked"])
                        {
                            const GMMenuID = GM_registerMenuCommand(getTextForUI(menu,"elementText"), function(){});
                            document.getElementById(menu).remove();
                            GM_unregisterMenuCommand(GMMenuID);
                        }
                        document.getElementById(menuID).remove();
                    }
                    catch(e)
                    {
                        logHHAuto("Catched error : Couldn't remove "+menuID+" menu : "+e);
                    }
                }
                return;
            }
            else if (document.getElementById(menuID) !== null)
            {
                document.getElementById("menuSellCurrentCount").innerHTML = $(itemsQuery).length;
                return;
            }
    
            GM_addStyle(
                '#SellDialog .close {   position: absolute;   top: 0;   right: 30px;   transition: all 200ms;   font-size: 50px;   font-weight: bold;   text-decoration: none;   color: #333; } '
            + '#SellDialog .close:hover {   color: #06D85F; }'
            + '#SellDialog p { font-size: 15px; }'
            + '#SellDialog p.intro { margin: 0; }'
            + '#SellDialog .myButton { font-size: 12px; min-width: 100px; text-align: center; }'
            + '#SellDialog td.type { text-align: center; }'
            );
    
            var menuSellLock = '<div style="position: absolute;right: 220px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellLock","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellLock">'+getTextForUI("menuSellLock","elementText")+'</label></div>'
            var menuSellMaskLocked = '<div style="position: absolute;right: 140px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellMaskLocked","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellMaskLocked">'+getTextForUI("menuSellMaskLocked","elementText")+'</label></div>'
            var menuSell = '<div style="position: absolute;right: 300px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSell","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSell">'+getTextForUI("menuSell","elementText")+'</label></div>'
            + '<dialog style="overflow-y:auto;max-width:95%;max-height:95%;"id="SellDialog"><a class="close" id="SellDialogClose">&times;</a><form stylemethod="dialog">'
            +  '<div style="padding:0 10px; display:flex;flex-direction:column;">'
            +   '<p class="intro">'+getTextForUI("menuSellText","elementText")+'</p>'
            +   '<div class="HHMenuRow">'
            +    '<p>'+getTextForUI("menuSellCurrentCount","elementText")+'</p>'
            +    '<p id="menuSellCurrentCount">0</p>'
            +   '</div>'
            + '<div id="menuSellStop"><label style="width:80px" class="myButton" id="menuSellStop">'+getTextForUI("OptionStop","elementText")+'</label></div>'
            +   '<div id="menuSellHide" style="display:none">'
            +    '<p id="menuSellList" style="margin:0;"></p>'
            +    '<div class="HHMenuRow">'
            +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellButton","tooltip")+'</span><label class="myButton" id="menuSellButton">'+getTextForUI("menuSellButton","elementText")+'</label></div>'
            +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellNumber","tooltip")+'</span><input id="menuSellNumber" style="width:80%;height:20px" required pattern="'+HHAuto_inputPattern.menuSellNumber+'" type="text" value="0"></div>'
            +    '</div>'
            +   '</div>'
            +   '<div id="menuSoldHide" style="display:none">'
            +    '<div class="HHMenuRow">'
            +     '<p>'+getTextForUI("menuSoldText","elementText")+'</p>'
            +     '<p id="menuSoldCurrentCount">0</p>'
            +    '</div>'
            +    '<p id="menuSoldMessage">0</p>'
            +   '</div>'
            +  '</div>'
            + '<menu> <label style="margin-left:800px" class="myButton" id="menuSellCancel">'+getTextForUI("OptionCancel","elementText")+'</label></menu></form></dialog>'
    
            initMenuSell();
            initMenuSellLock();
            initMenuSellMaskLocked();
            GM_registerMenuCommand(getTextForUI("menuSell","elementText"), displayMenuSell);
            GM_registerMenuCommand(getTextForUI("menuSellLock","elementText"), launchMenuSellLock);
            GM_registerMenuCommand(getTextForUI("menuSellMaskLocked","elementText"), launchMenuSellMaskLocked);
            $(document).on('ajaxComplete',checkAjaxComplete);
    
            function initMenuSell()
            {
                $('#player-inventory.armor').append(menuSell);
    
                const closeSellDialog = function(){
                    var SellDialog = document.getElementById("SellDialog");
                    if (typeof SellDialog.showModal !== "function")
                    {
                        alert("The <dialog> API is not supported by this browser");
                        return;
                    }
                    $('#player-inventory.armor .slot:not(.empty)[canBeSold]').removeAttr('canBeSold');
                    SellDialog.close();
                }
    
                document.getElementById("menuSell").addEventListener("click", displayMenuSell);
                document.getElementById("menuSellCancel").addEventListener("click", closeSellDialog);
                document.getElementById("SellDialogClose").addEventListener("click", closeSellDialog);
                document.getElementById("menuSellStop").addEventListener("click", function(){
                    this.style.display = "none";
                    menuSellStop = true;
                });
    
                document.getElementById("menuSellButton").addEventListener("click", function(){
                    if (Number(document.getElementById("menuSellNumber").value) > 0)
                    {
                        logHHAuto("Starting selling "+Number(document.getElementById("menuSellNumber").value)+" items.");
                        sellArmorItems();
                    }
                });
            }
            function displayMenuSell()
            {
                var SellDialog = document.getElementById("SellDialog");
                if (typeof SellDialog.showModal !== "function")
                {
                    alert("The <dialog> API is not supported by this browser");
                    return;
                }
                menuSellMaxItems = Number(window.prompt("Max amount of inventory to load (all for no limit)",menuSellMaxItems));
                if (menuSellMaxItems !== null)
                {
                    menuSellMaxItems = isNaN(menuSellMaxItems)?Number.MAX_VALUE:menuSellMaxItems;
                    document.getElementById("menuSellStop").style.display = "block";
                    menuSellStop = false;
                    fetchStarted = true;
                    unsafeWindow.loadingAnimation.start = function(){};
                    unsafeWindow.loadingAnimation.stop = function(){};
                    if ($('#menuSellList>.tItems').length === 0)
                    {
                        menuSellListItems();
                    }
                    document.getElementById("menuSellHide").style.display = "block";
                    SellDialog.showModal();
                    document.getElementById("menuSellHide").style.display = "none";
                    fetchAllArmorItems();
                }
            }
    
            function initMenuSellMaskLocked()
            {
                $('#player-inventory.armor').append(menuSellMaskLocked);
                document.getElementById("menuSellMaskLocked").addEventListener("click", launchMenuSellMaskLocked);
            }
            function launchMenuSellMaskLocked()
            {
                $("#player-inventory.armor .slot[menuSellLocked]").each(function(){
                    $(this).parent().toggle();
                });
            }
    
            function initMenuSellLock()
            {
                $('#player-inventory.armor').append(menuSellLock);
                document.getElementById("menuSellLock").addEventListener("click", launchMenuSellLock);
            }
            function launchMenuSellLock()
            {
                let filterText = "#player-inventory.armor .slot.selected";
                if ($(filterText).length >0)
                {
                    let toLock=$(filterText)[0].getAttribute("menuSellLocked") === null;
                    AllLockUnlock(filterText,toLock);
                }
            }
        }
    
        function checkAjaxComplete(event,request,settings){
            let match = settings.data.match(/action=market_get_armor&id_member_armor=(\d+)/);
            if (match === null) return;
            allLoaded = request.responseJSON.items.length === 0 && request.responseJSON.success; // No more to load
            if (fetchStarted)
            {
                setTimeout(fetchAllArmorItems, randomInterval(800,1600));
            }
        }
    
        function fetchAllArmorItems()
        {
            let oldCount = $('#player-inventory.armor .slot:not(.empty)').length;
            document.getElementById("menuSellCurrentCount").innerHTML = $(itemsQuery).length;
            let scroll = $("#player-inventory.armor")[0];
            if (menuSellStop || allLoaded || oldCount >= menuSellMaxItems || !document.getElementById("SellDialog").open)
            {
                document.getElementById("menuSellStop").style.display = "none";
                unsafeWindow.loadingAnimation.start = loadingAnimationStart;
                unsafeWindow.loadingAnimation.stop = loadingAnimationStop;
                fetchStarted = false;
                scroll.scrollTop = 0;
                if (document.getElementById("SellDialog").open)
                {
                    document.getElementById("menuSellHide").style.display = "block";
                    menuSellListItems();
                }
                else
                {
                    logHHAuto('Sell Dialog closed, stopping');
                }
                return;
            }
            scroll.scrollTop = scroll.scrollHeight-scroll.offsetHeight;
        }
    
        function sellArmorItems()
        {
            logHHAuto('start selling common, rare and epic stuff');
            document.getElementById("menuSellHide").style.display = "none";
            document.getElementById("menuSoldHide").style.display = "block";
            // return;
            var initialNumberOfItems = $(itemsQuery).length;
            var itemsToSell = Number(document.getElementById("menuSellNumber").value);
            document.getElementById("menuSoldCurrentCount").innerHTML = "0/"+itemsToSell;
            document.getElementById("menuSoldMessage").innerHTML ="";
            let PlayerClass = getHHVars('Hero.infos.class') === null ? $('#equiped > div.icon.class_change_btn').attr('carac') : getHHVars('Hero.infos.class');
            function selling_func()
            {
                if ($('#player-inventory.armor').length === 0)
                {
                    logHHAuto('Wrong tab');
                    return;
                }
                else if (!document.getElementById("SellDialog").open)
                {
                    logHHAuto('Sell Dialog closed, stopping');
                    return;
                }
                let availebleItems = $(itemsQuery);
                let currentNumberOfItems = availebleItems.length;
                if (currentNumberOfItems === 0)
                {
                    logHHAuto('no more items for sale');
                    document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageNoMore","elementText");
                    menuSellListItems();
                    document.getElementById("menuSellHide").style.display = "block";
                    return;
                }
                //console.log(initialNumberOfItems,currentNumberOfItems);
                if ((initialNumberOfItems - currentNumberOfItems) >= itemsToSell) {
                    logHHAuto('Reach wanted sold items.');
                    document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageReachNB","elementText");
                    menuSellListItems();
                    document.getElementById("menuSellHide").style.display = "block";
                    return;
                }
                //check Selected item - can we sell it?
                if (availebleItems.filter('.selected').length > 0)
                {
                    let can_sell = false;
                    //Non legendary or with specific attribute
                    if (availebleItems.filter('.selected').filter(':not(.legendary),[canBeSold]').length > 0)
                    {
                        can_sell = true;
                    }
                    logHHAuto('can be sold ' + can_sell+ ' : '+ availebleItems.filter('.selected')[0].getAttribute('data-d'));
                    if (can_sell)
                    {
                        $('#shops .menu-switch-tab-content.active button.green_text_button[rel=sell]').click();
                        let currSellNumber = Number((initialNumberOfItems - currentNumberOfItems) +1);
                        document.getElementById("menuSoldCurrentCount").innerHTML = currSellNumber+"/"+itemsToSell;
                        document.getElementById("menuSellCurrentCount").innerHTML = $(itemsQuery).length;
                        setTimeout(selling_func, randomInterval(300,700));
                        return;
                    }
                }
                //Find new sellable items
                if (availebleItems.filter(':not(.selected):not(.legendary),[canBeSold]').length > 0)
                {
                    //Select first non legendary item
                    //Or select item that checked before and can be sold
                    availebleItems.filter(':not(.selected):not(.legendary):not(.mythic),[canBeSold]')[0].click();
                    setTimeout(selling_func, randomInterval(300,700));
                    return;
                }
                else if (availebleItems.filter(':not(.selected)').length > 0)
                {
                    let typesOfSets = ['EQ-LE-06','EQ-LE-05','EQ-LE-04','EQ-LE-0' + PlayerClass];
                    let caracsOfSets = ['carac' + PlayerClass,'chance','endurance','carac' + PlayerClass];
                    //[MaxCarac,Index]
                    let arraysOfSets = [
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],//'EQ-LE-06'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],//'EQ-LE-05'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],//'EQ-LE-04'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]]//'EQ-LE-0'+ PlayerClass
                    ];
                    /*//Take equipped items into account
                    for (let indexType = 0; indexType < typesOfSets.length; indexType++)
                    {
                        let equipedArray = $('#equiped .armor .slot[data-d*=' + typesOfSets[indexType] + ']');
                        for (let i5 = 0; i5 < equipedArray.length; i5++) {
                            let equipedObj = JSON.parse($(equipedArray[i5]).attr('data-d'));
                            arraysOfSets[indexType][equipedObj.subtype][0] = equipedObj[caracsOfSets[indexType]];
                        }
                    }*/
    
                    for (let i4 = 0; i4 < availebleItems.length; i4++)
                    {
                        let sellableItemObj = JSON.parse($(availebleItems[i4]).attr('data-d'));
                        let indexType = typesOfSets.indexOf(sellableItemObj.id_equip);
    
                        if (indexType == -1)
                        {
                            //console.log('can_sell2');
                            availebleItems[i4].setAttribute('canBeSold', '');
                        }
                        else
                        {
                            let currentBest = arraysOfSets[indexType][sellableItemObj.subtype];
                            let itemCarac = sellableItemObj[caracsOfSets[indexType]];
                            //checking best gear in inventory based on best class stat
                            if (currentBest[0] < itemCarac)
                            {
                                currentBest[0] = itemCarac;
                                if (currentBest[1] >= 0)
                                {
                                    availebleItems[currentBest[1]].setAttribute('canBeSold', '');
                                }
                                currentBest[1] = i4;
                            }
                            else
                            {
                                availebleItems[i4].setAttribute('canBeSold', '');
                            }
                        }
                    }
                    if ($('#player-inventory.armor [canBeSold]:not([menuSellLocked]):not(.mythic)').length == 0)
                    {
                        logHHAuto('no more items for sale');
                        document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageNoMore","elementText");
                        menuSellListItems();
                        document.getElementById("menuSellHide").style.display = "block";
                        return;
                    }
                }
    
                setTimeout(selling_func, randomInterval(300,700));
            }
            selling_func();
        }
    }
    
}