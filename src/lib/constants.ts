export const ERROR_MSG = {
  format: {
    numbered: "Wrong format, numbers only",
    name: "Can't contain special characters or numbers",
    expired: "Date is expired",
  },
  blank: "Can't be blank",
  missing: "Missing digits",
};

export const CORRECT_NUM_OF_DIGITS = {
  card: 16,
  date: 2,
  cvc: 3,
};

export const INPUT_FIELDS = {
  name: "card_holder",
  number: "card_number",
  date: "card_date",
  cvc: "card_cvc",
};

export const INIT_CARD_DATA = {
  number: "0000 0000 0000 0000",
  name: "Jane Appleseed",
  MM: "00",
  YY: "00",
  cvc: "000",
};

export const INIT_SUBMIT_STATE = {
  name: false,
  number: false,
  date: false,
  cvc: false,
};

export const SUBMITTED_STATE = {
  name: true,
  number: true,
  date: true,
  cvc: true,
};
