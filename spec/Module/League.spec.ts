import { HHStoredVarPrefixKey } from "../../src/config/HHStoredVars";
import { setTimer } from "../../src/Helper/TimerHelper";
import { Booster } from "../../src/Module/Booster";
import { LeagueHelper } from "../../src/Module/League";
import { ParanoiaService } from "../../src/Service/ParanoiaService";
import { MockHelper } from "../testHelpers/MockHelpers";

describe("League", function () {

    beforeEach(() => {
        MockHelper.mockDomain();
        MockHelper.mockHeroLevel(0);
    });

    describe("styles", function () {
        it("default", function () {
            expect(() => LeagueHelper.styles()).not.toThrow()
        });
    });

    // Live DOM check (2026-08): the League page dropped #leagues-tabs and
    // #leagues_middle. These specs pin the script's UI injection to the
    // surviving anchors (#leagues, .league_content) so a future markup
    // change fails a test instead of silently disabling the header and
    // popup again.
    describe("DOM injection anchors", function () {
        beforeEach(() => {
            document.body.innerHTML =
                '<div id="leagues">' +
                '<h3 class="page-title"></h3>' +
                '<div class="league_content hidden_girl">' +
                '<div class="league_table hh-scroll"><div class="data-list"></div></div>' +
                '</div>' +
                '</div>';
        });

        describe("moduleSimLeagueHideBeatenOppo", function () {
            it("mounts the header script container inside .league_content, above the opponent table", function () {
                LeagueHelper.moduleSimLeagueHideBeatenOppo();

                const header = document.querySelector(".league_content > .leagues_middle_header_script");
                expect(header).not.toBeNull();
                // Must land ahead of .league_table so the header renders
                // above the opponent list rather than inside its scroll area.
                expect(header!.nextElementSibling).toBe(document.querySelector(".league_table"));
                expect(document.getElementById("HideBeatenOppo")).not.toBeNull();
            });

            it("does not inject when the HH OCD script already added its beaten-opponents button", function () {
                document.getElementById("leagues")!.insertAdjacentHTML("beforeend", '<div id="beaten_opponents"></div>');

                LeagueHelper.moduleSimLeagueHideBeatenOppo();

                expect(document.querySelector(".leagues_middle_header_script")).toBeNull();
                expect(document.getElementById("HideBeatenOppo")).toBeNull();
            });

            it("does not inject when the HH OCD script already added its league_filter button", function () {
                document.getElementById("leagues")!.insertAdjacentHTML("beforeend", '<div id="league_filter"></div>');

                LeagueHelper.moduleSimLeagueHideBeatenOppo();

                expect(document.querySelector(".leagues_middle_header_script")).toBeNull();
                expect(document.getElementById("HideBeatenOppo")).toBeNull();
            });

            it("does not inject a second time when #HideBeatenOppo already exists", function () {
                document.getElementById("leagues")!.insertAdjacentHTML("beforeend", '<div id="HideBeatenOppo"></div>');

                LeagueHelper.moduleSimLeagueHideBeatenOppo();

                expect(document.querySelector(".leagues_middle_header_script")).toBeNull();
            });
        });

        describe("LeagueDisplayGetOpponentPopup / LeagueClearDisplayGetOpponentPopup", function () {
            it("mounts the opponent-list popup inside #leagues", function () {
                LeagueHelper.LeagueDisplayGetOpponentPopup(5, 10);

                const popup = document.getElementById("popup_message_league");
                expect(popup).not.toBeNull();
                expect(popup!.parentElement).toBe(document.getElementById("leagues"));
            });

            it("removes the popup again", function () {
                LeagueHelper.LeagueDisplayGetOpponentPopup(5, 10);
                LeagueHelper.LeagueClearDisplayGetOpponentPopup();

                expect(document.getElementById("popup_message_league")).toBeNull();
            });
        });
    });

    describe("get challenge", function () {
        beforeEach(() => {
            MockHelper.mockHeroLevel(500);
            MockHelper.mockEnergiesChallenge(0, 0);
        });

        it("default", function () {
            expect(LeagueHelper.getEnergy()).toBe(0);
            expect(LeagueHelper.getEnergyMax()).toBe(0);
        });

        it("5kiss over 10", function () {
            MockHelper.mockEnergiesChallenge(5, 10);
            expect(LeagueHelper.getEnergy()).toBe(5);
            expect(LeagueHelper.getEnergyMax()).toBe(10);
        });

        it("15kiss over 20", function () {
            MockHelper.mockEnergiesChallenge(15, 20);
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

    describe("isTimeToFight", function () {
        beforeEach(() => {
            MockHelper.mockHeroLevel(500);
            MockHelper.mockEnergiesChallenge(1, 20);
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesThreshold", "5");
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesRunThreshold", "15");

            jest.spyOn(LeagueHelper, "getLeagueEndTime").mockReturnValue(50000); // Default to more than 1 hour left
            jest.spyOn(ParanoiaService, "checkParanoiaSpendings").mockReturnValue(-1);
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly", "false");
            setTimer('nextLeaguesTime', -1); // Reset any existing timer
        });

        it("should return true if energy is above the threshold and timer has expired", function () {
            MockHelper.mockEnergiesChallenge(16, 20);
            setTimer('nextLeaguesTime', -1); // Ensure the timer is expired

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeTruthy();
        });

        it("should return false if energy is below the threshold", function () {
            MockHelper.mockEnergiesChallenge(10, 20);
            setTimer('nextLeaguesTime', -1); // Ensure the timer is expired

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeFalsy();
        });

        it("should return false if the timer for the next fight is still active", function () {
            MockHelper.mockEnergiesChallenge(20, 20);
            setTimer('nextLeaguesTime', 10); // Set a timer for 10 seconds

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeFalsy();
        });

        it("should return true if paranoia spending is enabled and there is energy below threashold", function () {
            MockHelper.mockEnergiesChallenge(10, 20);
            jest.spyOn(ParanoiaService, "checkParanoiaSpendings").mockReturnValue(1);

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeTruthy();
        });

        it("should return true if paranoia spending is enabled and there is energy above threashold", function () {
            MockHelper.mockEnergiesChallenge(16, 20);
            jest.spyOn(ParanoiaService, "checkParanoiaSpendings").mockReturnValue(1);

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeTruthy();
        });

        it("should return false if boosters are required but not equipped", function () {
            MockHelper.mockEnergiesChallenge(19, 20);
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly", "true");
            jest.spyOn(Booster, "haveBoosterEquiped").mockReturnValue(false);

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeFalsy();
        });

        it("should return false if boosters are required but not equipped and energie above max", function () {
            MockHelper.mockEnergiesChallenge(21, 20);
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly", "true");
            jest.spyOn(Booster, "haveBoosterEquiped").mockReturnValue(false);

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeFalsy();
        });

        it("should return true if boosters are required and equipped", function () {
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly", "true");
            MockHelper.mockEnergiesChallenge(16, 20);
            jest.spyOn(Booster, "haveBoosterEquiped").mockReturnValue(true);

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeTruthy();
        });

        it("should return false during the last hour of the league if energy is insufficient", function () {
            jest.spyOn(LeagueHelper, "getLeagueEndTime").mockReturnValue(3500); // 1 hour left
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesThreshold", "15");
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoLeaguesRunThreshold", "20");
            jest.spyOn(LeagueHelper, "getEnergy").mockReturnValue(0);

            const result = LeagueHelper.isTimeToFight();

            expect(result).toBeFalsy();
        });
    });

});