import { getHHScriptVars } from "./ConfigHelper";
import { getTextForUI } from "./LanguageHelper";

export function getGoToChangeTeamButton() {
    // TODO change href and translate
    return '<div class="change_team_container"><a id="change_team" href="/teams.html" class="blue_button_L" anim-step="afterStartButton"><div>Change team</div></a></div>';
}

export function getGoToClubChampionButton() {
    return `<button data-href="${getHHScriptVars("pagesURLClubChampion")}" class="blue_button_L hh-club-poa">${getTextForUI("goToClubChampions","elementText")}</button>`;
}