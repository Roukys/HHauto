import { getSecondsLeft, setTimer } from '../../src/Helper/TimerHelper';
import {
    ClubChampion
} from '../../src/Module/ClubChampion'
import { HHStoredVarPrefixKey } from '../../src/config/HHStoredVars';
import { MockHelper } from '../testHelpers/MockHelpers';

describe("Club Champion module", function () {

    beforeEach(() => {
        unsafeWindow.server_now_ts = 1234;
        MockHelper.mockDomain('www.hentaiheroes.com', 'clubs.html');
        MockHelper.mockPage('clubs');
        setTimer('nextClubChampionTime',-1);
    });

    afterEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });



    describe("getNextClubChampionTimer", function () {
        it("default", function () {
            expect(ClubChampion.getNextClubChampionTimer()).toBe(-1);
            MockHelper.mockPage('home');
            expect(ClubChampion.getNextClubChampionTimer()).toBe(0);
        });
        it("team rest", function () {
            const timerHtml = `<div class="club_champions_details_container">
                                <div class="team_rest_timer">
                                    <div class="text"> Girls rest: <span timer="897" property="team_rest" rel="timer"> 14m 37s </span></div>
                                </div>
                               </div>`;
            MockHelper.mockPage('clubs', timerHtml);
            console.log(document.body.innerHTML);
            expect(ClubChampion.getNextClubChampionTimer()).toBe(14*60+37);
        });
        it("champion rest", function () {
            const timerHtml = `<div class="club_champions_details_container">
                                <div class="champion_rest_timer">
                                    <div class="text">The champion will be back in : <span timer="21217" property="team_rest" rel="timer">5h 53m</span></div>
                                </div>
                               </div>`;
            MockHelper.mockPage('clubs', timerHtml);
            expect(ClubChampion.getNextClubChampionTimer()).toBe(5 * 3600 + 53 * 60);
        });
    });

    describe("updateClubChampionTimer", function () {
        it("default home", function () {
            MockHelper.mockPage('home');
            expect(ClubChampion.updateClubChampionTimer()).toBeTruthy();
            let nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBe(0);
        });
        it("default club page", function () {
            expect(ClubChampion.updateClubChampionTimer()).toBeTruthy();
            let nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBeGreaterThanOrEqual(15*60);
        });
        it("team rest", function () {
            let nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBe(0);

            const timerHtml = `<div class="club_champions_details_container">
                                <div class="team_rest_timer">
                                    <div class="text"> Girls rest: <span timer="897" property="team_rest" rel="timer"> 14m 37s </span></div>
                                </div>
                               </div>`;
            MockHelper.mockPage('clubs', timerHtml);
            console.log(document.body.innerHTML);
            expect(ClubChampion.updateClubChampionTimer()).toBeFalsy();

            nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBeDefined();
            expect(nextChampionTime).toBeGreaterThanOrEqual(14 * 60 + 37);
        });
        it("champion rest", function () {
            let nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBe(0);

            const timerHtml = `<div class="club_champions_details_container">
                                <div class="champion_rest_timer">
                                    <div class="text">The champion will be back in : <span timer="21217" property="team_rest" rel="timer">5h 53m</span></div>
                                </div>
                               </div>`;
            MockHelper.mockPage('clubs', timerHtml);
            expect(ClubChampion.updateClubChampionTimer()).toBeFalsy();

            nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBeDefined();
            expect(nextChampionTime).toBeGreaterThanOrEqual(5 * 3600 + 53 * 60);
        });
        it("champion rest force start", function () {
            localStorage.setItem(HHStoredVarPrefixKey + "Setting_autoClubForceStart", 'true');
            let nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBe(0);

            const timerHtml = `<div class="club_champions_details_container">
                                <div class="champion_rest_timer">
                                    <div class="text">The champion will be back in : <span timer="21217" property="team_rest" rel="timer">5h 53m</span></div>
                                </div>
                               </div>`;
            MockHelper.mockPage('clubs', timerHtml);
            expect(ClubChampion.updateClubChampionTimer()).toBeFalsy();

            nextChampionTime = getSecondsLeft('nextClubChampionTime');
            expect(nextChampionTime).toBeDefined();
            expect(nextChampionTime).toBeGreaterThanOrEqual(50 * 60);
            expect(nextChampionTime).toBeLessThanOrEqual(70 * 60);
        });
    });
});