import {
    checkTimer,
    ConfigHelper,
    deleteStoredValue,
    getHero,
    getHHVars,
    getPage,
    getSecondsLeft,
    getStoredValue,
    getTextForUI,
    HeroHelper,
    queryStringGetParam,
    RewardHelper,
    setHHVars,
    setStoredValue,
} from '../Helper/index';
import { gotoPage } from '../Service/index';
import { isJSON, logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { EventGirl } from '../model/EventGirl';
import { Booster } from './Booster';
import { EventModule } from "./Events/index";
import { Harem } from "./harem/Harem";

export class Troll {

    static getEnergy() {
        return Number(getHHVars('Hero.energies.fight.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.fight.max_regen_amount'));
    }

    static getTrollWithGirls() {
        const girlDictionary = Harem.getGirlsList();
        const trollGirlsID = ConfigHelper.getHHScriptVars("trollGirlsID");
        const sideTrollGirlsID = ConfigHelper.getHHScriptVars("sideTrollGirlsID");
        const trollWithGirls:number[] = [];
    
        if (girlDictionary) {
            for (var tIdx = 0; tIdx < trollGirlsID.length; tIdx++) {
                trollWithGirls[tIdx] = 0;
                for (var pIdx = 0; pIdx < trollGirlsID[tIdx].length; pIdx++) {
                    for (var gIdx = 0; gIdx < trollGirlsID[tIdx][pIdx].length; gIdx++) {
                        var idGirl = parseInt(trollGirlsID[tIdx][pIdx][gIdx], 10);
                        if (idGirl != 0 && (girlDictionary.get(""+idGirl) == undefined || girlDictionary.get(""+idGirl).shards < 100)) {
                            trollWithGirls[tIdx] += 1;
                        }
                    }
                }
            }

            if (Object.keys(sideTrollGirlsID).length > 0) {
                for (let tIdx of Object.keys(sideTrollGirlsID)) {
                    trollWithGirls[tIdx] = 0;
                    for (var pIdx = 0; pIdx < sideTrollGirlsID[tIdx].length; pIdx++) {
                        for (var gIdx = 0; gIdx < sideTrollGirlsID[tIdx][pIdx].length; gIdx++) {
                            var idGirl = parseInt(sideTrollGirlsID[tIdx][pIdx][gIdx], 10);
                            if (idGirl != 0 && (girlDictionary.get("" + idGirl) == undefined || girlDictionary.get("" + idGirl).shards < 100)) {
                                trollWithGirls[tIdx] += 1;
                            }
                        }
                    }
                }
            }
        }
        return trollWithGirls;
    }

    static getPinfo(contest) {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollThreshold")) || 0;
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollRunThreshold")) || 0;

        let Tegzd = '<li>';
        Tegzd += getTextForUI("autoTrollTitle","elementText")+' ' + Troll.getEnergy()+'/'+Troll.getEnergyMax()+contest;
        if (runThreshold > 0) {
            Tegzd += ' ('+threshold+'<'+Troll.getEnergy()+'<='+runThreshold+')';
            if(Troll.getEnergy() < runThreshold)  Tegzd += ' ' + getTextForUI("waitRunThreshold","elementText");
        }
        Tegzd += '</li>';
        return Tegzd;
    }

    static isEnabled(){
        return ConfigHelper.getHHScriptVars("isEnabledTrollBattle", false) && getHHVars('Hero.infos.questing.id_world') > 0
    }

    static isTrollFightActivated(){
        return Troll.isEnabled() &&
        (getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle") === "true" || getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") === "true")
    }

    static getLastTrollIdAvailable(logging = false, id_world: number = undefined): number {
        const isMainAdventure = getHHVars('Hero.infos.questing.choices_adventure') == 0;
        if (!id_world) {
            id_world = Number(getHHVars('Hero.infos.questing.id_world'));
        } else if (id_world <= 0) {
            logHHAuto(`id_world given ${id_world} must be wrong, default to current world`);
            id_world = Number(getHHVars('Hero.infos.questing.id_world'));
        }
        let trollIdMapping = [];

        if (isMainAdventure) {
            trollIdMapping = ConfigHelper.getHHScriptVars("trollIdMapping");
            if(ConfigHelper.isPshEnvironnement() && id_world > 10) {
                if (trollIdMapping.hasOwnProperty(id_world)) {
                    return trollIdMapping[id_world] // PSH parallel adventures
                }
                if (logging) logHHAuto(`Error Troll ID mapping need to be updated with world ${id_world}`);
            }
        } else {
            logHHAuto(`Side adventure detected with world ${id_world}`);
            trollIdMapping = ConfigHelper.getHHScriptVars("sideTrollIdMapping");
        }

        if (Object.keys(trollIdMapping).length > 0 && trollIdMapping.hasOwnProperty(id_world)) {
            if (logging) logHHAuto(`Troll ID mapping (${trollIdMapping[id_world]}) found for world ${id_world}`);
            return trollIdMapping[id_world];
        }
        return id_world - 1;
    }

    static getTrollIdFromEvent(eventGirl:any){
        if(eventGirl && EventModule.isEventActive(eventGirl.event_id)) {
            return eventGirl.troll_id;
        }else {
            if(eventGirl) EventModule.clearEventData(eventGirl.event_id);
            logHHAuto("Event troll completed, clear event and get new troll ID");
            return Troll.getTrollIdToFight();
        }
    }

    static getTrollSelectedIndex(){
        let autoTrollSelectedIndex = getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollSelectedIndex");
        if (autoTrollSelectedIndex === undefined || isNaN(autoTrollSelectedIndex)) {
            autoTrollSelectedIndex = -1;
        } else {
            autoTrollSelectedIndex = Number(autoTrollSelectedIndex);
        }
        return autoTrollSelectedIndex;
    }

    static getTrollIdToFight(): number {

        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        let trollWithGirls = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls")):[];
        const autoTrollSelectedIndex = Troll.getTrollSelectedIndex();


        let TTF: number = 0;
        const isMainAdventure = getHHVars('Hero.infos.questing.choices_adventure') == 0;
        const lastWorldMainAdventure = getStoredValue(HHStoredVarPrefixKey + "Temp_MainAdventureWorldID") || -1; 
        const lastTrollIdAvailable = Troll.getLastTrollIdAvailable(true);
        const eventGirl = EventModule.getEventGirl();
        const eventMythicGirl = EventModule.getEventMythicGirl();
        if (debugEnabled) {
            logHHAuto('eventGirl', eventGirl);
            logHHAuto('eventMythicGirl', eventMythicGirl);
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true" && !checkTimer("eventMythicGoing") && eventMythicGirl.girl_id && eventMythicGirl.is_mythic)
        {
            logHHAuto("Mythic Event troll fight");
            TTF = Troll.getTrollIdFromEvent(eventMythicGirl);
        }
        else if (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true" && !checkTimer("eventGoing") && eventGirl.girl_id && !eventGirl.is_mythic) {
            logHHAuto("Event troll fight");
            TTF = Troll.getTrollIdFromEvent(eventGirl);
        }
        else if (autoTrollSelectedIndex === 98 || autoTrollSelectedIndex === 99) {
            if (trollWithGirls === undefined || trollWithGirls.length === 0) {
                logHHAuto("No troll with girls from storage, parsing game info ...");
                trollWithGirls = Troll.getTrollWithGirls();
                if (trollWithGirls.length === 0) {
                    logHHAuto("Need girls list, going to Waifu page to get them");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDWaifu"));
                    return -1;
                }
                setStoredValue(HHStoredVarPrefixKey+"Temp_trollWithGirls", JSON.stringify(trollWithGirls));
            }

            if (trollWithGirls !== undefined && trollWithGirls.length > 0) {
                if (autoTrollSelectedIndex === 98) {
                    if (debugEnabled) logHHAuto("First troll with girls from storage");
                    TTF = trollWithGirls.findIndex((troll: number) => troll > 0) + 1;
                }
                else if (autoTrollSelectedIndex === 99) {
                    if (debugEnabled) logHHAuto("Last troll with girls from storage");
                    TTF = trollWithGirls.findLastIndex((troll: number) => troll > 0) + 1;
                    if(TTF > lastTrollIdAvailable) {
                        TTF=lastTrollIdAvailable;
                    }
                }
            } else if(getPage()!==ConfigHelper.getHHScriptVars("pagesIDHome")) {
                logHHAuto("Can't get troll with girls, going to home page to get girl list.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
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
        const trollz = ConfigHelper.getHHScriptVars("trollzList");
        const sideTrollz = ConfigHelper.getHHScriptVars("sideTrollzList");
        if (!isMainAdventure && !sideTrollz.hasOwnProperty(TTF) && TTF >= lastWorldMainAdventure) {
            logHHAuto(`Error: Side adventure selected and troll ${TTF} from main adventure. Backup to ${lastTrollIdAvailable}`);
            TTF = lastTrollIdAvailable;
        }
        if (TTF <= 0) {
            TTF = lastTrollIdAvailable > 0 ? lastTrollIdAvailable : 1;
            logHHAuto(`Error: wrong troll target found. Backup to ${TTF}`);
        }
        if (TTF >= trollz.length && !sideTrollz.hasOwnProperty(TTF)) {
            logHHAuto("Error: New troll implemented '"+TTF+"' (List to be updated) or wrong troll target found");
            TTF = 1;
        }
        return TTF;
    }

    static async doBossBattle()
    {
        var currentPower = Troll.getEnergy();
        if(currentPower < 1)
        {
            const eventGirl = EventModule.getEventGirl();
            const eventMythicGirl = EventModule.getEventMythicGirl();
            //logHHAuto("No power for battle.");
            if (!Troll.canBuyFight(eventGirl).canBuy && !Troll.canBuyFight(eventMythicGirl).canBuy)
            {
                return false;
            }
        }

        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollRunThreshold")) || 0;
        if (runThreshold > 0 && currentPower == runThreshold) {
            setStoredValue(HHStoredVarPrefixKey+"Temp_TrollHumanLikeRun", "true");
        }

        let TTF = Troll.getTrollIdToFight();
        const trollz = ConfigHelper.getHHScriptVars("trollzList");
        const currentPage = getPage();

        if (!TTF || TTF <= 0) {
            if (getStoredValue(HHStoredVarPrefixKey + "Temp_TrollInvalid") === "true") {
                logHHAuto(`ERROR: Invalid troll N°${TTF}, again, going to first troll`);
                TTF = 1;
            }else {
                logHHAuto(`ERROR: Invalid troll N°${TTF}, do not fight, retry...`);
                setStoredValue(HHStoredVarPrefixKey + "Temp_TrollInvalid", "true");
                return true;
            }
        }

        if (Booster.needSandalWoodEquipped(TTF))
        {
            if (currentPage !== ConfigHelper.getHHScriptVars("pagesIDShop")) {
                logHHAuto('Go to Shop page to update booster status');
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDShop"));
                return true;
            } else {
                logHHAuto('Updating booster status');
                Booster.collectBoostersFromMarket();
                const equipped = await Booster.equipeSandalWoodIfNeeded(TTF);
                if(equipped) {
                    logHHAuto('Updating booster status after new booster equipped before fight');
                    Booster.collectBoostersFromMarket();
                }
            }
        }

        logHHAuto(`Fighting troll N°${TTF}, ${trollz[Number(TTF)]}`);

        // Battles the latest boss.
        // Navigate to latest boss.
        //console.log(getPage());
        if (currentPage === ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle") && window.location.search.includes("id_opponent=" + TTF))
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
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
            //End week 28 new battle modification
            return true;
        }
    }

    static CrushThemFights()
    {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle")) {
            // On battle page.
            logHHAuto("On Pre battle page.");
            let TTF:number = Number(queryStringGetParam(window.location.search,'id_opponent'));
            const trollz = ConfigHelper.getHHScriptVars("trollzList");

            let battleButton = $('#pre-battle .battle-buttons a.green_button_L.battle-action-button');
            let battleButtonX10 = $('#pre-battle .battle-buttons button.autofight[data-battles="10"]');
            let battleButtonX50 = $('#pre-battle .battle-buttons button.autofight[data-battles="50"]');
            let battleButtonX10Price = Number(battleButtonX10.attr('price'));
            let battleButtonX50Price = Number(battleButtonX50.attr('price'));
            // let Hero=getHero();
            let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
            let remainingShards: number;
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
            let eventTrollGirl:EventGirl;
            const eventGirl = EventModule.getEventGirl();
            const eventMythicGirl = EventModule.getEventMythicGirl();
            if (TTF !== null)
            {
                const rewardGirlz = $("#pre-battle .oponnent-panel .opponent_rewards .rewards_list .slot.girl_ico[data-rewards]");
                const trollGirlRewards = rewardGirlz.attr('data-rewards') || '';
                const autoTrollSelectedIndex = Troll.getTrollSelectedIndex();
                if (eventMythicGirl.girl_id && TTF === eventMythicGirl.troll_id && eventMythicGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true")
                {
                    eventTrollGirl = eventMythicGirl;
                    if (rewardGirlz.length === 0 || !trollGirlRewards.includes('"id_girl":' + eventMythicGirl.girl_id))
                    {
                        logHHAuto(`Seems ${eventMythicGirl.name} is no more available at troll ${trollz[Number(TTF)]}. Going to event page.`);
                        EventModule.parseEventPage(eventMythicGirl.event_id);
                        return true;
                    }
                }
                if (eventGirl.girl_id && TTF === eventGirl.troll_id && !eventGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true")
                {
                    eventTrollGirl = eventGirl;
                    if (rewardGirlz.length === 0 || !trollGirlRewards.includes('"id_girl":' + eventGirl.girl_id)) {
                        logHHAuto(`Seems ${eventGirl.name} is no more available at troll ${trollz[Number(TTF)]}. Going to event page.`);
                        EventModule.parseEventPage(eventGirl.event_id);
                        return true;
                    }
                }
                if (rewardGirlz.length === 0 && (autoTrollSelectedIndex === 98 || autoTrollSelectedIndex === 99))
                {
                    logHHAuto(`Seems no more girls available at troll ${trollz[Number(TTF)]}, looking for next troll.`);
                    let trollWithGirls = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls")) : [];
                    trollWithGirls[TTF] = 0;
                    setStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls", JSON.stringify(trollWithGirls));
                    const newTroll = Troll.getTrollIdToFight();
                    if (TTF != newTroll) {
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"), { id_opponent: newTroll });
                        return true;
                    } else {
                        logHHAuto(`Same troll found, go for it.`);
                    }
                }
                let canBuyFightsResult = Troll.canBuyFight(eventTrollGirl);
                if (
                    (canBuyFightsResult.canBuy && currentPower === 0)
                    ||
                    (
                        canBuyFightsResult.canBuy
                        && currentPower < 50
                        && canBuyFightsResult.max === 50
                        && getStoredValue(HHStoredVarPrefixKey+"Setting_useX50Fights") === "true"
                        && (eventTrollGirl?.is_mythic || getStoredValue(HHStoredVarPrefixKey+"Setting_useX50FightsAllowNormalEvent") === "true")
                        && TTF === eventTrollGirl?.troll_id
                    )
                    ||
                    (
                        canBuyFightsResult.canBuy
                        && currentPower < 10
                        && canBuyFightsResult.max === 20
                        && getStoredValue(HHStoredVarPrefixKey + "Setting_useX10Fights") === "true"
                        && (eventTrollGirl?.is_mythic || getStoredValue(HHStoredVarPrefixKey+"Setting_useX10FightsAllowNormalEvent") === "true")
                        && TTF === eventTrollGirl?.troll_id
                    )
                )
                {
                    Troll.RechargeCombat(eventTrollGirl);
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
                    return true;
                }

                if
                    (
                        Number.isInteger(eventTrollGirl?.shards)
                        && battleButtonX10.length > 0
                        && battleButtonX50.length > 0
                        && getStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest") !== "true"
                    )
                {
                    remainingShards = Number(100 - eventTrollGirl?.shards);
                    let bypassThreshold = (
                        (eventTrollGirl?.is_mythic
                        && canBuyFightsResult.canBuy
                        ) // eventGirl available and buy comb true
                        || (eventTrollGirl?.is_mythic && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true"
                        )
                    );

                    if (getStoredValue(HHStoredVarPrefixKey+"Setting_useX50Fights") === "true"
                        && getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")
                        && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")))
                        && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50"))
                        && (battleButtonX50Price === 0 || HeroHelper.getKoban()>=battleButtonX50Price+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")))
                        && currentPower >= 50
                        && (currentPower >= (Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold")) + 50)
                            || bypassThreshold
                        )
                        && (eventTrollGirl?.is_mythic || getStoredValue(HHStoredVarPrefixKey+"Setting_useX50FightsAllowNormalEvent") === "true")
                    )
                    {
                        logHHAuto("Going to crush 50 times: "+trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');

                        setHHVars('Hero.infos.hc_confirm',true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX50[0].click();
                        setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                        //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", Number(getStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh")) - 50);
                        logHHAuto("Crushed 50 times: "+trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');
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
                            logHHAuto('Unable to use x50 for '+battleButtonX50Price+' kobans,fights : '+Troll.getEnergy()+'/50, remaining shards : '+remainingShards+'/'+getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")+', kobans : '+HeroHelper.getKoban()+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                        }
                    }

                    if (getStoredValue(HHStoredVarPrefixKey+"Setting_useX10Fights") === "true"
                        && getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10")
                        && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10")))
                        && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10"))
                        && (battleButtonX10Price === 0 || HeroHelper.getKoban()>=battleButtonX10Price+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")))
                        && currentPower >= 10
                        && (currentPower >= (Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold")) + 10)
                            || bypassThreshold
                        )
                        && (eventTrollGirl.is_mythic || getStoredValue(HHStoredVarPrefixKey+"Setting_useX10FightsAllowNormalEvent") === "true")
                    )
                    {
                        logHHAuto("Going to crush 10 times: "+trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');

                        setHHVars('Hero.infos.hc_confirm',true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX10[0].click();
                        setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                        //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", Number(getStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh")) - 10);
                        logHHAuto("Crushed 10 times: "+trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');
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
                            logHHAuto('Unable to use x10 for '+battleButtonX10Price+' kobans,fights : '+Troll.getEnergy()+'/10, remaining shards : '+remainingShards+'/'+getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX10")+', kobans : '+HeroHelper.getKoban()+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                        }
                    }
                }

                //Crushing one by one


                if (currentPower > 0)
                {
                    if ($('#pre-battle div.battle-buttons a.single-battle-button[disabled]').length>0)
                    {
                        logHHAuto("Battle Button seems disabled, force reload of page.");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
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
                    logHHAuto("Crushing: "+trollz[Number(TTF)]);
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
                    logHHAuto(`Battle requires ${battle_price} power, having ${currentPower}.`);
                    setStoredValue(HHStoredVarPrefixKey+"Temp_battlePowerRequired", battle_price);
                    if(getStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement") === "battle")
                    {
                        setStoredValue(HHStoredVarPrefixKey+"Temp_questRequirement", "P"+battle_price);
                    }
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
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
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            return;
        }
        return;
    }

    static RechargeCombat(eventTrollGirl: EventGirl)
    {
        const Hero=getHero();

        let canBuyResult = Troll.canBuyFight(eventTrollGirl);
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

    
    static canBuyFight(eventGirl:EventGirl, logging=true)
    {
        const type="fight";
        let hero=getHero();
        let result = {canBuy:false, price:0, max:0, toBuy:0, event_mythic:"false", type:type};
        const MAX_BUY = 200;
        let maxx50 = 50;
        let maxx20 = 20;
        const currentFight = Troll.getEnergy();
        const eventAutoBuy =  Math.min(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoBuyTrollNumber"))       || maxx20, MAX_BUY-currentFight);
        const mythicAutoBuy = Math.min(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoBuyMythicTrollNumber")) || maxx20, MAX_BUY-currentFight);
        const pricePerFight = hero.energies[type].seconds_per_point * (unsafeWindow.hh_prices[type + '_cost_per_minute'] / 60);
        let remainingShards:number;

        if (Number.isInteger(eventGirl?.shards))
        {
            if (
                (
                    getStoredValue(HHStoredVarPrefixKey+"Setting_buyCombat") =="true"
                    && getStoredValue(HHStoredVarPrefixKey+"Setting_plusEvent") ==="true"
                    && getSecondsLeft("eventGoing") !== 0
                    && !Number.isNaN(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_buyCombTimer")))
                    && getSecondsLeft("eventGoing") < getStoredValue(HHStoredVarPrefixKey+"Setting_buyCombTimer")*3600
                    && eventGirl.girl_id && !eventGirl.is_mythic
                )
                ||
                (
                    getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true"
                    && getStoredValue(HHStoredVarPrefixKey+"Setting_buyMythicCombat") === "true"
                    && getSecondsLeft("eventMythicGoing") !== 0
                    && !Number.isNaN(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_buyMythicCombTimer")))
                    && getSecondsLeft("eventMythicGoing") < getStoredValue(HHStoredVarPrefixKey+"Setting_buyMythicCombTimer")*3600
                    && eventGirl.is_mythic
                )
            )
            {
                result.event_mythic = eventGirl.is_mythic.toString();
            }
            else
            {
                return result;
            }

            maxx50 = result.event_mythic === "true" ? Math.max(maxx50, mythicAutoBuy) : Math.max(maxx50, eventAutoBuy);
            maxx20 = result.event_mythic === "true" ? mythicAutoBuy : eventAutoBuy;

            //console.log(result);
            remainingShards = Number(100 - eventGirl.shards);
            if
                (
                    getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50") !== undefined
                    && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")))
                    && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50"))
                    && HeroHelper.getKoban()>= (pricePerFight * maxx50)+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank"))
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
                    logHHAuto('Unable to recharge up to '+maxx50+' for '+(pricePerFight * maxx50)+' kobans : current energy : '+currentFight+', remaining shards : '+remainingShards+'/'+getStoredValue(HHStoredVarPrefixKey+"Setting_minShardsX50")+', kobans : '+HeroHelper.getKoban()+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                }
                if (HeroHelper.getKoban()>=(pricePerFight * maxx20)+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank"))
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
                        logHHAuto('Unable to recharge up to '+maxx20+' for '+(pricePerFight * maxx20)+' kobans : current energy : '+currentFight+', kobans : '+HeroHelper.getKoban()+'/'+Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank")));
                    }
                    return result;
                }
            }
        }

        return result;
    }
}