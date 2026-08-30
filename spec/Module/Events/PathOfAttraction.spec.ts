import { RewardHelper } from "../../../src/Helper/RewardHelper";
import { getStoredValue } from "../../../src/Helper/StorageHelper";
import { TimeHelper } from "../../../src/Helper/TimeHelper";
import {
    PathOfAttraction,
    isPoACollectAllDue,
} from "../../../src/Module/Events/PathOfAttraction";
import { HHStoredVarPrefixKey } from "../../../src/config/HHStoredVars";
import { SK, TK } from "../../../src/config/StorageKeys";

describe("Path of Attraction reward collection", () => {
    function renderClaimableReward() {
        document.body.innerHTML = `
            <div id="nc-poa-tape-blocker"></div>
            <div id="nc-poa-tape-rewards">
                <div class="nc-poa-reward-pair">
                    <div class="nc-poa-step-indicator"></div>
                    <div class="nc-poa-free-reward claimable" data-nc-reward-id="1">
                        <div class="slot slot_soft_currency"></div>
                    </div>
                </div>
            </div>
            <div class="scroll-area poa"></div>
            <div id="poa-content">
                <div class="objective">
                    <div class="reward"><button class="purple_button_L"></button></div>
                </div>
            </div>`;
    }

    function setSetting(key: string, value: string) {
        localStorage.setItem(HHStoredVarPrefixKey + key, value);
    }

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        renderClaimableReward();
        jest.useFakeTimers();
        jest.spyOn(TimeHelper, "sleep").mockResolvedValue();
        jest.spyOn(RewardHelper, "closeRewardPopupIfAny").mockReturnValue(false);
        jest.spyOn($.fn, "animate").mockReturnThis();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
        document.body.innerHTML = "";
    });

    it("collects all rewards in a validated final window when the stored filter is JSON null", async () => {
        setSetting(SK.autoPoACollect, "false");
        setSetting(SK.autoPoACollectAll, "true");
        setSetting(SK.autoPoACollectablesList, "null");
        const rewardClick = jest.fn();
        $(".slot_soft_currency").on("click", rewardClick);

        await expect(PathOfAttraction.goAndCollect(false, true)).resolves.toBe(true);

        expect(rewardClick).toHaveBeenCalledTimes(1);
    });

    it("does not let the stored collect-all switch bypass an unvalidated window", async () => {
        setSetting(SK.autoPoACollect, "false");
        setSetting(SK.autoPoACollectAll, "true");
        setSetting(SK.autoPoACollectablesList, "null");
        const rewardClick = jest.fn();
        $(".slot_soft_currency").on("click", rewardClick);

        await expect(PathOfAttraction.goAndCollect()).resolves.toBe(false);

        expect(rewardClick).not.toHaveBeenCalled();
    });

    it("treats a JSON null reward filter as an empty list in selective mode", async () => {
        setSetting(SK.autoPoACollect, "true");
        setSetting(SK.autoPoACollectAll, "false");
        setSetting(SK.autoPoACollectablesList, "null");
        const rewardClick = jest.fn();
        $(".slot_soft_currency").on("click", rewardClick);

        await expect(PathOfAttraction.goAndCollect()).resolves.toBe(true);

        expect(rewardClick).not.toHaveBeenCalled();
        expect(getStoredValue(HHStoredVarPrefixKey + TK.autoLoop)).toBe("true");
    });

    it("preserves selective collection for a valid reward filter", async () => {
        setSetting(SK.autoPoACollect, "true");
        setSetting(SK.autoPoACollectAll, "false");
        setSetting(SK.autoPoACollectablesList, JSON.stringify(["soft_currency"]));
        const rewardClick = jest.fn();
        $(".slot_soft_currency").on("click", rewardClick);

        await expect(PathOfAttraction.goAndCollect()).resolves.toBe(true);

        expect(rewardClick).toHaveBeenCalledTimes(1);
    });
});

describe("Path of Attraction collect-all window", () => {
    it("fails closed when the remaining time is missing", () => {
        expect(isPoACollectAllDue(0, 12 * 3600, true)).toBe(false);
    });

    it("does not activate before the configured final window", () => {
        expect(isPoACollectAllDue(22 * 3600, 12 * 3600, true)).toBe(false);
    });

    it("activates inside the configured final window", () => {
        expect(isPoACollectAllDue(2 * 3600, 12 * 3600, true)).toBe(true);
    });

    it("does not activate when collect-all is disabled", () => {
        expect(isPoACollectAllDue(2 * 3600, 12 * 3600, false)).toBe(false);
    });
});
