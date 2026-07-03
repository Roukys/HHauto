import { BDSMSimu } from "../../src/model/BDSMSimu";
import { LeagueOpponent } from "../../src/model/LeagueOpponent";

describe("LeagueOpponent", () => {
    it("stores the constructor arguments verbatim", () => {
        const simu = { win: 0.75, points: 21.4 } as unknown as BDSMSimu;
        const opponent = new LeagueOpponent(4711, "Rival", 12345, 21.4, simu);
        expect(opponent.opponent_id).toBe(4711);
        expect(opponent.nickname).toBe("Rival");
        expect(opponent.power).toBe(12345);
        expect(opponent.simuPoints).toBe(21.4);
        expect(opponent.simu).toBe(simu);
    });

    it("accepts string opponent ids (scraped DOM values)", () => {
        const opponent = new LeagueOpponent("4711", "Rival", 0, 0, {} as BDSMSimu);
        expect(opponent.opponent_id).toBe("4711");
    });
});
