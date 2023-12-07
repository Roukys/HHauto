import { getHHScriptVars, getHHVars } from "../../Helper";

export class SultryMysteries {
    static isEnabled(){
        return getHHVars('Hero.infos.level')>=getHHScriptVars("LEVEL_MIN_EVENT_SM");
    }
}