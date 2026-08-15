import { isBlockedOnlyByMissingBooster, BoosterWaitState } from "../../../src/Module/Events/Season.pure";

describe("Season.pure isBlockedOnlyByMissingBooster", function () {
    function baseState(overrides: Partial<BoosterWaitState> = {}): BoosterWaitState {
        return {
            timerExpired: true,
            energyAboveThreshold: true,
            needBoosterToFight: true,
            haveBoosterEquipped: false,
            autoEquipBoostersEnabled: true,
            ...overrides,
        };
    }

    it("is true when the only blocker is a missing booster and auto-equip is on", function () {
        expect(isBlockedOnlyByMissingBooster(baseState())).toBe(true);
    });

    it("is false when the season timer has not expired yet", function () {
        expect(isBlockedOnlyByMissingBooster(baseState({ timerExpired: false }))).toBe(false);
    });

    it("is false when energy is not above the threshold", function () {
        expect(isBlockedOnlyByMissingBooster(baseState({ energyAboveThreshold: false }))).toBe(false);
    });

    it("is false when boosters are not required to fight", function () {
        expect(isBlockedOnlyByMissingBooster(baseState({ needBoosterToFight: false }))).toBe(false);
    });

    it("is false once a booster is equipped", function () {
        expect(isBlockedOnlyByMissingBooster(baseState({ haveBoosterEquipped: true }))).toBe(false);
    });

    it("is false when auto-equip is off, even if a booster is missing", function () {
        expect(isBlockedOnlyByMissingBooster(baseState({ autoEquipBoostersEnabled: false }))).toBe(false);
    });
});
