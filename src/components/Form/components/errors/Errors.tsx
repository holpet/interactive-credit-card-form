import { ERROR_MSG, INPUT_FIELDS } from "../../../../lib/constants";
import { IDataError as DE, IErrorProps } from "../../../../lib/interfaces";

/* Field specific errors */
const Errors = ({ input, errors, isSubmitted }: IErrorProps) => {
  // --------- CARD HOLDER ---------- //
  if (input === INPUT_FIELDS.name)
    return (
      <>
        {errors.format && <p>{ERROR_MSG.format.name}</p>}
        {errors.blank && isSubmitted.name && <p>{ERROR_MSG.blank}</p>}
      </>
    );
  // --------- CARD NUMBER ---------- //
  else if (input === INPUT_FIELDS.number)
    return (
      <>
        {errors.format && <p>{ERROR_MSG.format.numbered}</p>}
        {errors.blank && isSubmitted.number && <p>{ERROR_MSG.blank}</p>}
        {errors.missing && isSubmitted.number && <p>{ERROR_MSG.missing}</p>}
      </>
    );
  // --------- CARD DATE ---------- //
  else if (input === INPUT_FIELDS.date)
    return (
      <>
        {errors.format && <p>{ERROR_MSG.format.numbered}</p>}
        {errors.expired && isSubmitted.date && (
          <p>{ERROR_MSG.format.expired}</p>
        )}
        {((errors.blank as DE).MM || (errors.blank as DE).YY) &&
          isSubmitted.date && <p>{ERROR_MSG.blank}</p>}
        {((errors.missing as DE).MM || (errors.missing as DE).YY) &&
          isSubmitted.date && <p>{ERROR_MSG.missing}</p>}
      </>
    );
  // --------- CARD CVC ---------- //
  else
    return (
      <>
        {errors.format && <p>{ERROR_MSG.format.numbered}</p>}
        {errors.blank && isSubmitted.cvc && <p>{ERROR_MSG.blank}</p>}
        {errors.missing && isSubmitted.cvc && <p>{ERROR_MSG.missing}</p>}
      </>
    );
};

export default Errors;
