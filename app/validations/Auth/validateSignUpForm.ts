import { IConfirmRegisterFormValidation, ISignUpFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateSignUpForm = (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  authCode: string,
  cardNumber: string,
  cardExpDate: string,
  cardCvv: string
) => {
  let errors: Partial<IConfirmRegisterFormValidation> = {};
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.email_required
    };
  } else if (!emailRegExp.test(email)) {
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.email_invalid
    }
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
      email: VALIDATION_ERROR_MESSAGE.firstname_required
    };
  }
  if (!lastName) {
    errors = {
      ...errors,
      validationResult: false,
      email: VALIDATION_ERROR_MESSAGE.lastname_required
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

  const cardNumberRegExp = /^[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}$/;
  if (!cardNumber)
    errors = {
      ...errors,
      validationResult: false,
      cardNumber: VALIDATION_ERROR_MESSAGE.cardnumber_required,
    };
  else if (!cardNumberRegExp.test(cardNumber)) {
    errors = {
      ...errors,
      validationResult: false,
      cardNumber: VALIDATION_ERROR_MESSAGE.cardnumber_invalid,
    };
  }

  const expdateChunks = [cardExpDate.slice(0, 2), cardExpDate.slice(2, 4)];
  const currentYear = new Date(Date.now()).getFullYear();
  if (!cardExpDate)
    errors = {
      ...errors,
      validationResult: false,
      cardExpDate: VALIDATION_ERROR_MESSAGE.cardexpdate_required,
    };
  else if (
    !(
      Number(expdateChunks[0]) > 0 &&
      Number(expdateChunks[0]) <= 12 &&
      Number(expdateChunks[1]) > 0 &&
      Number(expdateChunks[1]) < 100
    )
  )
    errors = {
      ...errors,
      validationResult: false,
      cardExpDate: VALIDATION_ERROR_MESSAGE.cardexpdate_invalid,
    };

  const CVVRegExp = /^[0-9]{3,4}$/;
  if (!cardCvv)
    errors = {
      ...errors,
      validationResult: false,
      cardCvv: VALIDATION_ERROR_MESSAGE.cardcvv_required,
    };
  else if (!CVVRegExp.test(cardCvv))
    errors = {
      ...errors,
      validationResult: false,
      cardCvv: VALIDATION_ERROR_MESSAGE.cardcvv_invalid,
    };

  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};