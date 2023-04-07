import { useState } from "react";
import { ICardProps } from "../../../lib/interfaces";
import FC from "../../../lib/form/FormatChecker";
import EC from "../../../lib/form/ErrorChecker";
import { INPUT_FIELDS } from "../../../lib/constants";
import Errors from "./errors/Errors";
import { useAtom } from "jotai/react";
import { cardCVCAtom } from "../../../lib/atoms/atoms";

const CardCVC = ({
  hasErrors,
  setHasErrors,
  isSubmitted,
  setSubmitted,
}: ICardProps) => {
  const [cvc, setCvc] = useState("");
  const [, setCVCtoShow] = useAtom(cardCVCAtom);
  const [errors, setErrors] = useState({
    format: false,
    blank: true,
    missing: false,
  });

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    // format & set date numbers
    let val = e.currentTarget.value;
    let formatted = FC.trimDigitsToLimit("cvc", val);
    setCvc(formatted);
    setCVCtoShow(formatted);

    // change submit state after input is changed
    setSubmitted({ ...isSubmitted, cvc: false });

    // handle errors
    const EH = {
      format: EC.isNotNumber(formatted),
      blank: EC.isBlank(formatted),
      missing: EC.isMissingDigits("cvc", formatted),
    };
    setErrors(EH);
    setHasErrors({
      ...hasErrors,
      cvc: EH.format || EH.blank || EH.missing,
    });
  }

  return (
    <fieldset className="cvc">
      <label htmlFor="cvc">CVC</label>
      <input
        className={`${
          (errors.format ||
            (isSubmitted.cvc && (errors.blank || errors.missing))) &&
          "error"
        }`}
        placeholder="e.g. 123"
        value={cvc}
        name="cvc"
        id="cvc"
        onChange={(e) => handleOnChange(e)}
      />
      <Errors
        input={INPUT_FIELDS.cvc}
        errors={errors}
        isSubmitted={isSubmitted}
      />
    </fieldset>
  );
};

export default CardCVC;
