import { ChampionModel } from "../../src/model/Champion";

describe("ChampionModel", () => {
    it("treats impression '0' as not started with no timer", () => {
        const champ = new ChampionModel(3, "0", false);
        expect(champ.index).toBe(3);
        expect(champ.impression).toBe("0");
        expect(champ.inFilter).toBe(false);
        expect(champ.started).toBe(false);
        expect(champ.timer).toBe(-1);
        expect(champ.hasEventGirls).toBe(false);
    });

    it("treats any non-zero impression as started with an elapsed timer", () => {
        const champ = new ChampionModel(1, "12345", true);
        expect(champ.started).toBe(true);
        expect(champ.timer).toBe(0);
        expect(champ.inFilter).toBe(true);
    });
});
