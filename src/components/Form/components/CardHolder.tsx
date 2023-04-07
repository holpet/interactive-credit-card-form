import { useState } from "react";
import EC from "../../../lib/form/ErrorChecker";
import { INPUT_FIELDS } from "../../../lib/constants";
import { ICardProps } from "../../../lib/interfaces";
import Errors from "./errors/Errors";
import { useAtom } from "jotai/react";
import { cardHolderAtom } from "../../../lib/atoms/atoms";

const CardHolder = ({
  hasErrors,
  isSubmitted,
  setHasErrors,
  setSubmitted,
}: ICardProps) => {
  const [name, setName] = useState<string>("");
  const [, setNameToShow] = useAtom(cardHolderAtom);
  const [errors, setErrors] = useState({
    format: false,
    blank: true,
  });

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    // set name
    let val = e.currentTarget.value;
    setName(val);
    setNameToShow(val);

    // change submit state after input is changed
    setSubmitted({ ...isSubmitted, name: false });

    // handle errors
    const EH = {
      format: EC.isNotName(val),
      blank: EC.isBlank(val),
    };
    setErrors(EH);
    setHasErrors({ ...hasErrors, name: EH.format || EH.blank });
  }

  return (
    <fieldset className="name">
      <label htmlFor="name">Cardholder Name</label>
      <input
        className={`${
          (errors.format || (isSubmitted.name && errors.blank)) && "error"
        }`}
        placeholder="e.g. Jane Appleseed"
        value={name}
        name="name"
        onChange={(e) => handleOnChange(e)}
      />
      <Errors
        input={INPUT_FIELDS.name}
        errors={errors}
        isSubmitted={isSubmitted}
      />
    </fieldset>
  );
};

export default CardHolder;
