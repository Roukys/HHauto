import {
    RewardHelper,
    TimeHelper,
    checkTimer,
    convertTimeToInt,
    ConfigHelper,
    getHHVars,
    getLimitTimeBeforeEnd,
    getPage,
    getSecondsLeft,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer, 
    HeroHelper} from "../../Helper/index";
    import { gotoPage } from "../../Service/index";
    import { isJSON, logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";
import { EventGirl } from "../../model/EventGirl";
import { LoveRaid } from "../../model/LoveRaid";
import { KKLoveRaid } from "../../model/index";

export class LoveRaidManager {
    static parse() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLoveRaid")) {
            try{
                const raids: LoveRaid[] = LoveRaidManager.parseRaids();
                LoveRaidManager.saveLoveRaids(raids);

                const firstEndingRaid = LoveRaidManager.getFirstEndingRaid(raids);
                if(firstEndingRaid){
                    setTimer('nextLoveRaidTime', firstEndingRaid.seconds_until_event_end + randomInterval(10, 300));
                }else{
                    setTimer('nextLoveRaidTime', randomInterval(3600, 4000));
                }
            } catch ({ errName, message }) {
                logHHAuto(`ERROR during Love raid run: ${message}, retry in 1h`);
                setTimer('nextLoveRaidTime', randomInterval(3600, 4000));
                return false;
            }
        }
        else {
            logHHAuto("Switching to Love raid screen.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDLoveRaid"));
            return true;
        }
    }
    static getFirstEndingRaid(raids: LoveRaid[]): LoveRaid | null {
        return raids.sort((a, b) => (a.seconds_until_event_end - b.seconds_until_event_end))[0] || null;
    }
    static getAllRaids(): LoveRaid[] {
        let raids: LoveRaid[] = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_loveRaids")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_loveRaids")) : [];
        return raids;
    }
    static getTrollRaids(): LoveRaid[]{
        return LoveRaidManager.getAllRaids().filter(raid => raid.trollId !== undefined);
    }
    static getChampionRaids(): LoveRaid[] {
        return LoveRaidManager.getAllRaids().filter(raid => raid.championId !== undefined);
    }
    static getSeasonRaids(): LoveRaid[] {
        return LoveRaidManager.getAllRaids().filter(raid => raid.raid_module_type === 'season');
    }
    static saveLoveRaids(raids: LoveRaid[]){
        setStoredValue(HHStoredVarPrefixKey + "Temp_loveRaids", JSON.stringify(raids));
    }
    static getFirstTrollRaidsWithGirlToWin(raids: LoveRaid[]): LoveRaid | undefined {
        if(!raids || raids.length === 0) {
            raids = LoveRaidManager.getTrollRaids();
        }
        const raidWithGirls = raids.filter(raid => raid.girl_shards < 100);
        if (raidWithGirls.length > 0) {
            return raidWithGirls[0];
        }
        return undefined;
    }
    static parseRaids(): LoveRaid[]{
        const raids: LoveRaid[] = [];
        const kkRaids: KKLoveRaid[] = love_raids != undefined ? love_raids : [];

        for (let index = 0; index < kkRaids.length; index++) {
            const kkRaid = kkRaids[index];
            try {
                if (kkRaid.status == 'ongoing') {
                    logHHAuto(`parsing raid ${kkRaid.event_name} module ${kkRaid.raid_module_type}`);
                    if (kkRaid.all_is_owned == true) {
                        logHHAuto(`nothing to win, ignoring raid`);
                        continue;
                    }
                    const raid: LoveRaid = new LoveRaid();
                    raid.id_girl = Number(kkRaid.id_girl);
                    raid.girl_shards = Number(kkRaid.girl_data.shards);
                    raid.girl_to_win = kkRaid.girl_data.shards < 100;
                    if (kkRaid.girl_data.shards >= 100) {
                        logHHAuto(`Girl won, may have skin to win, ignore for now`);
                    }
                    raid.raid_module_type = kkRaid.raid_module_type;
                    raid.seconds_until_event_end = Number(kkRaid.seconds_until_event_end);
                    raid.seconds_until_event_start = Number(kkRaid.seconds_until_event_start);
                    raid.event_duration_seconds = Number(kkRaid.event_duration_seconds);
                    raid.start_datetime = kkRaid.start_datetime;
                    raid.end_datetime = kkRaid.end_datetime;
                    raid.shards_left = Number(kkRaid.tranche_data.shards_left);

                    if ($('.raid-card')[index].classList.contains('multiple-girl')) {
                        let girlSkinShards = parseInt($($($('.raid-card')[index].getElementsByClassName('shards'))[1]).attr('skins-shard'), 10);
                        raid.skin_to_win = girlSkinShards < 33;
                        raid.girl_skin_shards = girlSkinShards; // owned
                    }

                    switch (kkRaid.raid_module_type) {
                        case 'troll':
                            raid.trollId = Number(kkRaid.raid_module_pk);
                            break;
                        case 'champion':
                            raid.championId = Number(kkRaid.raid_module_pk);
                            break;
                        case 'season':
                            // ?
                            break;
                        default:
                            logHHAuto('Unknown raid type, ingoring raid');
                            continue;
                    }

                    raids.push(raid);
                }
            } catch (error) {
                logHHAuto('Error parsing raid');
            }
        }
        // console.log('raids', raids);
        // Sort by troll Id
        // raids.sort((a, b) => {
        //     return Number(a.trollId) - Number(b.trollId);
        // });
        // console.log('raids sorted', raids);

        return raids;
    }
    static getRaidGirls(): EventGirl[]{
        let raidsGirls: EventGirl[] = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_raidGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_raidGirls")) : [];      
        return raidsGirls;
    }
    static isEnabled(){
        return ConfigHelper.getHHScriptVars("isEnabledRaidOfLive", false);// && HeroHelper.getLevel() >= ConfigHelper.getHHScriptVars("LEVEL_MIN_POG");
    }
    static isActivated(){
        return LoveRaidManager.isEnabled() && getStoredValue(HHStoredVarPrefixKey + "Setting_plusLoveRaid") === "true";
    }
    static styles(){
        $('.love-raids-container').removeClass('height-for-ad');
    }
}