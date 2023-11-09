import { 
    deleteStoredValue,
    getHHScriptVars,
    getHHVars,
    getStoredValue,
    getTextForUI,
    parsePrice,
    randomInterval,
    setStoredValue
} from "../../Helper";
import { Harem } from "..";
import { gotoPage } from "../../Service";
import { displayHHPopUp, fillHHPopUp, isJSON, logHHAuto, maskHHPopUp } from "../../Utils";
import { HHAuto_inputPattern, HHStoredVarPrefixKey } from "../../config";


export class HaremGirl {
    static AFFECTION_TYPE='affection';
    static EXPERIENCE_TYPE='experience';

    static getMaxOutButton(haremItem){
        return $('#girl-leveler-max-out-'+haremItem+':not([disabled])');
    }

    static switchTabs(haremItem){
        $('#girl-leveler-tabs .switch-tab[data-tab="'+haremItem+'"]').click();
    }

    static confirmMaxOut(){
        const confirmMaxOutButton = $('#girl_max_out_popup button.blue_button_L:not([disabled]):visible[confirm_callback]');
        if(confirmMaxOutButton.length > 0) {
            confirmMaxOutButton.click();
        } else logHHAuto('Confirm max out button not found');
    }

    static maxOutButtonAndConfirm(haremItem, girl) {
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

    static confirmAwake(){
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
    }
    
    static awakGirl(girl) {
        const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
        const canXpGirl = numberOfGem >= girl.awakening_costs;
        const awakButton = $('#awaken:not([disabled])');
        if(awakButton.length > 0 && canXpGirl) {
            logHHAuto('Awake for girl ' + girl.id_girl);
            awakButton.click();
            setTimeout(HaremGirl.confirmAwake, randomInterval(500,1000)); // Page will be refreshed if done
            return true;
        } else {
            logHHAuto('Awake button for girl ' + girl.id_girl + ' not enabled or not enough gems (' + numberOfGem +'<'+ girl.awakening_costs + ')');
            return false;
        }
    };
    
    static goToGirlQuest(girl, retry=0) {
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

    static payGirlQuest(){
        var proceedButtonMatch = $("#controls button.grade-complete-button:not([style*='display:none']):not([style*='display: none'])");
        var proceedButtonCost = $(".price", proceedButtonMatch);
        var proceedCost = parsePrice(proceedButtonCost[0].innerText);
        var moneyCurrent = getHHVars('Hero.currencies.soft_currency');
        
        console.log("Debug girl Quest MONEY for : "+proceedCost);
        if(proceedCost <= moneyCurrent)
        {
            // We have money.
            logHHAuto("Spending "+proceedCost+" Money to proceed.");
            setTimeout(function () {
                proceedButtonMatch.click();
            },randomInterval(500,800));
        }
        else
        {
            logHHAuto("Need "+proceedCost+" Money to proceed.");
            Harem.clearHaremToolVariables();
            // gotoPage('/girl/'+nextGirlId,{resource:haremItem}, randomInterval(1500,2500));
            return;
        }
    }

    static maxOutAndAwake(haremItem, selectedGirl){
        HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
        setTimeout(function() {
            HaremGirl.awakGirl(selectedGirl);
        }, randomInterval(1500,2500));
    }
    
    static giveHaremGirlItem(haremItem){
        const selectedGirl = unsafeWindow.girl;
        HaremGirl.switchTabs(haremItem);
        const userHaremGirlLimit = Math.min(Number(document.getElementById("menuExpLevel").value), 750);

        if((Number(selectedGirl.level) + 50) <= Number(userHaremGirlLimit)) {
            HaremGirl.HaremDisplayGirlPopup(haremItem, selectedGirl.name + ' '+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"/"+userHaremGirlLimit, (1)*5 );

            setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlActions", haremItem);
            setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlMode", 'girl');
            setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlLimit", userHaremGirlLimit);

            if((Number(selectedGirl.level) + 50) >= Number(userHaremGirlLimit)) {
                HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
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
        const selectedGirl = unsafeWindow.girl;
        HaremGirl.switchTabs(haremItem);
        const haremGirlPayLast = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlPayLast") == 'true';
        const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded;
        const lastGirlGrad = selectedGirl.nb_grades <= (selectedGirl.graded+1);
        const maxOutButton = HaremGirl.getMaxOutButton(haremItem);

        if(canGiftGirl) {

            if(maxOutButton.length > 0) {
                await HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
            }
            
            if(!lastGirlGrad || haremGirlPayLast) {
                setTimeout(function() {
                    HaremGirl.goToGirlQuest(selectedGirl);
                }, randomInterval(1500,2000));
                return true;
            } else {
                logHHAuto("Girl grade reach, keep last to buy manually");
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
            const selectedGirl = unsafeWindow.girl;
            const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded;// && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;

            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";
            const menuIDMaxGifts = "haremGirlGiveMaxGifts";
            const menuIDUpgradeMax = "haremGirlUpgradeMax";

            const menuIDXpButton = createMenuButton(menuIDXp);
            const menuIDGiftsButton = createMenuButton(menuIDGifts);
            const menuIDMaxGiftsButton = createMenuButton(menuIDMaxGifts, !canGiftGirl);
            const menuIDUpgradeMaxButton = createMenuButton(menuIDUpgradeMax, !canGiftGirl);
            const imgPath = getHHScriptVars("baseImgPath");

            
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
            document.getElementById(menuIDXp+'Button').addEventListener("click", function()
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
                    if (payLast) setStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlPayLast", 'true');
                    setTimeout(HaremGirl.fillAllAffection, randomInterval(500,800));
                }
                document.getElementById(menuIDMaxGifts+'Button').addEventListener("click", fillGirlGifts);
                document.getElementById(menuIDUpgradeMax+'Button').addEventListener("click", () => {
                    fillGirlGifts(true);
                });
            }
        };
        $('#girl-leveler-tabs').append(girlMenuButton);

        GM_registerMenuCommand(getTextForUI('girlMenu',"elementText"), openGirlMenu);
        document.getElementById(girlMenuButtonId).addEventListener("click", openGirlMenu);
    }
   


    static displayExpMenu(haremItem = HaremGirl.EXPERIENCE_TYPE){
        const selectedGirl = unsafeWindow.girl;

        const menuID = "menuExp";
//        const menuExp = '<div style="position: absolute;right: 50px;top: -10px; font-size: small;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExp","tooltip")+'</span><label style="width:100px" class="myButton" id="menuExp">'+getTextForUI("menuExp","elementText")+'</label></div>'
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

        fillHHPopUp(menuID,getTextForUI("menuExp","elementText"),menuExpContent);
        displayHHPopUp();
        document.getElementById("menuExpText").innerHTML = selectedGirl.name+" "+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"<br>"+getTextForUI("menuExpInfo","elementText")+"<br>";
        document.getElementById("menuExpMode").value = haremItem;

        var KeyUpExp = function(evt)
        {
            if (evt.key === 'Enter')
            {
                maskHHPopUp();
                HaremGirl.giveHaremGirlItem(document.getElementById("menuExpMode").value);
            }
        }

        document.removeEventListener('keyup', KeyUpExp, false);
        document.addEventListener('keyup', KeyUpExp, false);

        document.getElementById("menuExpButton").addEventListener("click", function()
        {
            maskHHPopUp();
            HaremGirl.giveHaremGirlItem(haremItem);
        });
    }
    
    static async moduleHaremGirl()
    {
        const haremItem = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlActions");
        const haremGirlMode = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlMode");
        const haremGirlEnd = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlEnd") === 'true';
        const haremGirlLimit = getStoredValue(HHStoredVarPrefixKey+"Temp_haremGirlLimit");
        let canAwakeGirl = false;
        let canGiftGirl = false;

        try {
            const girl = unsafeWindow.girl;
            const numberOfGem =unsafeWindow.player_gems_amount[girl.element].amount;
            canAwakeGirl = numberOfGem >= girl.awakening_costs;
            canGiftGirl = girl.nb_grades > girl.graded && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;
            //logHHAuto("moduleHaremGirl: " + girl.id_girl);
            logHHAuto("Current level : " + girl.level + ', max level without gems : ' + girl.level_cap);
            logHHAuto("Number of gem needed in next awakening : " + girl.awakening_costs +" / Gem in stock : " + numberOfGem);
            logHHAuto("Girl grade : " + girl.graded + '/' + girl.nb_grades);

            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";

            var giveHaremXp = function() {displayExpMenu(HaremGirl.EXPERIENCE_TYPE);};
            var giveHaremGifts = function() {displayExpMenu(HaremGirl.AFFECTION_TYPE);};

            if(canAwakeGirl)
                GM_registerMenuCommand(getTextForUI(menuIDXp,"elementText"), giveHaremXp);
            //if(canGiftGirl) // Not supported yet
            //   GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);

            HaremGirl.addGirlMenu(canAwakeGirl, canGiftGirl);

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
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false as action to be performed on girl");
            logHHAuto("Action to be performed (mode: "+haremGirlMode+") : give " + haremItem);

            if(haremGirlMode === 'girl')
            {
                if( haremItem == HaremGirl.EXPERIENCE_TYPE && haremGirlLimit && (Number(girl.level) + 50) <= Number(haremGirlLimit)){
                    logHHAuto("haremGirlLimit: " + haremGirlLimit);
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' '+girl.Xp.cur+"xp, level "+girl.level+"/"+haremGirlLimit, (1)*5 );
                    if((Number(girl.level) + 50) >= Number(haremGirlLimit)) {
                        HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                        HaremGirl.HaremClearGirlPopup();

                        Harem.clearHaremToolVariables();
                    }
                    else
                        HaremGirl.maxOutAndAwake(haremItem, girl);
                } else if(haremItem == HaremGirl.AFFECTION_TYPE && (canGiftGirl)){
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' '+girl.graded+"/"+girl.nb_grades+"star",2);
                    if(!(await HaremGirl.fillAllAffection())){
                        logHHAuto("No more quest");
                        // No more quest
                        HaremGirl.HaremClearGirlPopup();
                        Harem.clearHaremToolVariables();
                    }
                } else {
                    logHHAuto('ERROR, no action found to be executed. ', {haremItem: haremItem, canGiftGirl:canGiftGirl, canAwakeGirl:canAwakeGirl});
                    Harem.clearHaremToolVariables();
                }
            }
            else if(haremGirlMode === 'list')
            {
                let nextGirlId = -1;
                let girlPosInList = 0;
                let remainingGirls = 0;
                let girlListProgress = '';
                const lastGirlListProgress = '<br />' + getTextForUI("giveLastGirl","elementText");


                let filteredGirlsList = getStoredValue(HHStoredVarPrefixKey+"Temp_filteredGirlsList")?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_filteredGirlsList")):[];
                logHHAuto("filteredGirlsList", filteredGirlsList);
                if (filteredGirlsList && filteredGirlsList.length > 0) {
                    girlPosInList = filteredGirlsList.indexOf(""+girl.id_girl);
                    if (girlPosInList >=0 && filteredGirlsList.length > (girlPosInList+1)) {
                        remainingGirls = filteredGirlsList.length - girlPosInList - 1;
                        nextGirlId = filteredGirlsList[girlPosInList+1];
                        girlListProgress = (girlPosInList+1) + '/' + filteredGirlsList.length;
                    }
                } else {
                    logHHAuto("ERROR: no girls stored");
                }

                if(haremGirlEnd && haremItem == HaremGirl.AFFECTION_TYPE) {
                    if(girl.graded == girl.nb_grades && nextGirlId < 0) girlListProgress += lastGirlListProgress;
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' '+girl.graded+"/"+girl.nb_grades+"star : Girl "+ girlListProgress, (remainingGirls+1)*5 );
                    if(await HaremGirl.fillAllAffection()){
                        logHHAuto("Going to girl quest");
                        return;
                    }
                } else {
                    const canMaxOut = HaremGirl.getMaxOutButton(haremItem).length > 0;
                    if(nextGirlId < 0) girlListProgress += lastGirlListProgress;
                    if (canMaxOut)
                    {
                        HaremGirl.HaremDisplayGirlPopup(haremItem, getTextForUI("giveMaxingOut","elementText")  + ' ' + girl.name + ' : '+ girlListProgress, (remainingGirls+1)*5 );
                        HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                    } else {
                        logHHAuto("Max out button not clickable or not found");
                        HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + getTextForUI("giveMaxedOut","elementText")+' : '+ girlListProgress, (remainingGirls+1)*5 );
                    }
                }

                if (nextGirlId >= 0) {
                    logHHAuto('Go to next girl (' + nextGirlId + ') remaining ' + remainingGirls + ' girls');
                    gotoPage('/girl/'+nextGirlId,{resource:haremItem}, randomInterval(1500,2500));
                } else {
                    logHHAuto("No more girls, go back to harem list");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                    gotoPage('/harem/'+girl.id_girl,{}, randomInterval(1500,2500));
                    Harem.clearHaremToolVariables();
                }
            } else {
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                Harem.clearHaremToolVariables();
            }
        } catch (error) {
            logHHAuto("ERROR: Can't perform action ");
            console.error(error);
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
            Harem.clearHaremToolVariables();
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
            document.getElementById("popup_message_harem").remove(); 
            if($("#popup_message_harem").length > 0 && !retry) {
                setTimeout(() => { HaremGirl.HaremClearGirlPopup(true)}, 1500);
            }
        } catch (error) {
            logHHAuto("Can't remove popup_message_harem");
        }
    }
}
