import { useEffect, useRef, useState } from "react";
import FC from "../../../lib/form/FormatChecker";
import EC from "../../../lib/form/ErrorChecker";
import { INPUT_FIELDS } from "../../../lib/constants";
import { ICardProps } from "../../../lib/interfaces";
import Errors from "./errors/Errors";
import { useAtom } from "jotai/react";
import { cardNumberAtom } from "../../../lib/atoms/atoms";

const CardNumber = ({
  hasErrors,
  setHasErrors,
  isSubmitted,
  setSubmitted,
}: ICardProps) => {
  const [num, setNum] = useState<string>("");
  const [, setNumToShow] = useAtom(cardNumberAtom);
  const [carets, setCarets] = useState({ pos: 0 });
  const [errors, setErrors] = useState({
    format: false,
    blank: true,
    missing: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // set carets after formatting card numbers
    // otherwise caret moves automatically to the end
    inputRef.current?.setSelectionRange(carets.pos, carets.pos);
  }, [num]);

  /* +++++++++++++++ ON CHANGE +++++++++++++++ */
  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    let val = e.currentTarget.value;
    const caretPos = inputRef.current?.selectionStart;

    // format & set number + set caret acordingly
    let formatted = FC.formatCardNum(val, num);
    setCarets({
      pos:
        formatted.length - num.length === 2
          ? (caretPos || 0) + 1 // if I'm adding (1) space between the 4 digits, move caret by 1
          : caretPos || 0, // otherwise save the current caret position
    });
    setNum(formatted);
    setNumToShow(formatted);

    // change submit state after input is changed
    setSubmitted({ ...isSubmitted, number: false });

    // handle errors
    const EH = {
      format: EC.isNotNumber(formatted),
      blank: EC.isBlank(formatted),
      missing: EC.isMissingDigits("card", formatted),
    };
    setErrors(EH);
    setHasErrors({
      ...hasErrors,
      number: EH.format || EH.blank || EH.missing,
    });
  }

  return (
    <fieldset className="number">
      <label htmlFor="number">Card Number</label>
      <input
        ref={inputRef}
        className={`${
          (errors.format ||
            (isSubmitted.number && (errors.blank || errors.missing))) &&
          "error"
        }`}
        placeholder="e.g. 1234 5678 9123 0000"
        type="text"
        value={num}
        name="number"
        onChange={(e) => handleOnChange(e)}
      />
      <Errors
        input={INPUT_FIELDS.number}
        errors={errors}
        isSubmitted={isSubmitted}
      />
    </fieldset>
  );
};

export default CardNumber;
