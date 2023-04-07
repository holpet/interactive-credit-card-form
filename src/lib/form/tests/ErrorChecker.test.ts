import EC from "../ErrorChecker";

describe("ErrorChecker", () => {
  describe("isBlank", () => {
    it("should return true when given an empty string", () => {
      expect(EC.isBlank("")).toBe(true);
    });

    it("should return false when given a non-empty string", () => {
      expect(EC.isBlank("hello")).toBe(false);
    });

    it("should strip whitespace before checking for blankness", () => {
      expect(EC.isBlank("   ")).toBe(true);
      expect(EC.isBlank("  hello  ")).toBe(false);
    });
  });

  describe("isNotNumber", () => {
    it("should return true when given a string with non-numeric characters", () => {
      expect(EC.isNotNumber("abc")).toBe(true);
      expect(EC.isNotNumber("123-456-7890")).toBe(true);
    });

    it("should return false when given a string with only numeric characters", () => {
      expect(EC.isNotNumber("123")).toBe(false);
    });

    it("should strip whitespace before checking for non-numeric characters", () => {
      expect(EC.isNotNumber(" 123 ")).toBe(false);
      expect(EC.isNotNumber("12 3")).toBe(false);
    });
  });

  describe("isExpired", () => {
    it("should return true when given a date in the past", () => {
      expect(EC.isExpired("01", "20")).toBe(true);
    });

    it("should return false when given a date in the future", () => {
      expect(EC.isExpired("01", "25")).toBe(false);
    });

    it("should return false when given the current month and year", () => {
      const month = new Date().getMonth() + 1;
      const year = Number(new Date().getFullYear().toString().slice(2));
      expect(EC.isExpired(month.toString(), year.toString())).toBe(false);
    });

    it("should return false when given incomplete date information", () => {
      expect(EC.isExpired("", "")).toBe(false);
      expect(EC.isExpired("01", "")).toBe(false);
      expect(EC.isExpired("", "20")).toBe(false);
    });
  });

  describe("isNotName", () => {
    it("should return true when given a string with non-letter characters", () => {
      expect(EC.isNotName("123")).toBe(true);
      expect(EC.isNotName("John123")).toBe(true);
    });

    it("should return false when given a string with only letter characters", () => {
      expect(EC.isNotName("John")).toBe(false);
    });
  });

  describe("isMissingDigits", () => {
    test("returns false when the number has correct length", () => {
      expect(EC.isMissingDigits("card", "4111111111111111")).toBe(false);
      expect(EC.isMissingDigits("date", "12")).toBe(false);
      expect(EC.isMissingDigits("cvc", "123")).toBe(false);
    });

    test("returns true when the number has incorrect length", () => {
      expect(EC.isMissingDigits("card", "41111")).toBe(true);
      expect(EC.isMissingDigits("date", "1")).toBe(true);
      expect(EC.isMissingDigits("cvc", "12")).toBe(true);
    });

    test("returns false when the number is blank", () => {
      expect(EC.isMissingDigits("card", "")).toBe(false);
      expect(EC.isMissingDigits("date", "")).toBe(false);
      expect(EC.isMissingDigits("cvc", "")).toBe(false);
    });
  });
});
