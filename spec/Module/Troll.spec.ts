import { getSecondsLeft, setTimer } from '../../src/Helper/TimerHelper';
import { Troll } from '../../src/Module/Troll';
import { HHStoredVarPrefixKey } from '../../src/config/HHStoredVars';
import { EventGirl } from '../../src/model/EventGirl';
import { MockHelper } from '../testHelpers/MockHelpers';

describe("Troll module", function () {

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
});