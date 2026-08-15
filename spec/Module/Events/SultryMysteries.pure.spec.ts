import { resolveSultryMysteriesSecondsLeft } from "../../../src/Module/Events/SultryMysteries.pure";

/**
 * Pure-function tests for resolveSultryMysteriesSecondsLeft.
 *
 * Regression guard: on the grid tab (default view of /event.html) the
 * shop-timer DOM selector matches nothing, so SultryMysteries.parse used
 * to compute seconds_before_end from an unparsed empty reading -- making
 * the event look already expired. The fix prefers
 * sm_event_data.seconds_until_event_end (available regardless of tab),
 * falls back to the DOM-derived value, and only falls back to the
 * caller-supplied default when neither source is usable.
 */
describe("resolveSultryMysteriesSecondsLeft", () => {
    it("prefers the sm_event_data value when present", () => {
        expect(resolveSultryMysteriesSecondsLeft("319404", null, 3600)).toBe(319404);
        expect(resolveSultryMysteriesSecondsLeft("319404", 42, 3600)).toBe(319404);
    });

    it("accepts a numeric sm_event_data value, not just a numeric string", () => {
        expect(resolveSultryMysteriesSecondsLeft(120, null, 3600)).toBe(120);
    });

    it("accepts an sm_event_data value of 0 (event ending right now is a real reading)", () => {
        expect(resolveSultryMysteriesSecondsLeft("0", null, 3600)).toBe(0);
    });

    it("falls back to the DOM-derived value when the HH var is missing", () => {
        expect(resolveSultryMysteriesSecondsLeft(null, 987, 3600)).toBe(987);
        expect(resolveSultryMysteriesSecondsLeft(undefined, 987, 3600)).toBe(987);
    });

    it("falls back to the DOM-derived value when the HH var is unparsable", () => {
        expect(resolveSultryMysteriesSecondsLeft("not-a-number", 987, 3600)).toBe(987);
    });

    it("falls back to the default when neither source is usable (grid tab, no HH var)", () => {
        expect(resolveSultryMysteriesSecondsLeft(null, null, 3600)).toBe(3600);
        expect(resolveSultryMysteriesSecondsLeft(undefined, null, 3600)).toBe(3600);
    });

    it("never derives a value from a negative DOM reading", () => {
        expect(resolveSultryMysteriesSecondsLeft(null, -1, 3600)).toBe(3600);
    });
});
