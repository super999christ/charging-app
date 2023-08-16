import { IProfileCreditValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateProfileCreditForm = (
  cardNumber: string,
  expMonth: number,
  expYear: number,
  cardCvv: string
) => {
  let errors: Partial<IProfileCreditValidation> = {};
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

  if (
    !(
      Number(expMonth) > 0 &&
      Number(expMonth) <= 12 &&
      Number(expYear) >= 0 &&
      Number(expYear) < 100
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
