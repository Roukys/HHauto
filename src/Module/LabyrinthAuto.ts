import { HHStoredVarPrefixKey } from "../config/HHStoredVars";
import { 
    ConfigHelper,
    getStoredValue,
    queryStringGetParam,
    randomInterval,
    RewardHelper,
    setStoredValue,
    setTimer,
    TimeHelper 
} from "../Helper/index";
import { getPage } from "../Helper/PageHelper";
import { gotoPage } from "../Service/PageNavigationService";
import {
    logHHAuto
} from "../Utils/LogUtils";
import { Labyrinth } from "./Labyrinth";
import { RelicManager } from "./RelicManager";

export class LabyrinthAuto {
    debugEnabled: boolean;

    constructor() {
        this.debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
    }

    async run(): Promise<boolean> {
        const page = getPage();
        if (page === ConfigHelper.getHHScriptVars("pagesIDLabyrinthEntrance")) {
            const difficultyButton = $('.difficulty-button:not([disabled])');
            if (difficultyButton.length == 1) {
                logHHAuto(`On Labyrinth entrance page, only one difficulty available, ${difficultyButton.text().trim()}, select it.`);
                difficultyButton.trigger('click');
                await TimeHelper.sleep(randomInterval(200, 400));
                $('#labyrinth_confirm_difficulty button.blue_button_L').trigger('click');
                return true;
            } else {
                logHHAuto(`On Labyrinth entrance page, ${difficultyButton.length} difficulty available, manual selection needed.`);
            }

            setTimer('nextLabyrinthTime', randomInterval(600, 700));
            return false;
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDLabyrinthPoolSelect")) {
            logHHAuto("On Labyrinthpool select.");
            $('button.blue_button_L[rel="labyrinth_auto_assign"]').trigger('click');
            await TimeHelper.sleep(randomInterval(200, 400));
            $('button.blue_button_L[rel="labyrinth_team_confirmation"]').trigger('click');
            return true;
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDLabyrinth")) {
            logHHAuto("On Labyrinth page.");
            if (this.closeRewards()) {
                if (this.debugEnabled) logHHAuto('Some rewards popup closed');
            }

            if ($('.cleared-labyrinth-container:visible').length > 0) {
                logHHAuto("Labyrinth ended.");
                setTimer('nextLabyrinthTime', Labyrinth.getResetTime() + randomInterval(3600, 4000));
                return false;
            }

            if ($('#labyrinth_reward_popup .relic-container').length > 0) {
                /* Reward to be selected */
                const relicManager = new RelicManager();
                await relicManager.selectRelic();
            }
            await TimeHelper.sleep(randomInterval(500, 800));
            if ($('.labChosen').length <= 0) {
                Labyrinth.sim();
                await TimeHelper.sleep(randomInterval(200, 400));
                if ($('.labChosen').length <= 0) {
                    logHHAuto("Issue to find labyrinth next step button, retry in 60secs.");
                    setTimer('nextLabyrinthTime', randomInterval(60, 70));
                    return true;
                }
            }

            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            if (this.debugEnabled) logHHAuto("setting autoloop to false");

            $('.labChosen').trigger('click');
            await TimeHelper.sleep(randomInterval(500, 800));
            if (this.closeRewards()) {
                await TimeHelper.sleep(randomInterval(500, 800));
                //location.reload()
                return this.run();
            }
            return true;
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDLabyrinthPreBattle")) {
            logHHAuto("On labyrinth-pre-battle page.");
            if (this.getNumberSelectedGirl() === 7) {
                let templeID = queryStringGetParam(window.location.search, 'id_opponent');
                logHHAuto("Go and fight labyrinth :" + templeID);
                let labyrinthBattleButton = $("#pre-battle .buttons-container .blue_button_L");
                if (labyrinthBattleButton.length > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                    logHHAuto("setting autoloop to false");
                    labyrinthBattleButton[0].click();
                }
                else {
                    logHHAuto("Issue to find labyrinth battle button retry in 60secs.");
                    setTimer('nextLabyrinthTime', randomInterval(60, 70));
                }
            } else if (this.getNumberSelectedGirl() < 7) {
                logHHAuto("Not enough girls, Edit team.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDEditLabyrinthTeam"));
            } else {
                logHHAuto("Error in parsing, disable laby.");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoLabyrinth", false);
            }
            return true;
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDEditLabyrinthTeam")) {
            logHHAuto("Fill team.");
            const numberOfGirlsRemaining = Labyrinth.getRemainingNumberOfGirl();
            logHHAuto(`Number of girls remaining: ${numberOfGirlsRemaining}`);
            if (numberOfGirlsRemaining >= 7) {
                Labyrinth.moduleBuildTeam();
                await TimeHelper.sleep(randomInterval(200, 400));

                await Labyrinth._buildTeam();
                await TimeHelper.sleep(randomInterval(200, 400));
                if (this.getNumberSelectedGirl() == 7) {
                    $('#validate-team:enabled').trigger('click');
                } else {
                    if (this.debugEnabled) logHHAuto('Not enough girl selected, retry...');
                    return this.run();
                }
            } else {
                logHHAuto('Not enough girl to continue. Stopping');
                setTimer('nextLabyrinthTime', randomInterval(5 * 60 * 60, 7 * 60 * 60));
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                return true;
            }
            return true;
        }
        // else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinthBattle")) {
        //     logHHAuto("Go back to Labyrinth after fight.");
        //     gotoPage(ConfigHelper.getHHScriptVars("pagesIDLabyrinth"), {}, randomInterval(2000, 4000));
        // }
        else {
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDLabyrinth"));
            return true;
        }
        return false;
    }

    closeRewards(): boolean{
        return RewardHelper.closeRewardPopupIfAny() // laby coin
            || RewardHelper.closeRewardPopupIfAny(true, 'confirmation_popup') // no girl to heal
            || RewardHelper.closeRewardPopupIfAny(true, 'heal_girl_labyrinth_popup')
    }


    /** In the left part */
    getNumberSelectedGirl() {
        return $('.player-panel .team-hexagon .team-member-container[data-girl-id]').length;
    }
}