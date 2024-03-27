import { ConfigHelper, HeroHelper } from "../../Helper/index";

export class SultryMysteries {
    static isEnabled(){
        return HeroHelper.getLevel()>=ConfigHelper.getHHScriptVars("LEVEL_MIN_EVENT_SM");
    }
}