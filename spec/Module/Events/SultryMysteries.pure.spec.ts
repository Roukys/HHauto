import {
    SmGridSquare,
    SmRewardsList,
    isFirstWaveSquare,
    resolveSultryMysteriesSecondsLeft,
    smNextAction,
    smOpeningOrder,
    smSelectedTypesProgress,
    smSelectionComplete,
} from "../../../src/Module/Events/SultryMysteries.pure";

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

/**
 * Grid automation ("Auto-Mystery").
 *
 * The reward composition below mirrors a real grid read off the live event
 * page (sm_event_data.event_data.rewards_list): 30 squares holding 2
 * progressions, 1 hard_currency, 8 gems, 3 energy_fight, 3 energy_kiss,
 * 2 orbs, 6 item and 5 sultry_coins.
 */
const LIVE_REWARD_TYPES = [
    "progressions", "progressions", "hard_currency",
    "gems", "gems", "gems", "gems", "gems", "gems", "gems", "gems",
    "energy_fight", "energy_fight", "energy_fight",
    "energy_kiss", "energy_kiss", "energy_kiss",
    "orbs", "orbs",
    "item", "item", "item", "item", "item", "item",
    "sultry_coins", "sultry_coins", "sultry_coins", "sultry_coins", "sultry_coins",
];

function makeRewardsList(types: string[] = LIVE_REWARD_TYPES): SmRewardsList {
    const list: SmRewardsList = {};
    types.forEach((type, index) => {
        list[String(index + 1)] = { rewards: [{ type }] };
    });
    return list;
}

/**
 * A grid where square N hides reward index N, with `opened` already
 * revealed. Locked squares carry reward_index 0, exactly as the game
 * serialises them.
 */
function makeGrid(opened: number[] = []): SmGridSquare[] {
    const grid: SmGridSquare[] = [];
    for (let idSquare = 1; idSquare <= 30; idSquare++) {
        const isOpened = opened.includes(idSquare);
        grid.push({ id_square: idSquare, is_opened: isOpened, reward_index: isOpened ? idSquare : 0 });
    }
    return grid;
}

const FIRST_WAVE = [1, 3, 5, 8, 10, 12, 13, 15, 17, 20, 22, 24, 25, 27, 29];
const SECOND_WAVE = [2, 4, 6, 7, 9, 11, 14, 16, 18, 19, 21, 23, 26, 28, 30];

describe("isFirstWaveSquare", () => {
    it("marks the checkerboard the user plays by hand", () => {
        expect(FIRST_WAVE.every((id) => isFirstWaveSquare(id))).toBe(true);
        expect(SECOND_WAVE.some((id) => isFirstWaveSquare(id))).toBe(false);
    });

    it("covers exactly half of the 30 squares, i.e. the refresh threshold", () => {
        const wave = [];
        for (let id = 1; id <= 30; id++) if (isFirstWaveSquare(id)) wave.push(id);
        expect(wave.length).toBe(15);
    });
});

describe("smOpeningOrder", () => {
    it("opens the checkerboard first, then the rest, each ascending", () => {
        expect(smOpeningOrder(makeGrid())).toEqual([...FIRST_WAVE, ...SECOND_WAVE]);
    });

    it("skips squares that are already open", () => {
        const order = smOpeningOrder(makeGrid([1, 3, 5]));
        expect(order[0]).toBe(8);
        expect(order).not.toContain(1);
        expect(order.length).toBe(27);
    });

    it("returns nothing for a fully opened grid", () => {
        const all = [];
        for (let id = 1; id <= 30; id++) all.push(id);
        expect(smOpeningOrder(makeGrid(all))).toEqual([]);
    });
});

describe("smSelectedTypesProgress", () => {
    it("counts totals from the live rewards list, not from fixed numbers", () => {
        const progress = smSelectedTypesProgress(makeRewardsList(), makeGrid([26, 27]), ["sultry_coins", "hard_currency"]);
        expect(progress).toEqual([
            { type: "sultry_coins", total: 5, found: 2 },
            { type: "hard_currency", total: 1, found: 0 },
        ]);
    });

    it("ignores the reward_index sentinel of locked squares", () => {
        // Locked squares carry reward_index 0; rewards_list keys start at 1,
        // so nothing may ever be counted as found because of them.
        const progress = smSelectedTypesProgress(makeRewardsList(), makeGrid([]), ["progressions"]);
        expect(progress).toEqual([{ type: "progressions", total: 2, found: 0 }]);
    });
});

describe("smSelectionComplete", () => {
    it("is complete when every square of every selected type is open", () => {
        expect(smSelectionComplete(makeRewardsList(), makeGrid([3]), ["hard_currency"])).toBe(true);
        expect(smSelectionComplete(makeRewardsList(), makeGrid([26, 27, 28, 29]), ["sultry_coins"])).toBe(false);
        expect(smSelectionComplete(makeRewardsList(), makeGrid([26, 27, 28, 29, 30]), ["sultry_coins"])).toBe(true);
    });

    it("treats an empty selection as complete", () => {
        expect(smSelectionComplete(makeRewardsList(), makeGrid([]), [])).toBe(true);
    });
});

describe("smNextAction", () => {
    const base = { rewardsList: makeRewardsList(), squaresRequiredForRefresh: 15 };

    it("opens the first checkerboard square on a fresh grid", () => {
        expect(smNextAction({ ...base, grid: makeGrid(), selectedTypes: [], keys: 15 }))
            .toEqual({ kind: "open", idSquare: 1 });
    });

    it("regenerates as soon as 15 squares are open when nothing is selected", () => {
        expect(smNextAction({ ...base, grid: makeGrid(FIRST_WAVE), selectedTypes: [], keys: 5 }))
            .toEqual({ kind: "regenerate" });
    });

    it("keeps opening past 15 squares while a selected reward is still hidden", () => {
        // sultry_coins sit on reward indexes 26-30; the checkerboard reveals
        // 27 and 29 only, so the goal forces the second wave.
        const action = smNextAction({ ...base, grid: makeGrid(FIRST_WAVE), selectedTypes: ["sultry_coins"], keys: 5 });
        expect(action).toEqual({ kind: "open", idSquare: 2 });
    });

    it("regenerates once the goal is met, even with no keys left", () => {
        const opened = [...FIRST_WAVE, 26, 28, 30];
        expect(smNextAction({ ...base, grid: makeGrid(opened), selectedTypes: ["sultry_coins"], keys: 0 }))
            .toEqual({ kind: "regenerate" });
    });

    it("waits instead of clicking when the keys are gone", () => {
        // Clicking a locked square with zero keys makes the game open its
        // koban purchase popup, so "open" must never be proposed here.
        expect(smNextAction({ ...base, grid: makeGrid([1, 3]), selectedTypes: [], keys: 0 }))
            .toEqual({ kind: "wait", reason: "no_keys" });
    });

    it("does not regenerate below the threshold even with the goal met", () => {
        expect(smNextAction({ ...base, grid: makeGrid([3]), selectedTypes: ["hard_currency"], keys: 0 }))
            .toEqual({ kind: "wait", reason: "no_keys" });
    });

    it("honours a refresh threshold supplied by the game", () => {
        expect(smNextAction({ ...base, squaresRequiredForRefresh: 20, grid: makeGrid(FIRST_WAVE), selectedTypes: [], keys: 0 }))
            .toEqual({ kind: "wait", reason: "no_keys" });
    });
});
