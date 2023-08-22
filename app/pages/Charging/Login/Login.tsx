import { FC, useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";

type IChargingLoginError = IAuthCodeValidation &
  IChargingLoginValidation & { page: string };

const Login: FC = () => {
  const [stationId, setStationId] = useState("");
  const [chargingEventId, setChargingEventId] = useState("");
  const [errors, setErrors] = useState<Partial<IChargingLoginError>>();
  const [sendCodeEnabled, setSendCodeEnabled] = useState(true);
  const [searchParams] = useSearchParams();
  const [alertMsg, setAlertMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('signup')) {
      setAlertMsg('Successful signup, you can start charging');
      navigate('/charging-login');
    }
  }, []);

  useEffect(() => {
    if (errors?.stationId || errors?.page) {
      setAlertMsg('');
    }
  }, [errors]);

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
      console.log((err as any).response?.data);
      if (err instanceof AxiosError)
        setErrors({ page: err.response?.data.message });
    }
  };

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="flex flex-col w-full gap-5 mb-5">
          <div className="text-nxu-charging-green">
            {alertMsg}
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              className={inputStyle}
              placeholder="Enter Charger ID"
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
                className="text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[350px] py-[10px] rounded text-lg font-semibold mt-5 disabled:bg-nxu-charging-disabled"
                onClick={onSubmit}
                disabled={!sendCodeEnabled}
              >
                Charge
              </button>
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
