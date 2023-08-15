import { IResetPasswordFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateResetPasswordForm = (
  password: string,
  passwordConfirm: string
) => {
  let errors: Partial<IResetPasswordFormValidation> = {};
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
  if (!passwordConfirm)
    errors = {
      ...errors,
      validationResult: false,
      confirmPassword: VALIDATION_ERROR_MESSAGE.confirmPassword_required,
    };
  else if (passwordConfirm.length < 6 || passwordConfirm.length > 20)
    errors = {
      ...errors,
      validationResult: false,
      confirmPassword: VALIDATION_ERROR_MESSAGE.confirmPassword_length,
    };
  else if (password !== passwordConfirm)
    errors = {
      ...errors,
      validationResult: false,
      confirmPassword: VALIDATION_ERROR_MESSAGE.password_notmatch,
    };
  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};
