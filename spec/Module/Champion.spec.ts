import { getSecondsLeft, setTimer } from '../../src/Helper/TimerHelper';
import {
    Champion
} from '../../src/Module/Champion'
import { HHStoredVarPrefixKey } from '../../src/config/HHStoredVars';
import { MockHelper } from '../testHelpers/MockHelpers';

describe("Champion module", function () {

    beforeEach(() => {
        MockHelper.mockDomain('www.hentaiheroes.com', 'champions-map.html');
        MockHelper.mockPage('champions_map');
        sessionStorage.setItem(HHStoredVarPrefixKey + 'Setting_autoChampsFilter', '1;2;3;4;5;6');
        setTimer('nextChampionTime',-1);
    });

    afterEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });



    describe("findNextChamptionTime", function () {
        it("default", function () {
            let nextChampionTime = getSecondsLeft('nextChampionTime');
            expect(nextChampionTime).toBe(0);
            Champion.findNextChamptionTime();
            nextChampionTime = getSecondsLeft('nextChampionTime');
            expect(nextChampionTime).toBeDefined();
            expect(nextChampionTime).toBeGreaterThan(3600);
        });
    });
});