import { getStoredValue, randomInterval, setStoredValue } from "../../Helper";
import { gotoPage } from "../../Service";
import { logHHAuto } from "../../Utils";

export class BossBang {
    static skipFightPage()
    {
        const rewardsButton = $('#rewards_popup .blue_button_L:not([disabled]):visible');
        const skipFightButton = $('#new_battle #new-battle-skip-btn:not([disabled]):visible');
        if(rewardsButton.length > 0)
        {
            logHHAuto("Click get rewards bang fight");
            rewardsButton.click();
        }
        else if(skipFightButton.length > 0)
        {
            logHHAuto("Click skip boss bang fight");
            skipFightButton.click();
            setTimeout(BossBang.skipFightPage,randomInterval(1300,1900));
        }
        setStoredValue("HHAuto_Temp_autoLoop", "false");
    }
    static goToFightPage(){
        const teamIndexFound = parseInt(getStoredValue("HHAuto_Temp_bossBangTeam"));
        let bangButton = $('#contains_all #events #boss_bang .boss-bang-event-info #start-bang-button:not([disabled])');
        if(teamIndexFound >= 0 && bangButton.length > 0) {
            gotoPage(bangButton.attr('href'));
        }
    }
}