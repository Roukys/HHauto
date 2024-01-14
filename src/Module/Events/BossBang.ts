import { getStoredValue, randomInterval, setStoredValue } from "../../Helper/index";
import { gotoPage } from "../../Service/index";
import { logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";

export class BossBang {
    static skipFightPage()
    {
        const rewardsButton = $('#rewards_popup .blue_button_L:not([disabled]):visible');
        const skipFightButton = $('#battle #new-battle-skip-btn:not([disabled]):visible');
        if(rewardsButton.length > 0)
        {
            logHHAuto("Click get rewards bang fight");
            rewardsButton.trigger('click');
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        }
        else if(skipFightButton.length > 0)
        {
            logHHAuto("Click skip boss bang fight");
            skipFightButton.trigger('click');
            setTimeout(BossBang.skipFightPage, randomInterval(1300, 1900));
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        }
    }
    static goToFightPage(){
        const teamIndexFound = parseInt(getStoredValue(HHStoredVarPrefixKey+"Temp_bossBangTeam"));
        let bangButton = $('#contains_all #events #boss_bang .boss-bang-event-info #start-bang-button:not([disabled])');
        if(teamIndexFound >= 0 && bangButton.length > 0) {
            gotoPage(bangButton.attr('href'));
        }
    }
}