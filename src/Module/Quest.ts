import {
    Trollz,
    checkTimer,
    getHHScriptVars,
    getHHVars,
    getPage,
    getStoredValue,
    parsePrice,
    randomInterval,
    setStoredValue,
    setTimer
} from '../Helper/index';
import { autoLoop, gotoPage } from '../Service/index';
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

export class QuestHelper {
    static SITE_QUEST_PAGE = '/side-quests.html';

    static getEnergy() {
        return Number(getHHVars('Hero.energies.quest.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.quest.max_regen_amount'));
    }

    static getNextQuestLink():string|undefined {
        const mainQuest = getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true";
        const sideQuest = getHHScriptVars("isEnabledSideQuest",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true";
        let nextQuestUrl = QuestHelper.getMainQuestUrl();

        if ((mainQuest && sideQuest && (nextQuestUrl.includes("world"))) || (!mainQuest && sideQuest))
        {
            nextQuestUrl = QuestHelper.SITE_QUEST_PAGE;
        }
        else if (nextQuestUrl.includes("world"))
        {
            return undefined;
        }
        return nextQuestUrl;
    }
    static getMainQuestUrl():string {
        let mainQuestUrl:string = getHHVars('Hero.infos.questing.current_url');
        const id_world:number = Number(getHHVars('Hero.infos.questing.id_world'));
        const id_quest:number = Number(getHHVars('Hero.infos.questing.id_quest'));
        const lastQuestId:number = getHHScriptVars("lastQuestId",false);

        if (id_world < (Trollz.length) || lastQuestId > 0 && id_quest != lastQuestId) {
            // Fix when KK quest url is world url
            mainQuestUrl = "/quest/" + id_quest;
        }
        return mainQuestUrl;
    }
    static run(){
        //logHHAuto("Starting auto quest.");
        // Check if at correct page.
        let page = getPage();
        let mainQuestUrl = QuestHelper.getMainQuestUrl();
        let doMainQuest = getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true" && !mainQuestUrl.includes("world");
        if (!doMainQuest && page === 'side-quests' && getHHScriptVars("isEnabledSideQuest",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true") {
            var quests = $('.side-quest:has(.slot) .side-quest-button');
            if (quests.length > 0) {
                logHHAuto("Navigating to side quest.");
                gotoPage(quests.attr('href'));
            }
            else {
                logHHAuto("All quests finished, setting timer to check back later!");
                if (checkTimer('nextMainQuestAttempt')) {setTimer('nextMainQuestAttempt', 604800);} // 1 week delay
                setTimer('nextSideQuestAttempt', 604800); // 1 week delay
                location.reload();
            }
            return;
        }
        if (page !== getHHScriptVars("pagesIDQuest") || (doMainQuest && mainQuestUrl != window.location.pathname)) {
            // Click on current quest to naviagte to it.
            logHHAuto("Navigating to current quest.");
            gotoPage(getHHScriptVars("pagesIDQuest"));
            return;
        }
        $("#popup_message close").click();
        $("#level_up close").click();
        // Get the proceed button type
        var proceedButtonMatch = $("#controls button:not([style*='display:none']):not([style*='display: none'])");
        if (proceedButtonMatch.length === 0)
        {
            proceedButtonMatch = $("#controls button#free");
        }
        var proceedType = proceedButtonMatch.attr("id");
        //console.log("DebugQuest proceedType : "+proceedType);
        if (proceedButtonMatch.length === 0)
        {
            logHHAuto("Could not find resume button.");
            return;
        }
        else if(proceedButtonMatch.attr('disabled') && proceedType != "end_play") {
            logHHAuto("Button is disabled for animation wait a bit.");
            return;
        }
        
        if (proceedType === "free") {
            logHHAuto("Proceeding for free.");
            //setStoredValue"HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else if (proceedType === "pay") {
            var proceedButtonCost = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .price");
            var proceedCost = parsePrice(proceedButtonCost[0].innerText);
            var payTypeNRJ = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .energy_quest_icn").length>0;
            var energyCurrent = QuestHelper.getEnergy();
            var moneyCurrent = getHHVars('Hero.currencies.soft_currency');
            let payType = $("#controls .cost span[cur]:not([style*='display:none']):not([style*='display: none'])").attr('cur');
            //console.log("DebugQuest payType : "+payType);
            if (payTypeNRJ)
            {
                // console.log("DebugQuest ENERGY for : "+proceedCost + " / " + energyCurrent);
                if(proceedCost <= energyCurrent)
                {
                    // We have energy.
                    logHHAuto("Spending "+proceedCost+" Energy to proceed.");
                }
                else
                {
                    logHHAuto("Quest requires "+proceedCost+" Energy to proceed.");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "*"+proceedCost);
                    return;
                }
            }
            else
            {
                console.log("DebugQuest MONEY for : "+proceedCost);
                if(proceedCost <= moneyCurrent)
                {
                    // We have money.
                    logHHAuto("Spending "+proceedCost+" Money to proceed.");
                }
                else
                {
                    logHHAuto("Need "+proceedCost+" Money to proceed.");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "$"+proceedCost);
                    return;
                }
            }
            //proceedButtonMatch.click();
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "use_item") {
            logHHAuto("Proceeding by using X" + Number($("#controls .item span").text()) + " of the required item.");
            //proceedButtonMatch.click();
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "battle") {
            logHHAuto("Quest need battle...");
            setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "battle");
            // Proceed to battle troll.
            //proceedButtonMatch.click();
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "end_archive") {
            logHHAuto("Reached end of current archive. Proceeding to next archive.");
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else if (proceedType === "end_play") {
            let rewards = $('#popups[style="display: block;"]>#rewards_popup[style="display: block;"] button.blue_button_L[confirm_blue_button]');
            if (proceedButtonMatch.attr('disabled') && rewards.length>0){
                logHHAuto("Reached end of current archive. Claim reward.");
                rewards.click();
                return;
            }
            logHHAuto("Reached end of current play. Proceeding to next play.");
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else {
            logHHAuto("Could not identify given resume button.");
            setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "unknownQuestButton");
            return;
        }
        setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        setTimeout(function ()
                    {
            proceedButtonMatch.click();
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
            logHHAuto("setting autoloop to true");
            setTimeout(autoLoop,randomInterval(800,1200));
        },randomInterval(500,800));
        //setTimeout(function () {location.reload();},randomInterval(800,1500));
        
    }
}