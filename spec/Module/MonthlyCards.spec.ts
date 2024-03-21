import { MonthlyCards } from '../../src/Module/MonthlyCard';
import { HHAuto_inputPattern } from '../../src/config/InputPattern';
import { MockHelper } from '../testHelpers/MockHelpers';

describe("MonthlyCards module", function () {

    beforeEach(() => {
        MockHelper.mockHeroLevel(500);
    });

    afterEach(() => {
    });

    describe("updateInputPattern troll", function () {
        it("default", function () {
            expect(HHAuto_inputPattern.autoTrollThreshold).toBe("[1]?[0-9]");
            expect(HHAuto_inputPattern.autoTrollRunThreshold).toBe("(20|[1]?[0-9])");
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoTrollThreshold).toBe("[1]?[0-9]");
            expect(HHAuto_inputPattern.autoTrollRunThreshold).toBe("(20|[1]?[0-9])");
        });
        it("Silver 30", function () {
            MockHelper.mockEnergiesFight(20, 30);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoTrollThreshold).toBe("[1-2]?[0-9]");
            expect(HHAuto_inputPattern.autoTrollRunThreshold).toBe("30|[1-2]?[0-9]");
        });
        it("Gold 40", function () {
            MockHelper.mockEnergiesFight(20, 40);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoTrollThreshold).toBe("[1-3]?[0-9]");
            expect(HHAuto_inputPattern.autoTrollRunThreshold).toBe("40|[1-3]?[0-9]");
        });
        it("Platinum 50", function () {
            MockHelper.mockEnergiesFight(20, 50);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoTrollThreshold).toBe("[1-4]?[0-9]");
            expect(HHAuto_inputPattern.autoTrollRunThreshold).toBe("50|[1-4]?[0-9]");
        });
        it("Diamond 60", function () {
            MockHelper.mockEnergiesFight(20, 60);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoTrollThreshold).toBe("[1-5]?[0-9]");
            expect(HHAuto_inputPattern.autoTrollRunThreshold).toBe("60|[1-5]?[0-9]");
        });
    });

    describe("updateInputPattern Season", function () {
        it("default", function () {
            expect(HHAuto_inputPattern.autoSeasonThreshold).toBe("[0-9]");
            expect(HHAuto_inputPattern.autoSeasonRunThreshold).toBe("10|[0-9]");
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoSeasonThreshold).toBe("[0-9]");
            expect(HHAuto_inputPattern.autoSeasonRunThreshold).toBe("10|[0-9]");
        });
        it("Silver", function () {
            MockHelper.mockEnergiesKiss(20, 20);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoSeasonThreshold).toBe("[1-1]?[0-9]");
            expect(HHAuto_inputPattern.autoSeasonRunThreshold).toBe("20|[1-1]?[0-9]");
        });
        it("Gold", function () {
            MockHelper.mockEnergiesKiss(20, 30);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoSeasonThreshold).toBe("[1-2]?[0-9]");
            expect(HHAuto_inputPattern.autoSeasonRunThreshold).toBe("30|[1-2]?[0-9]");
        });
        it("Platinum", function () {
            MockHelper.mockEnergiesKiss(20, 40);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoSeasonThreshold).toBe("[1-3]?[0-9]");
            expect(HHAuto_inputPattern.autoSeasonRunThreshold).toBe("40|[1-3]?[0-9]");
        });
        it("Diamond", function () {
            MockHelper.mockEnergiesKiss(20, 50);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoSeasonThreshold).toBe("[1-4]?[0-9]");
            expect(HHAuto_inputPattern.autoSeasonRunThreshold).toBe("50|[1-4]?[0-9]");
        });
    });

    describe("updateInputPattern Quest", function () {
        it("default", function () {
            expect(HHAuto_inputPattern.autoQuestThreshold).toBe("[1-9]?[0-9]");
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoQuestThreshold).toBe("[1-9]?[0-9]");
        });
        it("Silver", function () {
            MockHelper.mockEnergiesQuest(10, 150);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoQuestThreshold).toBe("1[0-4][0-9]|[1-9]?[0-9]");
        });
        it("Gold", function () {
            MockHelper.mockEnergiesQuest(20, 200);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoQuestThreshold).toBe("[1-1][0-9][0-9]|[1-9]?[0-9]");
        });
        it("Platinum", function () {
            MockHelper.mockEnergiesQuest(20, 250);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoQuestThreshold).toBe("2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]");
        });
        it("Diamond", function () {
            MockHelper.mockEnergiesQuest(20, 300);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoQuestThreshold).toBe("[1-2][0-9][0-9]|[1-9]?[0-9]");
        });
    });

    describe("updateInputPattern League", function () {
        it("default", function () {
            expect(HHAuto_inputPattern.autoLeaguesThreshold).toBe("1[0-4]|[0-9]");
            expect(HHAuto_inputPattern.autoLeaguesRunThreshold).toBe("1[0-5]|[0-9]");
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoLeaguesThreshold).toBe("1[0-4]|[0-9]");
            expect(HHAuto_inputPattern.autoLeaguesRunThreshold).toBe("1[0-5]|[0-9]");
        });
        it("Silver", function () {
            MockHelper.mockEnergiesChallenge(10, 18);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoLeaguesThreshold).toBe("1[0-7]|[0-9]");
            expect(HHAuto_inputPattern.autoLeaguesRunThreshold).toBe("1[0-8]|[0-9]");
        });
        it("Gold", function () {
            MockHelper.mockEnergiesChallenge(20, 23);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoLeaguesThreshold).toBe("2[0-2]|1[0-9]|[0-9]");
            expect(HHAuto_inputPattern.autoLeaguesRunThreshold).toBe("2[0-3]|1[0-9]|[0-9]");
        });
        it("Platinum", function () {
            MockHelper.mockEnergiesChallenge(20, 26);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoLeaguesThreshold).toBe("2[0-5]|1[0-9]|[0-9]");
            expect(HHAuto_inputPattern.autoLeaguesRunThreshold).toBe("2[0-6]|1[0-9]|[0-9]");
        });
        it("Diamond", function () {
            MockHelper.mockEnergiesChallenge(20, 30);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoLeaguesThreshold).toBe("2[0-9]|1[0-9]|[0-9]");
            expect(HHAuto_inputPattern.autoLeaguesRunThreshold).toBe("30|[1-2][0-9]|[0-9]");
        });
    });

    describe("updateInputPattern Pantheon", function () {
        it("default", function () {
            expect(HHAuto_inputPattern.autoPantheonThreshold).toBe("[0-9]");
            expect(HHAuto_inputPattern.autoPantheonRunThreshold).toBe("10|[0-9]");
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoPantheonThreshold).toBe("[0-9]");
            expect(HHAuto_inputPattern.autoPantheonRunThreshold).toBe("10|[0-9]");
        });
        it("Silver", function () {
            MockHelper.mockEnergiesWorship(10, 15);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoPantheonThreshold).toBe("1[0-4]|[0-9]");
            expect(HHAuto_inputPattern.autoPantheonRunThreshold).toBe("1[0-5]|[0-9]");
        });
        it("Gold", function () {
            MockHelper.mockEnergiesWorship(20, 20);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoPantheonThreshold).toBe("1[0-9]|[0-9]");
            expect(HHAuto_inputPattern.autoPantheonRunThreshold).toBe("20|1[0-9]|[0-9]");
        });
        it("Platinum", function () {
            MockHelper.mockEnergiesWorship(20, 25);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoPantheonThreshold).toBe("2[0-4]|1[0-9]|[0-9]");
            expect(HHAuto_inputPattern.autoPantheonRunThreshold).toBe("2[0-5]|1[0-9]|[0-9]");
        });
        it("Diamond", function () {
            MockHelper.mockEnergiesWorship(20, 30);
            MonthlyCards.updateInputPattern()
            expect(HHAuto_inputPattern.autoPantheonThreshold).toBe("[1-2][0-9]|[0-9]");
            expect(HHAuto_inputPattern.autoPantheonRunThreshold).toBe("30|[1-2][0-9]|[0-9]");
        });
    });
});