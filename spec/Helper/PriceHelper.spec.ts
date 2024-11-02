import {
    parsePrice
} from '../../src/Helper/PriceHelper'

describe("PriceHelper", function () {
  describe("parsePrice", function () {
    it("Unit", function () {
      expect(parsePrice("")).toBe(0);
      expect(parsePrice("1")).toBe(1);
      expect(parsePrice("20")).toBe(20);
      expect(parsePrice("300")).toBe(300);
      expect(parsePrice("1024")).toBe(1024);
      expect(parsePrice("1 024")).toBe(1024);
      expect(parsePrice("1.024")).toBe(1024);
    });
    it("Kilo", function () {
      expect(parsePrice("")).toBe(0);
      expect(parsePrice("1K")).toBe(1000);
      expect(parsePrice("20K")).toBe(20000);
      expect(parsePrice("300K")).toBe(300000);
      expect(parsePrice("1024K")).toBe(1024000);
      expect(parsePrice("1,02K")).toBe(1020);
    });
    it("Million", function () {
      expect(parsePrice("")).toBe(0);
      expect(parsePrice("1M")).toBe(1000000);
      expect(parsePrice("20M")).toBe(20000000);
      expect(parsePrice("300M")).toBe(300000000);
      expect(parsePrice("1024M")).toBe(1024000000);
      expect(parsePrice("1,02M")).toBe(1020000);
    });
    it("Billion", function () {
      expect(parsePrice("")).toBe(0);
      expect(parsePrice("1B")).toBe(1000000000);
      expect(parsePrice("20B")).toBe(20000000000);
      expect(parsePrice("300B")).toBe(300000000000);
      expect(parsePrice("1024B")).toBe(1024000000000);
      expect(parsePrice("1,02B")).toBe(1020000000);
    });
  });
});