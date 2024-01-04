import {
    Booster
} from '../../src/Module/Booster'
import { HHStoredVarPrefixKey } from '../../src/config/HHStoredVars';

describe("Booster", function() {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    // remove callback
    localStorage.itemInsertionCallback = null;
  });
  const B4 = {item: {identifier:'B4'}, endAt:99999};
  const MB1 = {item: {identifier:'MB1', endAt:99999}};
  const XX = {item: {identifier:'XX', endAt:1}};

  describe("needBoosterStatusFromStore", function() {
    it("default", function() {
      expect(Booster.needBoosterStatusFromStore()).toBeFalsy();
    });
    it("plusEventMythicSandalWood", function() {
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood", 'true');
      expect(Booster.needBoosterStatusFromStore()).toBeTruthy();
    });
    it("autoLeaguesBoosted", function() {
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_autoLeaguesBoostedOnly", 'true');
      expect(Booster.needBoosterStatusFromStore()).toBeTruthy();
    });
    it("autoSeasonBoosted", function() {
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_autoSeasonBoostedOnly", 'true');
      expect(Booster.needBoosterStatusFromStore()).toBeTruthy();
    });
    it("autoPantheonBoosted", function() {
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_autoPantheonBoostedOnly", 'true');
      expect(Booster.needBoosterStatusFromStore()).toBeTruthy();
    });
  });

  describe("getBoosterFromStorage", function() {
    it("default not stored", function() {
      expect(Booster.getBoosterFromStorage()).toEqual({normal: [], mythic:[]});
    });

    it("Stored", function() {
      const storedBooster = {normal: [XX], mythic:[XX]}
      sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify(storedBooster));
      expect(Booster.getBoosterFromStorage()).toEqual(storedBooster);
    });
  });

  describe("haveBoosterEquiped", function() {

    it("default not stored", function() {
      expect(Booster.haveBoosterEquiped()).toBeFalsy();
      expect(Booster.haveBoosterEquiped('B4')).toBeFalsy();
      expect(Booster.haveBoosterEquiped('MB1')).toBeFalsy();
    });

    it("Stored empty", function() {
        sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify({normal: [], mythic:[]}));
      expect(Booster.haveBoosterEquiped()).toBeFalsy();
      expect(Booster.haveBoosterEquiped('B4')).toBeFalsy();
      expect(Booster.haveBoosterEquiped('MB1')).toBeFalsy();
    });

    it("Have B4", function() {
        sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify({normal: [B4], mythic:[]}));
      expect(Booster.haveBoosterEquiped()).toBeTruthy();
      expect(Booster.haveBoosterEquiped('B4')).toBeTruthy();
      expect(Booster.haveBoosterEquiped('MB1')).toBeFalsy();
    });

    it("Have booster expired", function() {
        sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify({normal: [XX], mythic:[]}));
      expect(Booster.haveBoosterEquiped()).toBeFalsy();
      expect(Booster.haveBoosterEquiped('XX')).toBeFalsy();
      sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify({normal: [], mythic:[XX]}));
      expect(Booster.haveBoosterEquiped()).toBeFalsy();
      expect(Booster.haveBoosterEquiped('XX')).toBeTruthy(); // No expiry date on mythic booster
    });

    it("Have MB1", function() {
        sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify({normal: [], mythic:[MB1]}));
      expect(Booster.haveBoosterEquiped()).toBeFalsy();
      expect(Booster.haveBoosterEquiped('B4')).toBeFalsy();
      expect(Booster.haveBoosterEquiped('MB1')).toBeTruthy();
    });

    it("Have Many", function() {
        sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify({normal: [XX,B4], mythic:[MB1]}));
      expect(Booster.haveBoosterEquiped()).toBeTruthy();
      expect(Booster.haveBoosterEquiped('XX')).toBeFalsy();
      expect(Booster.haveBoosterEquiped('B4')).toBeTruthy();
      expect(Booster.haveBoosterEquiped('MB1')).toBeTruthy();
      expect(Booster.haveBoosterEquiped('ZZ')).toBeFalsy();
    });
  });

  describe("equipeSandalWoodIfNeeded", function() {

    beforeEach(function() {
      // Always true here
      unsafeWindow.hh_ajax = jest.fn(() => {
          const fakeResponse = {
              success: true
          };
          return Promise.resolve(fakeResponse);
      });
      // Have boosters equipped none
      sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_boosterStatus", JSON.stringify({normal: [], mythic:[]}));
      // Have boosters
      const boosters = '{"B1":123,"B2":123,"B3":123,"B4":123,"MB1":123,"MB2":123,"MB3":123,"MB4":123}';
      sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_haveBooster", boosters);
      sessionStorage.setItem(HHStoredVarPrefixKey+"Temp_sandalwoodFailure", '0');
    });

    function setGirl(mythic:boolean, troll:number, shards:number){
      const girl = `{"girl_id":666,"troll_id":"${troll}","shards":${shards},"is_mythic":${mythic},"name":"NEXT_GIRL","event_id":"event_666"}`;
      if (mythic)
        sessionStorage.setItem(HHStoredVarPrefixKey + "Temp_eventMythicGirl", girl);
      else
        sessionStorage.setItem(HHStoredVarPrefixKey + "Temp_eventGirl", girl);
    }

    it("default", async function() {
      Booster.equipeSandalWoodIfNeeded(1).then(data => {
        expect(data).toBeFalsy();
      });
    });

    it("No all active", async function() {
      setGirl(true, 99, 55);
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythic", 'false');
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood", 'true');
      Booster.equipeSandalWoodIfNeeded(1).then(data => {
        expect(data).toBeFalsy();
      });
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythic", 'true');
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood", 'false');
      Booster.equipeSandalWoodIfNeeded(1).then(data => {
        expect(data).toBeFalsy();
      });
    });

    it("Stored mythic girl", function() {
      setGirl(true, 99, 55);
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythic", 'true');
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood", 'true');
      Booster.equipeSandalWoodIfNeeded(1).then(data => {
        // wrong troll
        expect(data).toBeFalsy();
      });
      Booster.equipeSandalWoodIfNeeded(99).then(data => {
        expect(data).toBeTruthy();
      });
    });

    it("No mythic girl", function() {
      setGirl(false, 99, 55);
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythic", 'true');
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood", 'true');
      Booster.equipeSandalWoodIfNeeded(99).then(data => {
        expect(data).toBeFalsy();
      });
    });

    it("Ended mythic girl", function() {
      setGirl(true, 99, 100);
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythic", 'true');
      localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood", 'true');
      Booster.equipeSandalWoodIfNeeded(99).then(data => {
        expect(data).toBeFalsy();
      });
    });
    
/*
    describe("Failure equip call", function() {
      
      beforeEach(function() {
        // Test failure case here
        unsafeWindow.hh_ajax = jest.fn(() => {
            const fakeResponse = {
                success: false
            };
            return Promise.resolve(fakeResponse);
        });
      });

      it("Ongoing mythic girl", function() {
        setGirl(true, 99, 55);
        localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythic", 'true');
        localStorage.setItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood", 'true');
        Booster.equipeSandalWoodIfNeeded(99).then(data => {
          expect(data).toBeFalsy();
          expect(sessionStorage.getItem(HHStoredVarPrefixKey+"Temp_sandalwoodFailure")).toBe(1);
        });
        Booster.equipeSandalWoodIfNeeded(99).then(data => {
          expect(data).toBeFalsy();
          expect(sessionStorage.getItem(HHStoredVarPrefixKey+"Temp_sandalwoodFailure")).toBe(2);
          expect(localStorage.getItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood")).toBe('true');
        });
        Booster.equipeSandalWoodIfNeeded(99).then(data => {
          expect(data).toBeFalsy();
          expect(sessionStorage.getItem(HHStoredVarPrefixKey+"Temp_sandalwoodFailure")).toBe(3);
          expect(localStorage.getItem(HHStoredVarPrefixKey+"Setting_plusEventMythicSandalWood")).toBe('false');
        });
      });
    });
    */
  });
});