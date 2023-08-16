import { ISignUpFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateSignUpForm = (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
) => {
  let errors: Partial<ISignUpFormValidation> = {};
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email)
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.email_required,
    };
  else if (!emailRegExp.test(email))
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.email_invalid,
    };

  const phoneNumberRegExp = /\d{3}-\d{3}-\d{4}$/;
  if (!phoneNumber)
    errors = {
      ...errors,
      validationResult: false,
      phoneNumber: VALIDATION_ERROR_MESSAGE.phonenumber_required,
    };
  else if (!phoneNumberRegExp.test(phoneNumber))
    errors = {
      ...errors,
      validationResult: false,
      phoneNumber: VALIDATION_ERROR_MESSAGE.phonenumber_invalid,
    };

  if (!firstName)
    errors = {
      ...errors,
      validationResult: false,
      firstName: VALIDATION_ERROR_MESSAGE.firstname_required,
    };

  if (!lastName)
    errors = {
      ...errors,
      validationResult: false,
      lastName: VALIDATION_ERROR_MESSAGE.lastname_required,
    };

  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};
