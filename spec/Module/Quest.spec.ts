import { QuestHelper } from "../../src/Module/Quest";
import { MockHelper } from "../testHelpers/MockHelpers";

describe("League", function () {

    beforeEach(() => {
        MockHelper.mockDomain();
        MockHelper.mockHeroLevel(0);
    });

    describe("get challenge", function () {
        beforeEach(() => {
            MockHelper.mockHeroLevel(500);
            MockHelper.mockEnergiesQuest(0, 0);
        });

        it("default", function () {
            expect(QuestHelper.getEnergy()).toBe(0);
            expect(QuestHelper.getEnergyMax()).toBe(0);
        });

        it("50 energy over 100", function () {
            MockHelper.mockEnergiesQuest(50, 100);
            expect(QuestHelper.getEnergy()).toBe(50);
            expect(QuestHelper.getEnergyMax()).toBe(100);
        });

        it("15 over 20", function () {
            MockHelper.mockEnergiesQuest(15, 200);
            expect(QuestHelper.getEnergy()).toBe(15);
            expect(QuestHelper.getEnergyMax()).toBe(200);
        });
    });

});