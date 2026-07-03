import {
    HERO_GIVEUP_MAX_RELOADS,
    sanitizeHeroGiveupReloadCount,
    shouldReloadAfterHeroGiveup,
    nextHeroGiveupReloadCount,
} from "../../src/Service/HeroBootRecovery";

describe("HeroBootRecovery", () => {
    describe("sanitizeHeroGiveupReloadCount", () => {
        it("passes through non-negative integers", () => {
            expect(sanitizeHeroGiveupReloadCount(0)).toBe(0);
            expect(sanitizeHeroGiveupReloadCount(2)).toBe(2);
        });
        it("parses numeric strings", () => {
            expect(sanitizeHeroGiveupReloadCount("3")).toBe(3);
        });
        it("collapses invalid / negative / fractional to 0 or floor", () => {
            expect(sanitizeHeroGiveupReloadCount(null)).toBe(0);
            expect(sanitizeHeroGiveupReloadCount(undefined)).toBe(0);
            expect(sanitizeHeroGiveupReloadCount("abc")).toBe(0);
            expect(sanitizeHeroGiveupReloadCount(-4)).toBe(0);
            expect(sanitizeHeroGiveupReloadCount(2.9)).toBe(2);
        });
    });

    describe("shouldReloadAfterHeroGiveup", () => {
        it("reloads while under the budget", () => {
            expect(shouldReloadAfterHeroGiveup(0)).toBe(true);
            expect(shouldReloadAfterHeroGiveup(HERO_GIVEUP_MAX_RELOADS - 1)).toBe(true);
        });
        it("stops once the budget is spent", () => {
            expect(shouldReloadAfterHeroGiveup(HERO_GIVEUP_MAX_RELOADS)).toBe(false);
            expect(shouldReloadAfterHeroGiveup(HERO_GIVEUP_MAX_RELOADS + 5)).toBe(false);
        });
        it("treats a corrupt stored count as 0 (still reloads)", () => {
            expect(shouldReloadAfterHeroGiveup(-1)).toBe(true);
        });
        it("respects a custom max", () => {
            expect(shouldReloadAfterHeroGiveup(1, 1)).toBe(false);
            expect(shouldReloadAfterHeroGiveup(0, 1)).toBe(true);
        });
    });

    describe("nextHeroGiveupReloadCount", () => {
        it("increments the sanitised count", () => {
            expect(nextHeroGiveupReloadCount(0)).toBe(1);
            expect(nextHeroGiveupReloadCount(2)).toBe(3);
            expect(nextHeroGiveupReloadCount("abc")).toBe(1);
        });
    });
});
