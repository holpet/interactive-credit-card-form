import FC from "../FormatChecker";

describe("FC", () => {
  describe("stripSpaces", () => {
    it("should remove all spaces from a string", () => {
      const input = "  1234 5678 9012 3456  ";
      const expectedOutput = "1234567890123456";
      const actualOutput = FC.stripSpaces(input);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe("formatCardNum", () => {
    it("should format a valid credit card number with spaces", () => {
      const input = "1234567890123456";
      const prev = "";
      const expectedOutput = "1234 5678 9012 3456";
      const actualOutput = FC.formatCardNum(input, prev);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("should trim excess digits from a credit card number and format with spaces", () => {
      const input = "12345678901234567890";
      const prev = "";
      const expectedOutput = "1234 5678 9012 3456";
      const actualOutput = FC.formatCardNum(input, prev);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("should return an empty string if input is blank", () => {
      const input = "";
      const prev = "";
      const expectedOutput = "";
      const actualOutput = FC.formatCardNum(input, prev);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("should return the input string if it has the same length as the previous string", () => {
      const input = "1234 5678 9012 3456";
      const prev = "1234567890123456";
      const expectedOutput = input;
      const actualOutput = FC.formatCardNum(input, prev);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe("formatMonth", () => {
    it("should format a valid month string", () => {
      const input = "05";
      const expectedOutput = "05";
      const actualOutput = FC.formatMonth(input);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("should limit the month value to 12", () => {
      const input = "13";
      const expectedOutput = "12";
      const actualOutput = FC.formatMonth(input);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("should return an empty string if input is blank", () => {
      const input = "";
      const expectedOutput = "";
      const actualOutput = FC.formatMonth(input);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe("trimDigitsToLimit", () => {
    it("should trim excess digits from a credit card number string", () => {
      const input = "12345678901234567890";
      const expectedOutput = "1234567890123456";
      const actualOutput = FC.trimDigitsToLimit("card", input);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("should remove all spaces from the input string", () => {
      const input = "  1234 5678 9012 3456  ";
      const expectedOutput = "1234567890123456";
      const actualOutput = FC.trimDigitsToLimit("card", input);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });
});
