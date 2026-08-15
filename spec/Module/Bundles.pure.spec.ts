import {
    ExpiryTimeState,
    decideExpiryTime,
    extractTimerText,
    minScrapedSeconds,
} from "../../src/Module/Bundles.pure";

/**
 * Pure-function tests for the bundle expiry-time decision.
 *
 * decideExpiryTime returns the deterministic seconds value the
 * impure adapter then hands to setTimer. The 24-hour boundary is
 * strict (the original code reads `if (freeBundleTimer < 24 * 3600)`)
 * and exactly 24 * 3600 falls through to the fallback branch.
 */
describe("decideExpiryTime", () => {
    const buildState = (
        overrides: Partial<ExpiryTimeState> = {},
    ): ExpiryTimeState => ({
        scrapedSeconds: null,
        fallbackSeconds: 9999,
        ...overrides,
    });

    it("returns the fallback when no DOM timer was scraped", () => {
        expect(
            decideExpiryTime(buildState({ scrapedSeconds: null, fallbackSeconds: 1234 })),
        ).toBe(1234);
    });

    it("returns the scraped value when below the 24h cap", () => {
        expect(
            decideExpiryTime(
                buildState({ scrapedSeconds: 23 * 3600 + 59 * 60, fallbackSeconds: 1234 }),
            ),
        ).toBe(23 * 3600 + 59 * 60);
    });

    it("falls back at exactly 24h (strict < boundary)", () => {
        expect(
            decideExpiryTime(
                buildState({ scrapedSeconds: 24 * 3600, fallbackSeconds: 1234 }),
            ),
        ).toBe(1234);
    });

    it("falls back when the scraped value is well above the 24h cap", () => {
        expect(
            decideExpiryTime(
                buildState({ scrapedSeconds: 7 * 24 * 3600, fallbackSeconds: 1234 }),
            ),
        ).toBe(1234);
    });

    it("returns zero when the scraped timer is exactly zero", () => {
        // Edge: a popup timer that has just expired. 0 < 24*3600, so
        // the scraped value passes through unchanged.
        expect(
            decideExpiryTime(
                buildState({ scrapedSeconds: 0, fallbackSeconds: 1234 }),
            ),
        ).toBe(0);
    });

    it("returns the typical mid-range scraped value untouched", () => {
        expect(
            decideExpiryTime(
                buildState({ scrapedSeconds: 3600, fallbackSeconds: 1234 }),
            ),
        ).toBe(3600);
    });
});

/**
 * minScrapedSeconds reduces the per-tile countdowns scraped from a
 * visible payment-popup tab to the single soonest value, since that's
 * the one that should drive the next free-bundle check.
 */
describe("minScrapedSeconds", () => {
    it("returns null when nothing was scraped", () => {
        expect(minScrapedSeconds([])).toBeNull();
    });

    it("returns the only value for a single scraped timer", () => {
        expect(minScrapedSeconds([3600])).toBe(3600);
    });

    it("returns the smallest of several scraped timers, regardless of order", () => {
        expect(minScrapedSeconds([9 * 86400, 3 * 86400, 4 * 86400])).toBe(3 * 86400);
        expect(minScrapedSeconds([3 * 86400, 9 * 86400, 4 * 86400])).toBe(3 * 86400);
    });

    it("treats a zero timer as the minimum (bundle expiring right now)", () => {
        expect(minScrapedSeconds([0, 3600, 7200])).toBe(0);
    });
});

/**
 * extractTimerText strips the locale prose ("Expires in ") the game
 * puts ahead of the actual duration, since convertTimeToInt only
 * understands duration tokens like "4d" / "21h" and would otherwise
 * log a spurious "Timer symbol not recognized" for each word.
 */
describe("extractTimerText", () => {
    it("drops leading words and keeps the duration tokens", () => {
        expect(extractTimerText("Expires in 4d 21h")).toBe("4d 21h");
    });

    it("is a no-op when the text is already just the duration", () => {
        expect(extractTimerText("11d 17h")).toBe("11d 17h");
    });

    it("keeps a single duration token", () => {
        expect(extractTimerText("Expires in 45m")).toBe("45m");
    });

    it("returns an empty string when there is no duration token", () => {
        expect(extractTimerText("Expires soon")).toBe("");
    });
});