const { Trollz } = require("./Helper");
const { HHStoredVarPrefixKey } = require("./config");

const QuestHelper = {
    SITE_QUEST_PAGE: '/side-quests.html',
    getNextQuestLink: function() {
        const mainQuest = getStoredValue(HHStoredVarPrefixKey+"Setting_autoQuest") === "true";
        const sideQuest = getHHScriptVars("isEnabledSideQuest",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSideQuest") === "true";
        let nextQuestUrl = QuestHelper.getMainQuestUrl();

        if ((mainQuest && sideQuest && (nextQuestUrl.includes("world"))) || (!mainQuest && sideQuest))
        {
            nextQuestUrl = QuestHelper.SITE_QUEST_PAGE;
        }
        else if (nextQuestUrl.includes("world"))
        {
            return false;
        }
        return nextQuestUrl;
    },
    getMainQuestUrl: function() {
        let mainQuestUrl = getHHVars('Hero.infos.questing.current_url');
        const id_world = getHHVars('Hero.infos.questing.id_world');
        const id_quest = getHHVars('Hero.infos.questing.id_quest');
        const lastQuestId = getHHScriptVars("lastQuestId",false);

        if (id_world < (Trollz.length) || lastQuestId > 0 && id_quest != lastQuestId) {
            // Fix when KK quest url is world url
            mainQuestUrl = "/quest/" + id_quest;
        }
        return mainQuestUrl;
    }
}
module.exports = QuestHelper;