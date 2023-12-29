import { getPage } from "../../src/Helper/PageHelper";
import { HHStoredVarPrefixKey } from "../../src/config/HHStoredVars";
import { MockHelper } from "../testHelpers/MockHelpers";

describe("Page Helper", function () {

    beforeEach(() => {
        document.body.innerHTML = `<!DOCTYPE html>`;
        MockHelper.mockDomain();
        sessionStorage.removeItem(HHStoredVarPrefixKey + "Temp_unkownPagesList");
    });

    function mockPage(pageName: string) {
        document.body.innerHTML = `<!DOCTYPE html><div id="hh_hentai" page="${pageName}"><p>Hello world</p></div>`;
    }


    describe("getDisplayedIdEventPage", function () {
        // $("#contains_all #events .events-list .event-title.active").attr("href")

        it("default", function () {
            try {
                getPage()
                // Fail test if above expression doesn't throw anything.
                expect(true).toBe(false);
            } catch (e) {
                expect(e.message).toBe("Unable to find page attribute, stopping script.");
            }
        });
        it("empty", function () {
            mockPage('');
            expect(getPage()).toBe('');
        });
        it("Home", function () {
            mockPage('home');
            expect(getPage()).toBe('home');
        });

        it("contests", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'activities.html', '?tab=contests');
            mockPage('activities');
            expect(getPage()).toBe('contests');
        });

        it("missions", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'activities.html', '?tab=missions');
            mockPage('activities');
            expect(getPage()).toBe('missions');
        });

        it("daily_goals", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'activities.html', '?tab=daily_goals');
            mockPage('activities');
            expect(getPage()).toBe('daily_goals');
        });

        it("pop", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'activities.html', '?tab=pop');
            mockPage('activities');
            expect(getPage()).toBe('powerplacemain');
        });

        it("pop n", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'activities.html', '?tab=pop&index=999');
            document.body.innerHTML = `<!DOCTYPE html><div id="hh_hentai" page="activities"><p>Hello world</p><div class="pop_list"><div class="pop_thumb_selected" pop_id="999"></div></div></div>`;
            expect(getPage()).toBe('powerplacemain');
        });

        it("pop n", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'activities.html', '?tab=pop&index=999');
            document.body.innerHTML = `<!DOCTYPE html><div id="hh_hentai" page="activities"><p>Hello world</p><div class="pop_list" style="display:none"></div><div class="pop_thumb_selected"></div></div>`;
            expect(getPage()).toBe('powerplacemain');
        });

        it("pop n, pop_list hidden", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'activities.html', '?tab=pop&index=999');
            document.body.innerHTML = `<!DOCTYPE html><div id="hh_hentai" page="activities"><p>Hello world</p><div class="pop_list" style="display:none"></div><div class="pop_thumb_selected" pop_id="999"></div></div>`;
            expect(getPage()).toBe('powerplace999');
        });

        it("checkUnknown known", function () {
            mockPage('home');
            expect(getPage(true)).toBe('home');
            expect(sessionStorage.getItem(HHStoredVarPrefixKey + "Temp_unkownPagesList")).toBeNull();
        });

        it("checkUnknown Unknown", function () {
            MockHelper.mockDomain('www.hentaiheroes.com', 'XXX-page.html');
            mockPage('XXX');
            expect(getPage(true)).toBe('XXX');
            expect(sessionStorage.getItem(HHStoredVarPrefixKey + "Temp_unkownPagesList")).toBe('{"XXX":"/XXX-page.html"}');
        });

        it("checkUnknown Unknown twice", function () {
            sessionStorage.setItem(HHStoredVarPrefixKey + "Temp_unkownPagesList", '{"XXX":"/XXX-page.html"}')
            MockHelper.mockDomain('www.hentaiheroes.com', 'ZZZ-page.html');
            mockPage('ZZZ');
            expect(getPage(true)).toBe('ZZZ');
            expect(sessionStorage.getItem(HHStoredVarPrefixKey + "Temp_unkownPagesList")).toBe('{"XXX":"/XXX-page.html","ZZZ":"/ZZZ-page.html"}');
        });
    });

});