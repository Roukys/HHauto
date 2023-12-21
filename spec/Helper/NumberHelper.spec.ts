import {
  NumberHelper
} from '../../src/Helper/NumberHelper'

describe("NumberHelper", () => {
  let thousandsSeparator:string;
  beforeAll(() => {
    thousandsSeparator = (11111).toLocaleString().replace(/1+/g, '');
  });

  describe("add1000sSeparator", () => {
    it("no thousand", () => {
      expect(NumberHelper.add1000sSeparator('11 111')).toBe('11'+thousandsSeparator+'111');
      expect(NumberHelper.add1000sSeparator('11.111')).toBe('11'+thousandsSeparator+'111');
      expect(NumberHelper.add1000sSeparator('11,111')).toBe('11'+thousandsSeparator+'111');
      expect(NumberHelper.add1000sSeparator('11111')).toBe('11'+thousandsSeparator+'111');
    });

    it("thousand", () => {
      expect(NumberHelper.add1000sSeparator('222')).toBe('222');
    });
  });

  describe("remove1000sSeparator", () => {
    it("no thousand", () => {
      expect(NumberHelper.remove1000sSeparator('11 111')).toBe(11111);
      expect(NumberHelper.remove1000sSeparator('11.111')).toBe(11111);
      expect(NumberHelper.remove1000sSeparator('11,111')).toBe(11111);
      expect(NumberHelper.remove1000sSeparator('11'+thousandsSeparator+'111')).toBe(11111);
    });

    it("thousand", () => {
      expect(NumberHelper.remove1000sSeparator('222')).toBe(222);
    });
  });

  describe("nThousand", () => {
    it("no number", () => {
      expect(NumberHelper.nThousand(null)).toBe('0');
      expect(NumberHelper.nThousand(undefined)).toBe('0');
      expect(NumberHelper.nThousand({})).toBe('0');
      expect(NumberHelper.nThousand("")).toBe('0');
    });
  
    it("no thousand", () => {
      expect(NumberHelper.nThousand(132)).toBe('132');
      expect(NumberHelper.nThousand(1)).toBe('1');
    });
  
    it("thousand", () => {
      expect(NumberHelper.nThousand(11111)).toBe('11'+thousandsSeparator+'111');
      expect(NumberHelper.nThousand(123456)).toBe('123'+thousandsSeparator+'456');
    });
  });

  describe("nRounding", () => {
    it("round", () => {
      const updown = 0;
      expect(NumberHelper.nRounding(123,0,updown)).toBe("123");
      expect(NumberHelper.nRounding(123,2,updown)).toBe("123.00");
      expect(NumberHelper.nRounding(123456,0,updown)).toBe("123K");
      expect(NumberHelper.nRounding(123456,2,updown)).toBe("123.46K");
    });
  
    it("ceil", () => {
      const updown = 1;
      expect(NumberHelper.nRounding(123,0,updown)).toBe("123");
      expect(NumberHelper.nRounding(123,2,updown)).toBe("123.00");
      expect(NumberHelper.nRounding(123456,0,updown)).toBe("124K");
      expect(NumberHelper.nRounding(123456,2,updown)).toBe("123.46K");
    });
  
    it("floor", () => {
      const updown = -1;
      expect(NumberHelper.nRounding(123,0,updown)).toBe("123");
      expect(NumberHelper.nRounding(123,2,updown)).toBe("123.00");
      expect(NumberHelper.nRounding(123456,0,updown)).toBe("123K");
      expect(NumberHelper.nRounding(123456,2,updown)).toBe("123.45K");
    });
  });
});