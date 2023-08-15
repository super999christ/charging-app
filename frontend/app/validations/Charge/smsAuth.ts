import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateSMSAuthForm = (authCode: string) => {
  const authCodeRegExp = /^\d{6}$/;
  if (!authCode)
    return {
      validationResult: false,
      authCode: VALIDATION_ERROR_MESSAGE.authcode_required,
    };
  if (!authCodeRegExp.test(authCode))
    return {
      validationResult: false,
      authCode: VALIDATION_ERROR_MESSAGE.authcode_invalid,
    };
  return { validationResult: true };
};
