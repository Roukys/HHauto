import { ConfigHelper, getHHVars } from "../../Helper/index";

export class SultryMysteries {
    static isEnabled(){
        return getHHVars('Hero.infos.level')>=ConfigHelper.getHHScriptVars("LEVEL_MIN_EVENT_SM");
    }
}