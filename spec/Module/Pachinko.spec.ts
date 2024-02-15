import {
  Pachinko
} from '../../src/Module/Pachinko';

describe("Pachinko", function() {
  describe("getHumanPachinkoFromOrbName", function() {
    it("default", function() {
      expect(Pachinko.getHumanPachinkoFromOrbName(null)).toBe('Unknown');
      expect(Pachinko.getHumanPachinkoFromOrbName(undefined)).toBe('Unknown');
      expect(Pachinko.getHumanPachinkoFromOrbName('')).toBe('Unknown');
    });
    it("Unknown", function() {
      expect(Pachinko.getHumanPachinkoFromOrbName('o_xx')).toBe('Unknown');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_x10')).toBe('Unknown');
      expect(Pachinko.getHumanPachinkoFromOrbName('ANY')).toBe('Unknown');
    });
    it("Event Pachinko", function () {
      expect(Pachinko.getHumanPachinkoFromOrbName('o_v4')).toBe('4');
    });
    it("Epic Pachinko", function () {
      expect(Pachinko.getHumanPachinkoFromOrbName('o_e1')).toBe('1');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_e10')).toBe('10');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_ed')).toBe('Draft');
    });
    it("Mythic Pachinko", function () {
      expect(Pachinko.getHumanPachinkoFromOrbName('o_m1')).toBe('1');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_m3')).toBe('3');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_m6')).toBe('6');
    });
    it("Equipment Pachinko", function () {
      expect(Pachinko.getHumanPachinkoFromOrbName('o_eq1')).toBe('1');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_eq2')).toBe('2');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_eq10')).toBe('10');
    });
    it("Great Pachinko", function () {
      expect(Pachinko.getHumanPachinkoFromOrbName('o_g1')).toBe('1');
      expect(Pachinko.getHumanPachinkoFromOrbName('o_g10')).toBe('10');
    });
  });
});