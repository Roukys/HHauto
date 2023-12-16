import {
    RewardHelper,
    Trollz,
    checkTimer,
    getHHScriptVars,
    getHHVars,
    getHero,
    getPage,
    getSecondsLeft,
    getStoredValue,
    getTextForUI,
    getTimeLeft,
    isPshEnvironnement,
    queryStringGetParam,
    setHHVars,
    setStoredValue,
} from '../Helper/index';
import { gotoPage } from '../Service/index';
import { isJSON, logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { EventModule } from "./Events/index";
import { Harem } from "./Harem";

export class Troll {

    static getEnergy() {
        return Number(getHHVars('Hero.energies.fight.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.fight.max_regen_amount'));
    }

    static getTrollWithGirls() {
        const girlDictionary = Harem.getGirlsList();
        const trollGirlsID = getHHScriptVars("trollGirlsID");
        const trollWithGirls:any[] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    
        if (girlDictionary) {
            for (var tIdx = 0; tIdx < trollGirlsID.length; tIdx++) {
                for (var pIdx = 0; pIdx < trollGirlsID[tIdx].length; pIdx++) {
                    trollWithGirls[tIdx][pIdx] = false;
                    for (var gIdx = 0; gIdx < trollGirlsID[tIdx][pIdx].length; gIdx++) {
                        var idGirl = parseInt(trollGirlsID[tIdx][pIdx][gIdx], 10);
                        if (idGirl == 0) {
                            trollWithGirls[tIdx][pIdx] = false;
                        }
                        else if (girlDictionary.get(idGirl) == undefined) {
                            trollWithGirls[tIdx][pIdx] = true;
                        }
                        else {
                            if (girlDictionary.get(idGirl).shards == 100 && trollWithGirls[tIdx][pIdx] == false) {
                                trollWithGirls[tIdx][pIdx] = false;
                            }
                            else {
                                trollWithGirls[tIdx][pIdx] = true;
                            }
                        }
                    }
    
                }
            }
        }
        // const trollWithGirls = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls")):[];
        return trollWithGirls;
    }

    static getPinfo(contest) {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollRunThreshold"));

        let Tegzd = '<li>';
        Tegzd += getTextForUI("autoTrollTitle","elementText")+' ' + Troll.getEnergy()+'/'+Troll.getEnergyMax()+contest;
        if (runThreshold > 0) {
            Tegzd += ' ('+threshold+'<'+Troll.getEnergy()+'<'+runThreshold+')';
            if(Troll.getEnergy() < runThreshold)  Tegzd += ' ' + getTextForUI("waitRunThreshold","elementText");
        }
        Tegzd += '</li>';
        return Tegzd;
    }

    static getLastTrollIdAvailable() {
        const id_world = getHHVars('Hero.infos.questing.id_world');
        if(isPshEnvironnement() && id_world > 10) {
            const trollIdMapping = getHHScriptVars("trollIdMapping");
            return trollIdMapping[id_world]; // PSH parallele adventures
        }else {
            return id_world-1;
        }
    }

    static getTrollIdFromEvent(eventGirl){
        if(EventModule.isEventActive(eventGirl.event_id)) {
            return eventGirl.troll_id;
        }else {
            EventModule.clearEventData(eventGirl.event_id);
            logHHAuto("Event troll completed, clear event and get new troll ID");
            return Troll.getTrollIdToFight();
        }
    }

    static getTrollIdToFight() {
        let trollWithGirls = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls")):[];
        let autoTrollSelectedIndex = getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollSelectedIndex");
        if(autoTrollSelectedIndex === undefined || isNaN(autoTrollSelectedIndex)) {
            autoTrollSelectedIndex -1
        }else {
            autoTrollSelectedIndex = Number(autoTrollSelectedIndex);
        }

        var TTF;
        const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
        const eventGirl = getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !== undefined ? JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")) : undefined
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") === "true" && !checkTimer("eventGoing") && eventGirl !== undefined && eventGirl.is_mythic==="false")
        {
            logHHAuto("Event troll fight");
            TTF=Troll.getTrollIdFromEvent(eventGirl);
        }
        else if (getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true" && !checkTimer("eventMythicGoing") && eventGirl !== undefined && eventGirl.is_mythic==="true")
        {
            logHHAuto("Mythic Event troll fight");
            TTF=Troll.getTrollIdFromEvent(eventGirl);
        }
        else if (autoTrollSelectedIndex === 98 || autoTrollSelectedIndex === 99) {
            if (trollWithGirls === undefined || trollWithGirls.length === 0) {
                logHHAuto("No troll with girls from storage, parsing game info ...");
                trollWithGirls = Troll.getTrollWithGirls();
                setStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls", JSON.stringify(trollWithGirls));
            }

            if (trollWithGirls !== undefined && trollWithGirls.length > 0) {
                if(autoTrollSelectedIndex === 98) {
                    TTF = trollWithGirls.findIndex(troll => troll.find(trollTier => trollTier === true)) + 1;
                }
                else if(autoTrollSelectedIndex === 99) {
                    TTF = trollWithGirls.findLastIndex(troll => troll.find(trollTier => trollTier === true)) + 1;
                    if(TTF > lastTrollIdAvailable) {
                        TTF=lastTrollIdAvailable;
                    }
                }
            } else if(getPage()!==getHHScriptVars("pagesIDHome")) {
                logHHAuto("Can't get troll with girls, going to home page to get girl list.");
                gotoPage(getHHScriptVars("pagesIDHome"));
            } else {
                logHHAuto("Can't get troll with girls, going to last troll.");
                TTF=lastTrollIdAvailable;
            }
        }
        else if(autoTrollSelectedIndex > 0 && autoTrollSelectedIndex < 98)
        {
            TTF=autoTrollSelectedIndex;
            logHHAuto("Custom troll fight.");
        }
        else
        {
            TTF = lastTrollIdAvailable;
            logHHAuto("Last troll fight: " + TTF);
        }

        if (getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") === "true")
        {
            TTF = lastTrollIdAvailable;
            logHHAuto("Last troll fight for quest item: " + TTF);
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest", "false");
            setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
        }
        if(TTF >= Trollz.length) {
            logHHAuto("Error: New troll implemented '"+TTF+"' (List to be updated) or wrong troll target found");
            TTF = 1;
        }
        return TTF;
    }

    static doBossBattle()
    {
        var currentPower = Troll.getEnergy();
        if(currentPower < 1)
        {
            //logHHAuto("No power for battle.");
            if (!Troll.canBuyFight().canBuy)
            {
                return false;
            }
        }

        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollRunThreshold"));
        if (runThreshold > 0 && currentPower == runThreshold) {
            setStoredValue(HHStoredVarPrefixKey+"Temp_TrollHumanLikeRun", "true");
        }

        const TTF = Troll.getTrollIdToFight();

        logHHAuto("Fighting troll N "+TTF);
        logHHAuto("Going to crush: "+Trollz[Number(TTF)]);

        // Battles the latest boss.
        // Navigate to latest boss.
        //console.log(getPage());
        if(getPage()===getHHScriptVars("pagesIDTrollPreBattle") && window.location.search=="?id_opponent=" + TTF)
        {
            // On the battle screen.
            Troll.CrushThemFights();
            return true;
        }
        else
        {
            logHHAuto("Navigating to chosen Troll.");
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            //week 28 new battle modification
            //location.href = "/battle.html?id_troll=" + TTF;
            gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
            //End week 28 new battle modification
            return true;
        }
    }

    static CrushThemFights()
    {
        if (getPage() === getHHScriptVars("pagesIDTrollPreBattle")) {
            // On battle page.
            logHHAuto("On Pre battle page.");
            let TTF = queryStringGetParam(window.location.search,'id_opponent');

            let battleButton = $('#pre-battle .battle-buttons a.green_button_L.battle-action-button');
            let battleButtonX10 = $('#pre-battle .battle-buttons button.autofight[data-battles="10"]');
            let battleButtonX50 = $('#pre-battle .battle-buttons button.autofight[data-battles="50"]');
            let battleButtonX10Price = Number(battleButtonX10.attr('price'));
            let battleButtonX50Price = Number(battleButtonX50.attr('price'));
            // let Hero=getHero();
            let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
            let remainingShards;
            let previousPower = getStoredValue(HHStoredVarPrefixKey+"Temp_trollPoints") !== undefined ? getStoredValue(HHStoredVarPrefixKey+"Temp_trollPoints") : 0;
            let currentPower = Troll.getEnergy();

            var checkPreviousFightDone = function(){
                // The goal of this function is to detect slow server response to avoid loop without fight
                if(previousPower > 0 && previousPower == currentPower) {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                    logHHAuto("Server seems slow to reply, setting autoloop to false to wait for troll page to load");
                }
            }

            //check if girl still available at troll in case of event
            if (TTF !== null)
            {
                if (getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !== undefined && TTF === JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).troll_id)
                {
                    if (
                        (
                            JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true"
                            && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true"
                        )
                        ||
                        (
                            JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "false"
                            && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") ==="true"
                        )
                    )
                    {
                        let rewardGirlz=$("#pre-battle .oponnent-panel .opponent_rewards .rewards_list .slot.girl_ico[data-rewards]");
                        const trollGirlRewards = rewardGirlz.attr('data-rewards') || '';

                        if (rewardGirlz.length ===0 || !trollGirlRewards.includes('"id_girl":'+JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_id))
                        {
                            logHHAuto("Seems "+JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_name+" is no more available at troll "+Trollz[Number(TTF)]+". Going to event page.");
                            EventModule.parseEventPage(JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).event_id);
                            return true;
                        }
                    }
                }
                let canBuyFightsResult=Troll.canBuyFight();
                if (
                    (canBuyFightsResult.canBuy && currentPower === 0)
                    ||
                    (
                        canBuyFightsResult.canBuy
                        && currentPower < 50
                        && canBuyFightsResult.max === 50
                        && getStoredValue(HHStoredVarPrefixKey+"Setting_useX50Fights") === "true"
                        && ( JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_useX50FightsAllowNormalEvent") === "true")
                        && TTF === JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).troll_id
                    )
                    ||
                    (
                        canBuyFightsResult.canBuy
                        && currentPower < 10
                        && canBuyFightsResult.max === 20
                        && getStoredValue(HHStoredVarPrefixKey+"Setting_useX10Fights") === "true"
                        && ( JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_useX10FightsAllowNormalEvent") === "true")
                        && TTF === JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).troll_id
                    )
                )
                {
                    Troll.RechargeCombat();
                    gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
                    return;
                }

                if
                    (
                        getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !== undefined
                        && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_shards
                        && Number.isInteger(Number(JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_shards))
                        && battleButtonX10.length > 0
                        && battleButtonX50.length > 0
                        && getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") !== "true"
                    )
                {
                    remainingShards = Number(100 - Number(JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_shards));
                    let bypassThreshold = (
                        (JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "false"
                        && canBuyFightsResult.canBuy
                        ) // eventGirl available and buy comb true
                        || (JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true"
                            && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true"
                        )
                    );

                    if (getStoredValue(HHStoredVarPrefixKey+"Setting_useX50Fights") === "true"
                        && getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")
                        && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")))
                        && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50"))
                        && (battleButtonX50Price === 0 || getHHVars('Hero.currencies.hard_currency')>=battleButtonX50Price+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")))
                        && currentPower >= 50
                        && (currentPower >= (Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold")) + 50)
                            || bypassThreshold
                        )
                        && ( JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_useX50FightsAllowNormalEvent") === "true")
                    )
                    {
                        logHHAuto("Going to crush 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');

                        setHHVars('Hero.infos.hc_confirm',true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX50[0].click();
                        setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                        //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", Number(getStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh")) - 50);
                        logHHAuto("Crushed 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');
                        if (getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement") === "battle") {
                            // Battle Done.
                            setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                        }
                        RewardHelper.ObserveAndGetGirlRewards();
                        return;
                    }
                    else
                    {
                        if (getStoredValue(HHStoredVarPrefixKey+"Setting_useX50Fights") === "true")
                        {
                            logHHAuto('Unable to use x50 for '+battleButtonX50Price+' kobans,fights : '+Troll.getEnergy()+'/50, remaining shards : '+remainingShards+'/'+getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                        }
                    }

                    if (getStoredValue(HHStoredVarPrefixKey+"Setting_useX10Fights") === "true"
                        && getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10")
                        && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10")))
                        && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10"))
                        && (battleButtonX10Price === 0 || getHHVars('Hero.currencies.hard_currency')>=battleButtonX10Price+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")))
                        && currentPower >= 10
                        && (currentPower >= (Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold")) + 10)
                            || bypassThreshold
                        )
                        && ( JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_useX10FightsAllowNormalEvent") === "true")
                    )
                    {
                        logHHAuto("Going to crush 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');

                        setHHVars('Hero.infos.hc_confirm',true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX10[0].click();
                        setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                        //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", Number(getStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh")) - 10);
                        logHHAuto("Crushed 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');
                        if (getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement") === "battle") {
                            // Battle Done.
                            setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "none");
                        }
                        RewardHelper.ObserveAndGetGirlRewards();
                        return;
                    }
                    else
                    {
                        if (getStoredValue(HHStoredVarPrefixKey+"Setting_useX10Fights") === "true")
                        {
                            logHHAuto('Unable to use x10 for '+battleButtonX10Price+' kobans,fights : '+Troll.getEnergy()+'/10, remaining shards : '+remainingShards+'/'+getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                        }
                    }
                }

                //Crushing one by one


                if (currentPower > 0)
                {
                    if ($('#pre-battle div.battle-buttons a.single-battle-button[disabled]').length>0)
                    {
                        logHHAuto("Battle Button seems disabled, force reload of page.");
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return;
                    }
                    if(battleButton === undefined || battleButton.length === 0)
                    {
                        logHHAuto("Battle Button was undefined. Disabling all auto-battle.");
                        (<HTMLInputElement>document.getElementById("autoTrollBattle")).checked = false;
                        setStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle", "false");

                        //document.getElementById("autoArenaCheckbox").checked = false;
                        if (getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement") === "battle")
                        {
                            (<HTMLInputElement>document.getElementById("autoQuest")).checked = false;
                            setStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest", "false");

                            logHHAuto("Auto-quest disabled since it requires battle and auto-battle has errors.");
                        }
                        return;
                    }
                    logHHAuto("Crushing: "+Trollz[Number(TTF)]);
                    //console.log(battleButton);
                    //replaceCheatClick();
                    checkPreviousFightDone();
                    setStoredValue(HHStoredVarPrefixKey+"Temp_trollPoints", currentPower);
                    battleButton[0].click();
                }
                else
                {
                    // We need more power.
                    const battle_price = 1; // TODO what is the expected value here ?
                    logHHAuto("Battle requires "+battle_price+" power.");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired", battle_price);
                    if(getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement") === "battle")
                    {
                        setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "P"+battle_price);
                    }
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return;
                }
            }
            else
            {
                checkPreviousFightDone();
                setStoredValue(HHStoredVarPrefixKey+"Temp_trollPoints", currentPower);
                //replaceCheatClick();
                battleButton[0].click();
            }
        }
        else
        {
            logHHAuto('Unable to identify page.');
            gotoPage(getHHScriptVars("pagesIDHome"));
            return;
        }
        return;
    }

    static RechargeCombat()
    {
        const Hero=getHero();

        let canBuyResult = Troll.canBuyFight();
        if (canBuyResult.canBuy)
        {
            logHHAuto('Recharging '+canBuyResult.toBuy+' fights for '+canBuyResult.price+' kobans.');
            let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
            setHHVars('Hero.infos.hc_confirm',true);
            // We have the power.
            //replaceCheatClick();
            //console.log($("plus[type='energy_fight']"), canBuyResult.price,canBuyResult.type, canBuyResult.max);
            Hero.recharge($("button.orange_text_button.manual-recharge"), canBuyResult.type, canBuyResult.max, canBuyResult.price);
            setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
            logHHAuto('Recharged up to '+canBuyResult.max+' fights for '+canBuyResult.price+' kobans.');
        }
    }

    
    static canBuyFight(logging=true)
    {
        let type="fight";
        let hero=getHero();
        let result = {canBuy:false, price:0, max:0, toBuy:0, event_mythic:"false", type:type};
        const MAX_BUY = 200;
        let maxx50 = 50;
        let maxx20 = 20;
        const currentFight = Troll.getEnergy();
        const eventAutoBuy =  Math.min(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoBuyTrollNumber"))       || maxx20, MAX_BUY-currentFight);
        const mythicAutoBuy = Math.min(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoBuyMythicTrollNumber")) || maxx20, MAX_BUY-currentFight);
        const pricePerFight = hero.energies[type].seconds_per_point * (unsafeWindow.hh_prices[type + '_cost_per_minute'] / 60);
        let remainingShards;

        if (getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl") !== undefined && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_shards && Number.isInteger(Number(JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_shards)))
        {
            if (
                (
                    getStoredValue(HHStoredVarPrefixKey+"Setting_buyCombat") =="true"
                    && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") ==="true"
                    && getSecondsLeft("eventGoing") !== 0
                    && !Number.isNaN(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_buyCombTimer")))
                    && getSecondsLeft("eventGoing") < getStoredValue(HHStoredVarPrefixKey+"Setting_buyCombTimer")*3600
                    && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "false"
                )
                ||
                (
                    getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true"
                    && getStoredValue(HHStoredVarPrefixKey+"Setting_buyMythicCombat") === "true"
                    && getSecondsLeft("eventMythicGoing") !== 0
                    && !Number.isNaN(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_buyMythicCombTimer")))
                    && getSecondsLeft("eventMythicGoing") < getStoredValue(HHStoredVarPrefixKey+"Setting_buyMythicCombTimer")*3600
                    && JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic === "true"
                )
            )
            {
                result.event_mythic = JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).is_mythic;
            }
            else
            {
                return result;
            }

            maxx50 = result.event_mythic === "true" ? Math.max(maxx50, mythicAutoBuy) : Math.max(maxx50, eventAutoBuy);
            maxx20 = result.event_mythic === "true" ? mythicAutoBuy : eventAutoBuy;

            //console.log(result);
            remainingShards = Number(100 - Number(JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventGirl")).girl_shards));
            if
                (
                    getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50") !== undefined
                    && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")))
                    && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50"))
                    && getHHVars('Hero.currencies.hard_currency')>= (pricePerFight * maxx50)+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank"))
                    && getStoredValue(HHStoredVarPrefixKey+"Setting_useX50Fights") === "true"
                    && currentFight < maxx50
                    && ( result.event_mythic === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_useX50FightsAllowNormalEvent") === "true")
                )
            {
                result.max = maxx50;
                result.canBuy = true;
                result.price = pricePerFight * maxx50;
                result.toBuy = maxx50;
            }
            else
            {

                if (logging && getStoredValue(HHStoredVarPrefixKey+"Setting_useX50Fights") === "true")
                {
                    logHHAuto('Unable to recharge up to '+maxx50+' for '+(pricePerFight * maxx50)+' kobans : current energy : '+currentFight+', remaining shards : '+remainingShards+'/'+getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                }
                if (getHHVars('Hero.currencies.hard_currency')>=(pricePerFight * maxx20)+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank"))
                )//&& currentFight < 10)
                {
                    result.max = maxx20;
                    result.canBuy = true;
                    result.price = pricePerFight * maxx20;
                    result.toBuy = maxx20;
                }
                else
                {
                    if (logging)
                    {
                        logHHAuto('Unable to recharge up to '+maxx20+' for '+(pricePerFight * maxx20)+' kobans : current energy : '+currentFight+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                    }
                    return result;
                }
            }
        }

        return result;
    }
}
