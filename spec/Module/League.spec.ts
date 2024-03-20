import { LeagueHelper } from "../../src/Module/League";
import { MockHelper } from "../testHelpers/MockHelpers";

describe("League", function () {

    function mockEnergiesChallenge(amount: number, max: number) {
        unsafeWindow.Hero.energies.challenge = {
            amount: amount,
            max_regen_amount: max
        };
    }

    beforeEach(() => {
        MockHelper.mockDomain();
        MockHelper.mockHeroLevel(0);
    });

    describe("styles", function () {
        it("default", function () {
            expect(() => LeagueHelper.styles()).not.toThrow()
        });
    });

    describe("get challenge", function () {
        beforeEach(() => {
            MockHelper.mockHeroLevel(500);
            mockEnergiesChallenge(0, 0);
        });

        it("default", function () {
            expect(LeagueHelper.getEnergy()).toBe(0);
            expect(LeagueHelper.getEnergyMax()).toBe(0);
        });

        it("5kiss over 10", function () {
            mockEnergiesChallenge(5, 10);
            expect(LeagueHelper.getEnergy()).toBe(5);
            expect(LeagueHelper.getEnergyMax()).toBe(10);
        });

        it("15kiss over 20", function () {
            mockEnergiesChallenge(15, 20);
            expect(LeagueHelper.getEnergy()).toBe(15);
            expect(LeagueHelper.getEnergyMax()).toBe(20);
        });
    });

    describe("isEnabled", function () {
        it("default", function () {
            expect(LeagueHelper.isEnabled()).toBeFalsy();
        });

        it("lower level", function () {
            MockHelper.mockHeroLevel(5);
            expect(LeagueHelper.isEnabled()).toBeFalsy();
        });

        it("higher level", function () {
            MockHelper.mockHeroLevel(500);
            expect(LeagueHelper.isEnabled()).toBeTruthy();
        });
    });

});