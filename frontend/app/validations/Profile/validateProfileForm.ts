import { IProfileFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateProfileForm = (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
) => {
  let errors: Partial<IProfileFormValidation> = {};
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
  if (!password)
    errors = {
      ...errors,
      validationResult: false,
      password: VALIDATION_ERROR_MESSAGE.password_required,
    };
  else if (password.length < 6 || password.length > 20)
    errors = {
      ...errors,
      validationResult: false,
      password: VALIDATION_ERROR_MESSAGE.password_length,
    };
  if (!confirmPassword)
    errors = {
      ...errors,
      validationResult: false,
      confirmPassword: VALIDATION_ERROR_MESSAGE.confirmPassword_required,
    };
  else if (confirmPassword.length < 6 || confirmPassword.length > 20)
    errors = {
      ...errors,
      validationResult: false,
      confirmPassword: VALIDATION_ERROR_MESSAGE.confirmPassword_length,
    };
  else if (password !== confirmPassword)
    errors = {
      ...errors,
      validationResult: false,
      confirmPassword: VALIDATION_ERROR_MESSAGE.password_notmatch,
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
      confirmPassword: VALIDATION_ERROR_MESSAGE.lastname_required,
    };
  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};
