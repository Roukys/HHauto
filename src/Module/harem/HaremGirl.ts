import { 
    deleteStoredValue,
    ConfigHelper,
    getHHVars,
    getStoredValue,
    getTextForUI,
    parsePrice,
    randomInterval,
    setStoredValue,
    HeroHelper
} from "../../Helper/index";
import { Harem } from "../index";
import { gotoPage } from "../../Service/index";
import { displayHHPopUp, fillHHPopUp, isJSON, logHHAuto, maskHHPopUp } from "../../Utils/index";
import { HHAuto_inputPattern, HHStoredVarPrefixKey } from "../../config/index";
import { KKHaremGirl } from "../../model/index";


export class HaremGirl {
    static AFFECTION_TYPE='affection';
    static EXPERIENCE_TYPE='experience';

    static getCurrentGirl(): KKHaremGirl {
        return unsafeWindow.girl;
    }

    static getMaxOutButton(haremItem:string){
        return $('#girl-leveler-max-out-'+haremItem+':not([disabled])');
    }

    static getMaxOutAllButton(haremItem: string){
        return $('#girl-leveler-max-out-all-levels-'+haremItem+':not([disabled])');
    }

    static switchTabs(haremItem: string){
        $('#girl-leveler-tabs .switch-tab[data-tab="'+haremItem+'"]').click();
    }

    static confirmMaxOut(){
        const confirmMaxOutButton = $('#girl_max_out_popup button.blue_button_L:not([disabled]):visible[confirm_callback]');
        if(confirmMaxOutButton.length > 0) {
            confirmMaxOutButton.click();
        } else logHHAuto('Confirm max out button not found');
    }

    static maxOutButtonAndConfirm(haremItem:string, girl: KKHaremGirl) {
        return new Promise((resolve) => {
            const maxOutButton = HaremGirl.getMaxOutButton(haremItem);
            if(maxOutButton.length > 0) {
                logHHAuto('Max out ' + haremItem + ' for girl ' + girl.id_girl);
                maxOutButton.click();
                setTimeout(() => {
                    HaremGirl.confirmMaxOut();
                    setTimeout(() => {
                        resolve(true); 
                    }, 200);
                }, randomInterval(700,1100));
            } else {
                logHHAuto('Max out button for' + haremItem + ' for girl ' + girl.id_girl + ' not enabled');
                resolve(false);
            }
        });
    }

    static confirmMaxOutAllCash() {
        const confirmMaxOutButton = $('#girl_max_out_all_levels_popup button.green_button_L:not([disabled]):visible[confirm_callback][currency="soft_currency"]');
        if (confirmMaxOutButton.length > 0) {
            confirmMaxOutButton.trigger('click');
        } else logHHAuto('Confirm max out all button not found');
    }

    static maxOutAllButtonAndConfirm(haremItem:string, girl: KKHaremGirl) {
        return new Promise((resolve) => {
            const maxOutButton = HaremGirl.getMaxOutAllButton(haremItem);
            if(maxOutButton.length > 0) {
                logHHAuto('Max out all ' + haremItem + ' for girl ' + girl.id_girl);
                maxOutButton.trigger('click');
                setTimeout(() => {
                    HaremGirl.confirmMaxOutAllCash();
                    setTimeout(() => {
                        resolve(true);
                    }, 200);
                }, randomInterval(700,1100));
            } else {
                logHHAuto('Max out all button for' + haremItem + ' for girl ' + girl.id_girl + ' not enabled');
                resolve(false);
            }
        });
    }

    static confirmAwake(){
        const confAwakButton = $('#awakening_popup button.awaken-btn:not([disabled]):visible');
        if(confAwakButton.length > 0) {
            confAwakButton.trigger('click'); // Page will be refreshed
            return true;
        } else {
            logHHAuto('Confirmation awake button is not enabled');
            Harem.clearHaremToolVariables();
            // TODO Do not clear in list mode
            return false;
        }
    }
    
    static awakGirl(girl: KKHaremGirl) {
        const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
        const canXpGirl = numberOfGem >= girl.awakening_costs;
        const awakButton = $('#awaken:not([disabled])');
        if(awakButton.length > 0 && canXpGirl) {
            logHHAuto('Awake for girl ' + girl.id_girl);
            awakButton.trigger('click');
            setTimeout(HaremGirl.confirmAwake, randomInterval(500,1000)); // Page will be refreshed if done
            return true;
        } else {
            logHHAuto('Awake button for girl ' + girl.id_girl + ' not enabled or not enough gems (' + numberOfGem +'<'+ girl.awakening_costs + ')');
            return false;
        }
    };
    
    static goToGirlQuest(girl: KKHaremGirl, retry=0) {
        const canGiftGirl = girl.nb_grades > girl.graded;
        const upgradeQuest = $('.upgrade_girl').attr('href');
        if(canGiftGirl && upgradeQuest && upgradeQuest.indexOf('/quest/')>=0) {
            logHHAuto('Upgrade for girl ' + girl.id_girl + ' quest:' + upgradeQuest);
            gotoPage(upgradeQuest);
            return true;
        } else {
            logHHAuto('Can\'t upgrade girl ' + girl.id_girl + ': grade (' + girl.graded +'/'+ girl.nb_grades + '), quest :' + upgradeQuest);
            if(!upgradeQuest && retry<2) {
                logHHAuto('Can be loading time, retry in 1s');
                setTimeout(() => {
                    HaremGirl.goToGirlQuest(girl, 1);
                }, randomInterval(1000,1500));
            }
            return false;
        }
    };

    static payGirlQuest(): boolean {
        var proceedButtonMatch = $("#controls button.grade-complete-button:not([style*='display:none']):not([style*='display: none'])");
        if (proceedButtonMatch.length > 0) {
            var proceedButtonCost = $(".price", proceedButtonMatch);
            var proceedCost = parsePrice(proceedButtonCost[0].innerText);
            var moneyCurrent = HeroHelper.getMoney();
            setStoredValue(HHStoredVarPrefixKey+"Temp_lastActionPerformed", Harem.HAREM_UPGRADE_LAST_ACTION);
            
            console.log("Debug girl Quest MONEY for : "+proceedCost);
            if(proceedCost <= moneyCurrent)
            {
                // We have money.
                logHHAuto("Spending "+proceedCost+" Money to proceed.");
                setTimeout(function () {
                    proceedButtonMatch.trigger('click');
                },randomInterval(500,800));
                return true;
            }
            else
            {
                logHHAuto("Need "+proceedCost+" Money to proceed.");
                Harem.clearHaremToolVariables();
                return false;
            }
        } else {
            const haremGirlPayLast = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlPayLast") == 'true';
            if (haremGirlPayLast) {
                // back
                gotoPage('/girl/' + unsafeWindow.id_girl, { resource: 'affection' }, randomInterval(1500, 2500));
                return true;
            } else {
                logHHAuto("ERROR No pay button found stopping.");
                Harem.clearHaremToolVariables();
                return false;
            }
        }
    }

    static async maxOutAndAwake(haremItem:string, selectedGirl: KKHaremGirl){
        await HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
        setTimeout(function() {
            HaremGirl.awakGirl(selectedGirl);
        }, randomInterval(1500,2500));
    }
    
    static async giveHaremGirlItem(haremItem:string){
        const selectedGirl = HaremGirl.getCurrentGirl();
        HaremGirl.switchTabs(haremItem);
        const userHaremGirlLimit = Math.min(Number((<HTMLInputElement>document.getElementById("menuExpLevel")).value), 750);

        if((Number(selectedGirl.level) + 50) <= Number(userHaremGirlLimit)) {
            HaremGirl.HaremDisplayGirlPopup(haremItem, selectedGirl.name + ' '+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"/"+userHaremGirlLimit, (1)*5 );

            setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlActions", haremItem);
            setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlMode", 'girl');
            setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlLimit", userHaremGirlLimit);
            setStoredValue(HHStoredVarPrefixKey+"Temp_lastActionPerformed", Harem.HAREM_UPGRADE_LAST_ACTION);

            if((Number(selectedGirl.level) + 50) >= Number(userHaremGirlLimit)) {
                await HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
                HaremGirl.HaremClearGirlPopup();
            }
            else {
                setTimeout(function() {
                    HaremGirl.maxOutAndAwake(haremItem, selectedGirl);
                }, randomInterval(500,1000));
            }
        } else{
            if(Number(selectedGirl.level) >= Number(userHaremGirlLimit))
                logHHAuto("Girl already above target, ignoring action");
            else
                logHHAuto("Girl and max out will be above target, ignoring action");
        }
    }

    static async fillAllAffection() {
        const haremItem = HaremGirl.AFFECTION_TYPE;
        const selectedGirl: KKHaremGirl = HaremGirl.getCurrentGirl();
        HaremGirl.switchTabs(haremItem);
        const haremGirlPayLast = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlPayLast") == 'true';
        const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded;
        const lastGirlGrad = selectedGirl.nb_grades <= (selectedGirl.graded+1);
        const maxOutButton = HaremGirl.getMaxOutButton(haremItem);
        const maxOutAllButton = HaremGirl.getMaxOutAllButton(haremItem);

        if(canGiftGirl) {

            if (haremGirlPayLast && maxOutAllButton.length > 0) {
                await HaremGirl.maxOutAllButtonAndConfirm(haremItem, selectedGirl);
                // reach girl quest
                return true;
            } else if(maxOutButton.length > 0) {
                await HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);

                if (!lastGirlGrad || haremGirlPayLast) {
                    setTimeout(function () {
                        HaremGirl.goToGirlQuest(selectedGirl);
                    }, randomInterval(1500, 2000));
                    return true;
                } else {
                    logHHAuto("Girl grade reach, keep last to buy manually");
                }
            }
        } else{
            logHHAuto("Girl grade is already maxed out");
        }
        return false;
    }
    
    static addGirlMenu(){
        const girlMenuButtonId = 'girlMenu';
        if($('#'+girlMenuButtonId).length > 0) return;

        var createMenuButton = function(menuId, disabled=false){
            return '<div class="tooltipHH">'
            +    '<span class="tooltipHHtext">'+getTextForUI(menuId,"tooltip")+'</span>'
            +    '<label style="font-size: initial;" class="myButton" '+(disabled?'disabled="disabled"':'')+' id="'+menuId+'Button">'+getTextForUI(menuId,"elementText")
            +'</label></div>';
        }
        
        const girlMenuButton = '<div style="position: absolute;left: 425px;top: 0px; font-size: small; z-index:30;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("girlMenu","tooltip")+'</span><label class="myButton" id="'+girlMenuButtonId+'">+</label></div>';
        var openGirlMenu = function(){
            const selectedGirl = HaremGirl.getCurrentGirl();
            const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded;// && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;

            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";
            const menuIDMaxGifts = "haremGirlGiveMaxGifts";
            const menuIDUpgradeMax = "haremGirlUpgradeMax";

            const menuIDXpButton = createMenuButton(menuIDXp);
            const menuIDGiftsButton = createMenuButton(menuIDGifts);
            const menuIDMaxGiftsButton = createMenuButton(menuIDMaxGifts, !canGiftGirl);
            const menuIDUpgradeMaxButton = createMenuButton(menuIDUpgradeMax, !canGiftGirl);
            const imgPath = ConfigHelper.getHHScriptVars("baseImgPath");

            
            const girlMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
            //+    '<p id="HaremGirlMenuText">'+getTextForUI("girlMenu","elementText")+'</p>'
            +    '<div class="optionsBoxWithTitle">'
            +       '<div class="optionsBoxTitle"><img class="iconImg" src="'+imgPath+'/design/ic_books_gray.svg"><span class="optionsBoxTitle">'+getTextForUI("experience","elementText")+'</span></div>'
            +       '<div class="optionsBox">'
            +         '<div style="padding:10px">'+menuIDXpButton+'</div>'
            +       '</div>'
            +    '</div>'
            +    '<div class="optionsBoxWithTitle">'
            +       '<div class="optionsBoxTitle"><img class="iconImg" src="'+imgPath+'/design/ic_gifts_gray.svg"><span class="optionsBoxTitle">'+getTextForUI("affection","elementText")+'</span></div>'
            +       '<div class="optionsBox">'
            //+       '<div style="padding:10px">'+menuIDGiftsButton+'</div>'
            +         '<div style="padding:10px">'+menuIDMaxGiftsButton+'</div>'
            +         '<div style="padding:10px">'+menuIDUpgradeMaxButton+'</div>'
            +       '</div>'
            +    '</div>'
            fillHHPopUp("GirlMenu",getTextForUI("girlMenu","elementText"), girlMenu);
            $('#'+menuIDXp+'Button').on("click", function()
            {
                maskHHPopUp();
                HaremGirl.switchTabs(HaremGirl.EXPERIENCE_TYPE);
                HaremGirl.displayExpMenu(HaremGirl.EXPERIENCE_TYPE);
            });

            if(canGiftGirl) {
                const fillGirlGifts = (payLast = false) => {
                    maskHHPopUp();
                    HaremGirl.switchTabs(HaremGirl.AFFECTION_TYPE);
                    setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlActions", HaremGirl.AFFECTION_TYPE);
                    setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlMode", 'girl');
                    setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlEnd", 'true');
                    setStoredValue(HHStoredVarPrefixKey+"Temp_lastActionPerformed", Harem.HAREM_UPGRADE_LAST_ACTION);
                    if (payLast) setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlPayLast", 'true');
                    setTimeout(HaremGirl.fillAllAffection, randomInterval(500,800));
                }
                $('#'+menuIDMaxGifts+'Button').on("click",  () => {
                    fillGirlGifts(false);
                });
                $('#'+menuIDUpgradeMax+'Button').on("click", () => {
                    fillGirlGifts(true);
                });
            }
        };
        $('#girl-leveler-tabs').append(girlMenuButton);

        GM_registerMenuCommand(getTextForUI('girlMenu',"elementText"), openGirlMenu);
        $('#'+girlMenuButtonId).on("click", openGirlMenu);
    }
   


    static displayExpMenu(haremItem = HaremGirl.EXPERIENCE_TYPE){
        const selectedGirl = HaremGirl.getCurrentGirl();

        const menuID = "menuExp";
//        const menuExp = '<div style="position: absolute;right: 50px;top: -10px; font-size: small;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExp","tooltip")+'</span><label style="width:100px" class="myButton" id="menuExp">'+getTextForUI("menuExp","elementText")+'</label></div>'
        const menuExpContent = '<div style="width:600px;justify-content: space-between;align-items: flex-start;"class="HHMenuRow">'
        +   '<div id="menuExp-moveLeft"></div>'
        +   '<div style="padding:10px; display:flex;flex-direction:column;">'
        +    '<p style="min-height:10vh;" id="menuExpText"></p>'
        +    '<div class="HHMenuRow">'
        +     '<p>'+getTextForUI("menuExpLevel","elementText")+'</p>'
        +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExpLevel","tooltip")+'</span><input id="menuExpLevel" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="'+HeroHelper.getLevel()+'"></div>'
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

        fillHHPopUp(menuID,getTextForUI("menuExp","elementText"),menuExpContent);
        displayHHPopUp();
        $("#menuExpText").html(selectedGirl.name+" "+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"<br>"+getTextForUI("menuExpInfo","elementText")+"<br>");
        (<HTMLInputElement>document.getElementById("menuExpMode")).value = haremItem;

        var KeyUpExp = function(evt)
        {
            if (evt.key === 'Enter')
            {
                maskHHPopUp();
                HaremGirl.giveHaremGirlItem((<HTMLInputElement>document.getElementById("menuExpMode")).value);
            }
        }

        document.removeEventListener('keyup', KeyUpExp, false);
        document.addEventListener('keyup', KeyUpExp, false);

        $("#menuExpButton").on("click", function()
        {
            maskHHPopUp();
            HaremGirl.giveHaremGirlItem(haremItem);
        });
    }

    static canGiftGirl(): boolean {
        try {
            const girl = HaremGirl.getCurrentGirl();
            return girl.nb_grades > girl.graded && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;
        } catch (error) {
            logHHAuto("ERROR can't compute canGiftGirl");
            return false;
        }
    }

    static canAwakeGirl(): boolean {
        try {
            const girl = HaremGirl.getCurrentGirl();
            const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
            return numberOfGem >= girl.awakening_costs;
        } catch (error) {
            logHHAuto("ERROR can't compute canAwakeGirl");
            return false;
        }
    }
    
    static moduleHaremGirl()
    {
        try {
            const canAwakeGirl = HaremGirl.canAwakeGirl();
            //const canGiftGirl = HaremGirl.canGiftGirl();
            const girl: KKHaremGirl = HaremGirl.getCurrentGirl();
            const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
            //logHHAuto("moduleHaremGirl: " + girl.id_girl);
            logHHAuto("Current level : " + girl.level + ', max level without gems : ' + girl.level_cap);
            logHHAuto("Number of gem needed in next awakening : " + girl.awakening_costs +" / Gem in stock : " + numberOfGem);
            logHHAuto("Girl grade : " + girl.graded + '/' + girl.nb_grades);

            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";

            var giveHaremXp = function() {HaremGirl.displayExpMenu(HaremGirl.EXPERIENCE_TYPE);};
            //var giveHaremGifts = function() {HaremGirl.displayExpMenu(HaremGirl.AFFECTION_TYPE);};

            if(canAwakeGirl)
                GM_registerMenuCommand(getTextForUI(menuIDXp,"elementText"), giveHaremXp);
            //if(canGiftGirl) // Not supported yet
            //   GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);

            HaremGirl.addGirlMenu();

        } catch ({ errName, message }) {
            logHHAuto(`ERROR: Can't add menu girl: ${errName}, ${message}`);
            console.error(message);
        }
    }

    static async run(): Promise<boolean> {
        try {
            const haremItem = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions");
            const haremGirlMode = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode");
            const haremGirlEnd = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlEnd") === 'true';
            const haremGirlLimit = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlLimit");

            const canGiftGirl = HaremGirl.canGiftGirl();
            const canAwakeGirl = HaremGirl.canAwakeGirl();
            const girl: KKHaremGirl = HaremGirl.getCurrentGirl();

            if (!haremItem) {
                // No action to be peformed
                return Promise.resolve(false);
            }
            logHHAuto("run HaremGirl: " + girl.name + '(' + girl.id_girl + ')');
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false as action to be performed on girl");
            logHHAuto("Action to be performed (mode: " + haremGirlMode + ") : give " + haremItem);

            if (haremGirlMode === 'girl')
            {
                if (haremItem == HaremGirl.EXPERIENCE_TYPE && haremGirlLimit && (Number(girl.level) + 50) <= Number(haremGirlLimit)) {
                    logHHAuto("haremGirlLimit: " + haremGirlLimit);
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + girl.Xp.cur + "xp, level " + girl.level + "/" + haremGirlLimit, (1) * 5);
                    if ((Number(girl.level) + 50) >= Number(haremGirlLimit)) {
                        await HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                        HaremGirl.HaremClearGirlPopup();

                        Harem.clearHaremToolVariables();
                    }
                    else
                        HaremGirl.maxOutAndAwake(haremItem, girl);
                } else if (haremItem == HaremGirl.AFFECTION_TYPE && (canGiftGirl)) {
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + girl.graded + "/" + girl.nb_grades + "star", 2);
                    if (!(await HaremGirl.fillAllAffection())) {
                        logHHAuto("No more quest");
                        // No more quest
                        HaremGirl.HaremClearGirlPopup();
                        Harem.clearHaremToolVariables();
                        return Promise.resolve(false);
                    }
                } else {
                    logHHAuto('ERROR, no action found to be executed. ', { haremItem: haremItem, canGiftGirl: canGiftGirl, canAwakeGirl: canAwakeGirl });
                    Harem.clearHaremToolVariables();
                    return Promise.resolve(false);
                }
                return Promise.resolve(true);
            }
            else if (haremGirlMode === 'list')
            {
                let nextGirlId = -1;
                let girlPosInList = 0;
                let remainingGirls = 0;
                let girlListProgress = '';
                const lastGirlListProgress = '<br />' + getTextForUI("giveLastGirl", "elementText");

                let filteredGirlsList = getStoredValue(HHStoredVarPrefixKey + "Temp_filteredGirlsList") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_filteredGirlsList")) : [];
                logHHAuto("filteredGirlsList", filteredGirlsList);
                if (filteredGirlsList && filteredGirlsList.length > 0) {
                    girlPosInList = filteredGirlsList.indexOf("" + girl.id_girl);
                    if (girlPosInList >= 0 && filteredGirlsList.length > (girlPosInList + 1)) {
                        remainingGirls = filteredGirlsList.length - girlPosInList - 1;
                        nextGirlId = filteredGirlsList[girlPosInList + 1];
                        girlListProgress = (girlPosInList + 1) + '/' + filteredGirlsList.length;
                    }
                } else {
                    logHHAuto("ERROR: no girls stored");
                }

                if (haremGirlEnd && haremItem == HaremGirl.AFFECTION_TYPE) {
                    if (girl.graded == girl.nb_grades && nextGirlId < 0) girlListProgress += lastGirlListProgress;
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + girl.graded + "/" + girl.nb_grades + "star : Girl " + girlListProgress, (remainingGirls + 1) * 5);
                    if (await HaremGirl.fillAllAffection()) {
                        logHHAuto("Going to girl quest");
                        return Promise.resolve(true);
                    }
                } else {
                    const canMaxOut = HaremGirl.getMaxOutButton(haremItem).length > 0;
                    if (nextGirlId < 0) girlListProgress += lastGirlListProgress;
                    if (canMaxOut) {
                        HaremGirl.HaremDisplayGirlPopup(haremItem, getTextForUI("giveMaxingOut", "elementText") + ' ' + girl.name + ' : ' + girlListProgress, (remainingGirls + 1) * 5);
                        await HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                    } else {
                        logHHAuto("Max out button not clickable or not found");
                        HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + getTextForUI("giveMaxedOut", "elementText") + ' : ' + girlListProgress, (remainingGirls + 1) * 5);
                    }
                }

                if (nextGirlId >= 0) {
                    logHHAuto('Go to next girl (' + nextGirlId + ') remaining ' + remainingGirls + ' girls');
                    gotoPage('/girl/' + nextGirlId, { resource: haremItem }, randomInterval(1500, 2500));
                    return Promise.resolve(true);
                } else {
                    logHHAuto("No more girls, go back to harem list");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    gotoPage('/harem/' + girl.id_girl, {}, randomInterval(1500, 2500));
                    Harem.clearHaremToolVariables();
                }
            } else {
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                Harem.clearHaremToolVariables();
            }
        } catch ({ errName, message }) {
            logHHAuto(`ERROR: Can't add menu girl: ${errName}, ${message}`);
            console.error(message);
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
            Harem.clearHaremToolVariables();
        } finally {
            Promise.resolve(false);
        }
    }

    static HaremDisplayGirlPopup(haremItem,haremText,remainingTime)
    {
        $(".girl-leveler-panel .girl-section").prepend('<div id="popup_message_harem" class="HHpopup_message" name="popup_message_harem" style="" ><a id="popup_message_harem_close" class="close">&times;</a>'
                        +getTextForUI("give"+haremItem,"elementText")+' : <br>'+haremText+' ('+remainingTime+'sec)</div>');
        setTimeout(() => {
            $("#popup_message_harem_close").one("click", function() {
                Harem.clearHaremToolVariables();
                location.reload();
            });
        }, 200);
        
    }

    static HaremClearGirlPopup(retry = false)
    {
        try {
            $("#popup_message_harem").remove(); 
            if($("#popup_message_harem").length > 0 && !retry) {
                setTimeout(() => { HaremGirl.HaremClearGirlPopup(true)}, 1500);
            }
        } catch (error) {
            logHHAuto("Can't remove popup_message_harem");
        }
    }
}
