import {
    Booster
} from '../../src/Module/Booster'
import { HHStoredVarPrefixKey } from '../../src/config/HHStoredVars';

describe("Booster", function() {
  afterEach(() => {
  localStorage.clear();
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
});