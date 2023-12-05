import { IChargingStationValidation } from "../../types/ValidationErrors.type";
import { VALIDATION_ERROR_MESSAGE } from "../validationMessage.const";

export const validateStartChargeForm = (
  stationId: string
) => {
  let errors: Partial<IChargingStationValidation> = {};
  const stationIdTmp = Number(stationId);
  if (!stationIdTmp)
    errors = {
      ...errors,
      validationResult: false,
      stationId: VALIDATION_ERROR_MESSAGE.stationid_required,
    };
  else if (!(Number.isInteger(stationIdTmp) && stationIdTmp >= 0))
    errors = {
      ...errors,
      validationResult: false,
      stationId: VALIDATION_ERROR_MESSAGE.stationid_invalid,
    };

  if (Object.keys(errors).length === 0) return { validationResult: true };
  return errors;
};
