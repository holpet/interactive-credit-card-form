import { CORRECT_NUM_OF_DIGITS } from "../constants";
import FC from "./FormatChecker";

function isBlank(number: string): boolean {
  number = FC.stripSpaces(number);
  return number.length === 0;
}

function isNotNumber(number: string): boolean {
  number = number.replaceAll(" ", "");
  //let numLen = val.replace(/[^0-9]/g, "");
  return !/^[0-9]+$/.test(number) && number.length !== 0;
}

/* date cannot be older than today */
function isExpired(MM: string, YY: string): boolean {
  if (MM.length < 2 || YY.length < 2) return false;
  const month = new Date().getMonth() + 1;
  const year = Number(new Date().getFullYear().toString().slice(2));
  return Number(YY) < year || (Number(YY) === year && Number(MM) < month);
}

function isNotName(name: string): boolean {
  const regex = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regex.test(name);
}

function isMissingDigits(type: string, number: string): boolean {
  number = FC.stripSpaces(number);
  if (isBlank(number)) return false;
  switch (type) {
    case "card":
      return number.length < CORRECT_NUM_OF_DIGITS.card;
    case "date":
      return number.length < CORRECT_NUM_OF_DIGITS.date;
    case "cvc":
      return number.length < CORRECT_NUM_OF_DIGITS.cvc;
    default:
      return false;
  }
}

export default { isBlank, isNotNumber, isExpired, isNotName, isMissingDigits };
