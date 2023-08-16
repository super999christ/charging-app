import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import InputMask from 'react-input-mask';

import {
  checkChargingStatus,
  startCharge,
  checkSMSAuth,
} from "../../../helpers";
import {
  validateStartChargeForm,
  validateSMSAuthForm,
} from "../../../validations";
import {
  IChargingLoginValidation,
  IAuthCodeValidation,
} from "../../../types/ValidationErrors.type";
import { AxiosError } from "axios";

type IChargingLoginError = IAuthCodeValidation &
  IChargingLoginValidation & { page: string };

const Login: FC = () => {
  const [stationId, setStationId] = useState("");
  const [chargingEventId, setChargingEventId] = useState("");
  const [errors, setErrors] = useState<Partial<IChargingLoginError>>();
  const [sendCodeEnabled, setSendCodeEnabled] = useState(true);
  
  const navigate = useNavigate();

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    // Validation
    try {
      const { data: chargingEvent } = await startCharge(stationId);
      setChargingEventId(chargingEvent.id);
      setErrors({ page: '' });
      navigate(
        `/charging-status?phoneNumber=${chargingEvent.phoneNumber}&stationId=${stationId}&eventId=${chargingEvent.id}`
      );
    } catch (err) {
      if (err instanceof AxiosError)
        setErrors({ page: err.response?.data.message });
    }
  };

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center md:justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Get Code To Charge
        </div>
        <div className="flex flex-col w-full gap-5 mb-5">
          <div className="flex flex-col">
            <input
              type="number"
              className={inputStyle}
              placeholder="Charger ID"
              value={stationId}
              onChange={(e) => {
                setErrors(undefined);
                setStationId(e.target.value);
              }}
            />
            {errors?.stationId && (
              <label className="text-nxu-charging-red text-[12px]">
                {errors.stationId}
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-[10px]">
              <button
                className="text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[350px] py-[10px] rounded text-lg font-semibold mt-5"
                onClick={onSubmit}
                disabled={!sendCodeEnabled}
              >
                Charge
              </button>
            </div>
            <div className="w-full flex justify-end">
              {errors?.authCode && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.authCode}
                </label>
              )}
            </div>
          </div>
          {errors?.page && (
            <label className="text-nxu-charging-red text-[12px]">
              {errors.page}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
