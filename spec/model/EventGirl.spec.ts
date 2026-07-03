import { EventGirl } from "../../src/model/EventGirl";
import { KKEventGirl } from "../../src/model/KK/KKEventGirl";
import { loadFixture } from "../testHelpers/Fixtures";

// Anonymised KKEventGirl payloads covering every parseSource branch.
const girls = loadFixture("event", "event-girls") as Record<string, KKEventGirl>;

describe("EventGirl", () => {

    describe("constructor", () => {
        it("copies the raw girl fields and event metadata", () => {
            const girl = new EventGirl(girls.trollGirl, "event_42", 3600, true);
            expect(girl.girl_id).toBe(101);
            expect(girl.name).toBe("Troll Girl");
            expect(girl.shards).toBe(40);
            expect(girl.event_id).toBe("event_42");
            expect(girl.seconds_before_end).toBe(3600);
            expect(girl.is_mythic).toBe(true);
        });

        it("defaults to non-mythic and skips parsing when parseSource is false", () => {
            const girl = new EventGirl(girls.trollGirl, "event_42", 60, false, false);
            expect(girl.is_mythic).toBe(false);
            expect(girl.troll_id).toBeUndefined();
            expect(girl.isOnTroll()).toBe(false);
        });
    });

    describe("parseSource: event_troll", () => {
        it("extracts the troll id from the anchor_source url", () => {
            const girl = new EventGirl(girls.trollGirl, "event_42", 3600);
            expect(girl.troll_id).toBe(12);
            expect(girl.isOnTroll()).toBe(true);
            expect(girl.isOnChampion()).toBe(false);
        });

        it("drops the troll id when the anchor is disabled", () => {
            const girl = new EventGirl(girls.trollGirlDisabled, "event_42", 3600);
            expect(girl.troll_id).toBeUndefined();
            expect(girl.isOnTroll()).toBe(false);
        });

        it("falls back to anchor_win_from when anchor_source is missing", () => {
            const girl = new EventGirl(girls.trollGirlWinFrom, "event_42", 3600);
            expect(girl.troll_id).toBe(7);
            expect(girl.isOnTroll()).toBe(true);
        });
    });

    describe("parseSource: event_champion_girl", () => {
        it("extracts the champion id from the anchor_source url", () => {
            const girl = new EventGirl(girls.champGirl, "event_42", 3600);
            expect(girl.champ_id).toBe(4);
            expect(girl.isOnChampion()).toBe(true);
            expect(girl.isOnTroll()).toBe(false);
        });

        it("falls back to anchor_win_from when anchor_source is missing", () => {
            const girl = new EventGirl(girls.champGirlWinFrom, "event_42", 3600);
            expect(girl.champ_id).toBe(6);
            expect(girl.isOnChampion()).toBe(true);
        });
    });

    describe("parseSource: passive sources", () => {
        it.each([
            ["daily mission girl", "dailyMissionGirl"],
            ["pachinko girl", "pachinkoGirl"],
            ["girl without source", "noSourceGirl"],
        ])("%s has neither troll nor champion", (_label, key) => {
            const girl = new EventGirl(girls[key], "event_42", 3600);
            expect(girl.isOnTroll()).toBe(false);
            expect(girl.isOnChampion()).toBe(false);
        });
    });

    describe("toString", () => {
        it("mentions the troll for troll girls", () => {
            const girl = new EventGirl(girls.trollGirl, "event_42", 3600);
            expect(girl.toString()).toBe("Event girl : Troll Girl (40/100) at troll 12 on event : event_42");
        });

        it("mentions the champion for champion girls", () => {
            const girl = new EventGirl(girls.champGirl, "event_42", 3600);
            expect(girl.toString()).toBe("Event girl : Champ Girl (20/100) at champ 4 on event : event_42");
        });

        it("mentions neither for passive girls", () => {
            const girl = new EventGirl(girls.dailyMissionGirl, "event_42", 3600);
            expect(girl.toString()).toBe("Event girl : DM Girl (10/100) on event : event_42");
        });
    });
});
