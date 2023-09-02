import { getHHScriptVars, getHHVars } from "../Helper";
import { logHHAuto } from "../Utils";
import { HHEnvVariables } from "../config";

export class Club {
    static run(){
        const onChampTab = $("div.club-champion-members-challenges:visible").length === 1;
        if(onChampTab) {
            $('button.orange_button_L.btn_skip_team_cooldown').css('display', 'none');
            if (!$('button.orange_button_L.btn_skip_champion_cooldown').length) {
                $('.challenge_container').css('display', 'block');
            }
        }
    }
    static checkClubStatus()
    {
        let chatVars = null;
        try {
            chatVars = getHHVars("Chat_vars.CLUB_INFO.id_club", false);
        } catch(e) {
            logHHAuto("Catched error : Couldn't parse CLUB_INFO : "+e);
        }
        if (chatVars === null || chatVars === false)
        {
            HHEnvVariables[getHHScriptVars("HHGameName")].isEnabledClubChamp = false;
        }
    }
}