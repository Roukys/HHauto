import {
    getHHScriptVars,
    getHHVars
} from "../Helper";
import { logHHAuto } from "../Utils";
import { HHAuto_inputPattern } from "../config";


export class MonthlyCards {
    static updateInputPattern() {
        try {
            if(getHHScriptVars('isEnabledTrollBattle',false)) {
                const maxRegenFight = getHHVars('Hero.energies.fight.max_regen_amount');
                if(maxRegenFight && maxRegenFight > 20) {
                    // 20 - 30 - 40 - 50 - 60
                    const lastAllowedTenth = (maxRegenFight / 10) - 1;
                    HHAuto_inputPattern.autoTrollThreshold = "[1-"+lastAllowedTenth+"]?[0-9]";
                }
            }
            if(getHHScriptVars('isEnabledSeason',false)) {
                const maxRegenKiss = getHHVars('Hero.energies.kiss.max_regen_amount');
                if(maxRegenKiss && maxRegenKiss > 10) {
                    // 10 - 20 - 30 - 40 - 50
                    const lastAllowedTenth = (maxRegenKiss / 10) - 1;
                    HHAuto_inputPattern.autoSeasonThreshold = "[1-"+lastAllowedTenth+"]?[0-9]";
                }
            }
            if(getHHScriptVars('isEnabledQuest',false)) {
                const maxRegenQuest = getHHVars('Hero.energies.quest.max_regen_amount');
                if(maxRegenQuest && maxRegenQuest > 100) {
                    // 100 - 150 - 200 - 250 - 300
                    if(maxRegenQuest === 200 || maxRegenQuest === 300) {
                        const lastAllowedHundred = (Hero.energies.kiss.max_regen_amount / 100) - 1;
                        HHAuto_inputPattern.autoQuestThreshold = "[1-"+lastAllowedHundred+"][0-9][0-9]|[1-9]?[0-9]";
                    } else if(maxRegenQuest === 250 ){
                        HHAuto_inputPattern.autoQuestThreshold = "2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]";
                    } else {
                        HHAuto_inputPattern.autoQuestThreshold = "1[0-4][0-9]|[1-9]?[0-9]";
                    }
                }
            }
            if(getHHScriptVars('isEnabledLeagues',false)) {
                const maxRegenLeague = getHHVars('Hero.energies.challenge.max_regen_amount');
                if(maxRegenLeague && maxRegenLeague > 15) {
                    // 15 - 18 - 23 - 26 - 30
                    switch (maxRegenLeague)
                    {
                        case 18 : HHAuto_inputPattern.autoLeaguesThreshold = "1[0-7]|[0-9]"; break;
                        case 23 : HHAuto_inputPattern.autoLeaguesThreshold = "2[0-2]|1[0-9]|[0-9]"; break;
                        case 26 : HHAuto_inputPattern.autoLeaguesThreshold = "2[0-5]|1[0-9]|[0-9]"; break;
                        case 30 : HHAuto_inputPattern.autoLeaguesThreshold = "2[0-9]|1[0-9]|[0-9]"; break;
                    }
                }
            }
            if(getHHScriptVars('isEnabledPantheon',false)) {
                const maxRegenPantheon = getHHVars('Hero.energies.worship.max_regen_amount');
                if(maxRegenPantheon && maxRegenPantheon > 10) {
                    // 10 - 15 - 20 - 25 - 30
                    switch (maxRegenPantheon)
                    {
                        case 15 : HHAuto_inputPattern.autoPantheonThreshold = "1[0-4]|[0-9]"; break;
                        case 20 : HHAuto_inputPattern.autoPantheonThreshold = "1[0-9]|[0-9]"; break;
                        case 25 : HHAuto_inputPattern.autoPantheonThreshold = "2[0-4]|1[0-9]|[0-9]"; break;
                        case 30 : HHAuto_inputPattern.autoPantheonThreshold = "[1-2][0-9]|[0-9]"; break;
                    }
                }
            }
        } catch(e) {
            logHHAuto("Catched error : Couldn't parse card info, input patern kept as default : "+e);
        }
    }
}