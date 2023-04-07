import { SetStateAction } from "react";

// CUSTOM INTERFACES ----------------------------->

export interface IFormProps {
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
}

export interface ISubmittedFields {
  name: boolean;
  number: boolean;
  date: boolean;
  cvc: boolean;
}

export interface ICardProps {
  hasErrors: ISubmittedFields;
  setHasErrors: React.Dispatch<SetStateAction<ISubmittedFields>>;
  isSubmitted: ISubmittedFields;
  setSubmitted: React.Dispatch<SetStateAction<ISubmittedFields>>;
}

export interface IDataError {
  MM: boolean;
  YY: boolean;
}

export interface IErrors {
  format: boolean;
  expired?: boolean;
  blank: boolean | IDataError;
  missing?: boolean | IDataError;
}

export interface IErrorProps {
  input: string;
  errors: IErrors;
  isSubmitted: ISubmittedFields;
}

export interface IFrontData {
  number: string;
  name: string;
  date: string;
}

export interface IBackData {
  cvc: string;
}
