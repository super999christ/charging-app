import { ISignInFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateSignInForm = (phoneNumber: string, authCode?: string, pinCode?: string) => {
  let errors: Partial<ISignInFormValidation> = {};
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
  
  if (authCode === '')
    errors = {
      ...errors,
      validationResult: false,
      authCode: VALIDATION_ERROR_MESSAGE.authcode_required,
    };
  
  if (pinCode !== undefined) {
    if (pinCode === '')
      errors = {
        ...errors,
        validationResult: false,
        pinCode: VALIDATION_ERROR_MESSAGE.pincode_required,
      };
  }

  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};
