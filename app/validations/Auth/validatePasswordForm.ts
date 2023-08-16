import { IConfirmRegisterFormValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validatePasswordForm = (
  password: string,
  passwordConfirm: string,
  authCode: string,
  cardNumber: string,
  cardExpDate: string,
  cardCvv: string
) => {
  let errors: Partial<IConfirmRegisterFormValidation> = {};
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
