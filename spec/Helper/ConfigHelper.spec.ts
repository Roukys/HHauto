import { ConfigHelper } from '../../src/Helper/ConfigHelper';

describe("ConfigHelper", function() {

    function mockDomain(domain:string) {
        Object.defineProperty(window, 'location', {
            get() {
                return { hostname: domain };
            },
        });
    }

  describe("Environnement", function() {
    beforeEach(() => {
        document.body.innerHTML = `<!DOCTYPE html><p>Hello world</p>`;
    })

    it("HH", function() {
        mockDomain('www.hentaiheroes.com');
        expect(ConfigHelper.getEnvironnement()).toBe("HH_prod");
        mockDomain('test.hentaiheroes.com');
        expect(ConfigHelper.getEnvironnement()).toBe("HH_test");
        expect(ConfigHelper.isPshEnvironnement()).toBeFalsy();
    });

    it("CX", function() {
        mockDomain('www.comixharem.com');
        expect(ConfigHelper.getEnvironnement()).toBe("CH_prod");
        mockDomain('nutaku.comixharem.com');
        expect(ConfigHelper.getEnvironnement()).toBe("NCH_prod");
        expect(ConfigHelper.isPshEnvironnement()).toBeFalsy();
    });

    it("PH", function() {
        mockDomain('www.pornstarharem.com');
        expect(ConfigHelper.getEnvironnement()).toBe("PH_prod");
        expect(ConfigHelper.isPshEnvironnement()).toBeTruthy();
    });

    it("TPH", function() {
        mockDomain('www.transpornstarharem.com');
        expect(ConfigHelper.getEnvironnement()).toBe("TPH_prod");
        expect(ConfigHelper.isPshEnvironnement()).toBeFalsy();
    });

    it("unkown", function() {
        mockDomain('localhost');
        expect(ConfigHelper.getEnvironnement()).toBe("global");
        expect(ConfigHelper.isPshEnvironnement()).toBeFalsy();
    });
  });

  describe("Variables", function() {

    it("HH", function() {
        mockDomain('www.hentaiheroes.com');
        expect(ConfigHelper.getHHScriptVars('eventIDReg')).toBe("event_");
        expect(ConfigHelper.getHHScriptVars('lastQuestId')).toBe(1808);
        expect(ConfigHelper.getHHScriptVars('isEnabledSideQuest')).toBeTruthy();

        expect(ConfigHelper.getHHScriptVars('UNKNOWN')).toBeNull();
    });

    it("CX", function() {
        mockDomain('www.comixharem.com');
        expect(ConfigHelper.getHHScriptVars('eventIDReg')).toBe("event_");
         // Unknown, need someone who is at the end of the game
        expect(ConfigHelper.getHHScriptVars('lastQuestId')).toBe(-1);
    });

    it("PH", function() {
        mockDomain('www.pornstarharem.com');
        expect(ConfigHelper.getHHScriptVars('eventIDReg')).toBe("event_");
        // Probably not the latest anymore
        expect(ConfigHelper.getHHScriptVars('lastQuestId')).toBe(16100);
        expect(ConfigHelper.getHHScriptVars('isEnabledSideQuest')).toBeTruthy();
    });

    it("TPH", function() {
        mockDomain('www.transpornstarharem.com');
        expect(ConfigHelper.getHHScriptVars('isEnabledLabyrinth')).toBeFalsy();
        expect(ConfigHelper.getHHScriptVars('isEnabledSideQuest')).toBeFalsy();
    });
  });
});