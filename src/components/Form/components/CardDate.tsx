import { useState } from "react";
import FC from "../../../lib/form/FormatChecker";
import EC from "../../../lib/form/ErrorChecker";
import { INPUT_FIELDS } from "../../../lib/constants";
import { ICardProps } from "../../../lib/interfaces";
import Errors from "./errors/Errors";
import { useAtom } from "jotai/react";
import { cardMMAtom, cardYYAtom } from "../../../lib/atoms/atoms";

const CardDate = ({
  hasErrors,
  setHasErrors,
  isSubmitted,
  setSubmitted,
}: ICardProps) => {
  const [MM, setMM] = useState<string>("");
  const [YY, setYY] = useState<string>("");
  const [, setMMtoShow] = useAtom(cardMMAtom);
  const [, setYYtoShow] = useAtom(cardYYAtom);
  const [errors, setErrors] = useState({
    format: false,
    expired: false,
    blank: { MM: true, YY: true },
    missing: { MM: false, YY: false },
  });

  function handleOnChange(e: React.FormEvent<HTMLInputElement>, type: string) {
    // format & set date numbers
    let val = e.currentTarget.value;
    let formatted = FC.trimDigitsToLimit("date", val);
    const date = {
      MM: type === "MM" ? FC.formatMonth(formatted) : MM,
      YY: type === "YY" ? formatted : YY,
    };
    setMM(date.MM);
    setYY(date.YY);
    setMMtoShow(date.MM);
    setYYtoShow(date.YY);

    // change submit state after input is changed
    setSubmitted({ ...isSubmitted, date: false });

    // handle errors
    const EH = {
      format: EC.isNotNumber(formatted),
      expired: EC.isExpired(date.MM, date.YY),
      blank: { MM: EC.isBlank(date.MM), YY: EC.isBlank(date.YY) },
      missing: {
        MM: EC.isMissingDigits("date", date.MM),
        YY: EC.isMissingDigits("date", date.YY),
      },
    };
    setErrors(EH);
    setHasErrors({
      ...hasErrors,
      date:
        EH.format ||
        EH.expired ||
        EH.blank.MM ||
        EH.blank.YY ||
        EH.missing.MM ||
        EH.missing.YY,
    });
  }

  return (
    <fieldset className="date">
      <label htmlFor="date">Exp. Date (MM/YY)</label>
      <div>
        <input
          className={`${
            errors.format ||
            (isSubmitted.date &&
              (errors.blank.MM || errors.missing.MM || errors.expired) &&
              "error")
          }`}
          placeholder="MM"
          value={MM}
          name="MM"
          id="date"
          onChange={(e) => handleOnChange(e, "MM")}
        />
        <input
          className={`${
            (errors.format ||
              (isSubmitted.date &&
                (errors.blank.YY || errors.missing.YY || errors.expired))) &&
            "error"
          }`}
          placeholder="YY"
          value={YY}
          name="YY"
          onChange={(e) => handleOnChange(e, "YY")}
        />
      </div>
      <Errors
        input={INPUT_FIELDS.date}
        errors={errors}
        isSubmitted={isSubmitted}
      />
    </fieldset>
  );
};

export default CardDate;
