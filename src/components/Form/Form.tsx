import "./Form.scss";
import { useState } from "react";
import CardNumber from "./components/CardNumber";
import CardHolder from "./components/CardHolder";
import CardDate from "./components/CardDate";
import CardCVC from "./components/CardCVC";
import { IFormProps, ISubmittedFields as SF } from "../../lib/interfaces";
import { INIT_SUBMIT_STATE, SUBMITTED_STATE } from "../../lib/constants";
import { useAtom } from "jotai/react";
import { submitSuccessAtom } from "../../lib/atoms/atoms";

const Form = ({ setSuccess }: IFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState<SF>(INIT_SUBMIT_STATE);
  const [hasErrors, setHasErrors] = useState<SF>(SUBMITTED_STATE);
  const [, setSubmitSuccess] = useAtom(submitSuccessAtom);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitted(SUBMITTED_STATE);
    if (hasErrors.name || hasErrors.number || hasErrors.date || hasErrors.cvc) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
    setSubmitSuccess(true);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <CardHolder
        hasErrors={hasErrors}
        setHasErrors={setHasErrors}
        isSubmitted={isSubmitted}
        setSubmitted={setIsSubmitted}
      />
      <CardNumber
        hasErrors={hasErrors}
        setHasErrors={setHasErrors}
        isSubmitted={isSubmitted}
        setSubmitted={setIsSubmitted}
      />
      <CardDate
        hasErrors={hasErrors}
        setHasErrors={setHasErrors}
        isSubmitted={isSubmitted}
        setSubmitted={setIsSubmitted}
      />
      <CardCVC
        hasErrors={hasErrors}
        setHasErrors={setHasErrors}
        isSubmitted={isSubmitted}
        setSubmitted={setIsSubmitted}
      />
      <div>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Form;
