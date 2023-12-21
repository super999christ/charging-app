import { IConfirmRegisterFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateSignUpForm = (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  authCode: string,
  accountCode: string,
  pinCode?: string,
  pinConfirmCode?: string
) => {
  let errors: Partial<IConfirmRegisterFormValidation> = {};
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.email_required,
    };
  } else if (email.includes(" ")) {
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.clear_whitespace
    }
  } else if (!emailRegExp.test(email)) {
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.email_invalid,
    };
  }
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
  if (!firstName) {
    errors = {
      ...errors,
      validationResult: false,
      firstName: VALIDATION_ERROR_MESSAGE.firstname_required,
    };
  }
  if (!lastName) {
    errors = {
      ...errors,
      validationResult: false,
      lastName: VALIDATION_ERROR_MESSAGE.lastname_required,
    };
  }
  const authCodeRegExp = /^\d{6}$/;
  if (!authCode)
    errors = {
      ...errors,
      validationResult: false,
      authCode: VALIDATION_ERROR_MESSAGE.authcode_required,
    };
  else if (!authCodeRegExp.test(authCode))
    errors = {
      ...errors,
      validationResult: false,
      authCode: VALIDATION_ERROR_MESSAGE.authcode_invalid,
    };
  
  const accountCodeRegExp = /^[a-zA-Z0-9]{7,16}$/;
  if (!accountCode) {
    errors = {
      ...errors,
      validationResult: false,
      accountCode: VALIDATION_ERROR_MESSAGE.accountcode_required
    }
  } else if (accountCode.length < 7 || accountCode.length > 16) {
    errors = {
      ...errors,
      validationResult: false,
      accountCode: VALIDATION_ERROR_MESSAGE.accountcode_length
    }
  }
  else if (!accountCodeRegExp.test(accountCode)) {
    errors = {
      ...errors,
      validationResult: false,
      accountCode: VALIDATION_ERROR_MESSAGE.accountcode_invalid
    }
  }

  const pinCodeRegExp = /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/;
  if (pinCode !== undefined && pinConfirmCode !== undefined) {
    let pinCodeOk = false,
      pinConfirmCodeOk = false;
    if (!pinCode)
      errors = {
        ...errors,
        validationResult: false,
        pinCode: VALIDATION_ERROR_MESSAGE.pincode_required,
      };
    else if (pinCode.length < 7 || pinCode.length > 20) {
      errors = {
        ...errors,
        validationResult: false,
        pinCode: VALIDATION_ERROR_MESSAGE.pincode_length,
      };
    } else if (!pinCodeRegExp.test(pinCode)) {
      errors = {
        ...errors,
        validationResult: false,
        pinCode: VALIDATION_ERROR_MESSAGE.pincode_invalid,
      };
    } else pinCodeOk = true;
    if (!pinConfirmCode) {
      errors = {
        ...errors,
        validationResult: false,
        pinConfirmCode: VALIDATION_ERROR_MESSAGE.pinconfirmcode_required,
      };
    } else if (pinConfirmCode.length < 7 || pinConfirmCode.length > 20) {
      errors = {
        ...errors,
        validationResult: false,
        pinConfirmCode: VALIDATION_ERROR_MESSAGE.pinconfirmcode_length,
      };
    } else if (!pinCodeRegExp.test(pinConfirmCode)) {
      errors = {
        ...errors,
        validationResult: false,
        pinConfirmCode: VALIDATION_ERROR_MESSAGE.pinconfirmcode_invalid,
      };
    } else pinConfirmCodeOk = true;
    if (pinCode !== pinConfirmCode) {
      errors = {
        ...errors,
        validationResult: false,
        pinConfirmCode: VALIDATION_ERROR_MESSAGE.pincode_notmatch,
      };
    }
  }
  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};
