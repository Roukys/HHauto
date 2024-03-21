import { Pantheon } from "../../src/Module/Pantheon";
import { MockHelper } from "../testHelpers/MockHelpers";

describe("Pantheon", function () {

    beforeEach(() => {
        MockHelper.mockDomain();
        MockHelper.mockHeroLevel(0);
    });

    describe("get worship", function () {
        beforeEach(() => {
            MockHelper.mockHeroLevel(500);
            MockHelper.mockEnergiesWorship(0, 0);
        });

        it("default", function () {
            expect(Pantheon.getEnergy()).toBe(0);
            expect(Pantheon.getEnergyMax()).toBe(0);
        });

        it("5 Worship over 10", function () {
            MockHelper.mockEnergiesWorship(5, 10);
            expect(Pantheon.getEnergy()).toBe(5);
            expect(Pantheon.getEnergyMax()).toBe(10);
        });

        it("15 Worship over 20", function () {
            MockHelper.mockEnergiesWorship(15, 20);
            expect(Pantheon.getEnergy()).toBe(15);
            expect(Pantheon.getEnergyMax()).toBe(20);
        });
    });

    describe("isEnabled", function () {
        it("default", function () {
            expect(Pantheon.isEnabled()).toBeFalsy();
        });

        it("lower level", function () {
            MockHelper.mockHeroLevel(5);
            expect(Pantheon.isEnabled()).toBeFalsy();
        });

        it("level", function () {
            MockHelper.mockHeroLevel(16);
            expect(Pantheon.isEnabled()).toBeTruthy();
        });

        it("higher level", function () {
            MockHelper.mockHeroLevel(500);
            expect(Pantheon.isEnabled()).toBeTruthy();
        });
    });

});