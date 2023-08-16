import { IProfilePasswordValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateProfilePasswordForm = (
  password: string,
  confirmPassword: string
) => {
  let errors: Partial<IProfilePasswordValidation> = {};

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
  else if (confirmPassword !== password)
    errors = {
      ...errors,
      validationResult: false,
      confirmPassword: VALIDATION_ERROR_MESSAGE.password_notmatch,
    };

  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};
