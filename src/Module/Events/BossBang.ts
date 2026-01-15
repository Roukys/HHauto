import { convertTimeToInt, getStoredValue, randomInterval, setStoredValue, setTimer } from "../../Helper/index";
import { addNutakuSession, gotoPage } from "../../Service/index";
import { logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";

export class BossBang {
    static parse(hhEvent: any, eventList: any, hhEventData: any) {
        const eventID = hhEvent.eventId;
        let refreshTimer = randomInterval(3600, 4000);

        let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
        if (timeLeft !== undefined && timeLeft.length) {
            setTimer('eventBossBangGoing', Number(convertTimeToInt(timeLeft)));
        } else setTimer('eventBossBangGoing', refreshTimer);
        eventList[eventID] = {};
        eventList[eventID]["id"] = eventID;
        eventList[eventID]["type"] = hhEvent.eventType;
        eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
        eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
        eventList[eventID]["isCompleted"] = $('#contains_all #events #boss_bang .completed-event').length > 0;
        let teamEventz = $('#contains_all #events #boss_bang .boss-bang-teams-container .boss-bang-team-slot');
        let teamFound = false;
        const firstTeamToStartWith = getStoredValue(HHStoredVarPrefixKey + "Setting_bossBangMinTeam");
        if ($('.boss-bang-team-ego', teamEventz[firstTeamToStartWith - 1]).length > 0) {
            // Do not trigger event if not all teams are set
            for (let currIndex = teamEventz.length - 1; currIndex >= 0 && !teamFound; currIndex--) {
                // start with last team first
                let teamz = $(teamEventz[currIndex]);
                const teamIndex = teamz.data('slot-index');
                const teamEgo = $('.boss-bang-team-ego', teamz);
                if (teamEgo.length > 0 && parseInt(teamEgo.text()) > 0) {
                    if (!teamFound) {
                        if (!teamz.hasClass('.selected-hero-team')) teamz.click();
                        teamFound = true;
                        logHHAuto("Select team " + (teamIndex + 1) + ", Ego: " + parseInt(teamEgo.text()));
                        setStoredValue(HHStoredVarPrefixKey + "Temp_bossBangTeam", teamIndex);
                        return true;
                    }
                } else {
                    logHHAuto("Team " + teamIndex + " not eligible");
                }
            }
        }
        else if (eventList[eventID]["isCompleted"]) {
            logHHAuto("Boss bang completed, disabled boss bang event setting");
            setStoredValue(HHStoredVarPrefixKey + "Setting_bossBangEvent", false);
        }
        else {
            logHHAuto(`No eligible team found for boss bang event, need team ${firstTeamToStartWith} or higher`);
        }
        if (!teamFound) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_bossBangTeam", -1);
        }
    }

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

    static goToFightPage() {
        const teamIndexFound = parseInt(getStoredValue(HHStoredVarPrefixKey+"Temp_bossBangTeam"));
        let bangButton = $('#contains_all #events #boss_bang .boss-bang-event-info #start-bang-button:not([disabled])');
        if(teamIndexFound >= 0 && bangButton.length > 0) {
            logHHAuto("Go to boss bang fight page");
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            location.href = addNutakuSession(bangButton.attr('href')) as string;
        } else {
            logHHAuto(`Cannot go to boss bang fight page, no team selected ${teamIndexFound} or no bang button found`);
        }
    }
}