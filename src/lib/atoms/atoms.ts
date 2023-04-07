import { atom } from "jotai";
import { INIT_CARD_DATA } from "../constants";

// Shared states (no propagation of props needed) //

export const cardNumberAtom = atom<string>(INIT_CARD_DATA.number);
export const cardHolderAtom = atom<string>(INIT_CARD_DATA.name);
export const cardMMAtom = atom<string>(INIT_CARD_DATA.MM);
export const cardYYAtom = atom<string>(INIT_CARD_DATA.YY);
export const cardCVCAtom = atom<string>(INIT_CARD_DATA.cvc);
export const submitSuccessAtom = atom<boolean>(false);
