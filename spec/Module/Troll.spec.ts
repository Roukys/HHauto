import { getSecondsLeft, setTimer } from '../../src/Helper/TimerHelper';
import { Troll } from '../../src/Module/Troll';
import { HHStoredVarPrefixKey } from '../../src/config/HHStoredVars';
import { EventGirl } from '../../src/model/EventGirl';
import { MockHelper } from '../testHelpers/MockHelpers';

describe("Troll module", function () {

    function mockEnergiesFight(amount: number, max: number) {
        unsafeWindow.Hero.energies.fight = {
            amount: amount,
            max_regen_amount: max
        };
    }

    beforeEach(() => {
        MockHelper.mockDomain('www.hentaiheroes.com');
        // MockHelper.mockPage('champions_map');
        // sessionStorage.setItem(HHStoredVarPrefixKey + 'Setting_autoChampsFilter', '1;2;3;4;5;6');
        // setTimer('nextChampionTime',-1);
        unsafeWindow.Hero = {
            name: "TOTO",
            energies: {
                fight: { 
                    amount: 0,
                    max_regen_amount: 15,
                    max_amount: 200,
                    next_refresh_ts: 1019,
                    seconds_per_point: 1800
                }
            }
        };
        unsafeWindow.hh_prices = {
            fight_cost_per_minute: 0.36
        }
    });

    afterEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    describe("canBuyFight", function () {
        it("default", function () {
            const canBuy = Troll.canBuyFight({} as EventGirl);
            expect(canBuy.canBuy).toBeFalsy();
            expect(canBuy.event_mythic).toBe("false");
            expect(canBuy.type).toBe("fight");
        });
        describe("Event girl", function () {
            xit("default", function () {
                
            });
        });
        describe("Mythic event girl", function () {
            xit("default", function () {
                
            });
        });
        describe("Mythic + event girl", function () {
            xit("default", function () {
                
            });
        });
    });

    describe("get Fight", function () {
        beforeEach(() => {
            MockHelper.mockHeroLevel(500);
            mockEnergiesFight(0, 0);
        });

        it("default", function () {
            expect(Troll.getEnergy()).toBe(0);
            expect(Troll.getEnergyMax()).toBe(0);
        });

        it("5kiss over 10", function () {
            mockEnergiesFight(5, 10);
            expect(Troll.getEnergy()).toBe(5);
            expect(Troll.getEnergyMax()).toBe(10);
        });

        it("15kiss over 20", function () {
            mockEnergiesFight(15, 20);
            expect(Troll.getEnergy()).toBe(15);
            expect(Troll.getEnergyMax()).toBe(20);
        });
    });
});