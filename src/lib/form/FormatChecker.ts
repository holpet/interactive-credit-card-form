import { CORRECT_NUM_OF_DIGITS } from "../constants";
import EC from "./ErrorChecker";

function stripSpaces(val: string): string {
  return val.replaceAll(" ", "");
}
function formatCardNum(val: string, prev: string): string {
  if (EC.isBlank(val)) return val;

  // if user deleted/added space - let them cook and return value without formatting
  let stripped = stripSpaces(val);
  let strippedPrev = stripSpaces(prev);
  let len = stripped.length;
  if (len === strippedPrev.length) return val;

  // if user added other symbols - return formatted value
  if (len > CORRECT_NUM_OF_DIGITS.card)
    stripped = trimDigitsToLimit("card", stripped);
  const formatNumber = (number: string) =>
    number.split("").reduce((seed, next, index) => {
      if (index !== 0 && !(index % 4)) seed += " ";
      return seed + next;
    }, "");
  stripped = formatNumber(stripped);
  return stripped;
}

function formatMonth(MM: string): string {
  if (EC.isBlank(MM)) return MM;
  MM = Number(MM) > 12 ? "12" : MM;
  return MM;
}

function trimDigitsToLimit(type: string, number: string): string {
  number = stripSpaces(number);
  switch (type) {
    case "card":
      return number.slice(0, CORRECT_NUM_OF_DIGITS.card);
    case "date":
      return number.slice(0, CORRECT_NUM_OF_DIGITS.date);
    case "cvc":
      return number.slice(0, CORRECT_NUM_OF_DIGITS.cvc);
    default:
      return "";
  }
}

export default {
  stripSpaces,
  formatCardNum,
  formatMonth,
  trimDigitsToLimit,
};
