import { IForgotPasswordFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateForgotPasswordForm = (email: string) => {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errors: Partial<IForgotPasswordFormValidation> = {};
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

  if (Object.keys(errors).length === 0) return { validationResult: true };
  else return errors;
};
