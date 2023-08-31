import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  startCharge,
  findActiveSession,
  getUserProfile,
  getCreditCard,
  CreditCard,
} from "../../../helpers";
import { validateToken } from "../../../validations";
import {
  IChargingLoginValidation,
  IAuthCodeValidation,
} from "../../../types/ValidationErrors.type";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

type IChargingLoginError = IAuthCodeValidation &
  IChargingLoginValidation & { page: string };

const Login: FC = () => {
  const [stationId, setStationId] = useState("");
  const [activeSesion, setActiveSession] = useState(null);
  const [errors, setErrors] = useState<Partial<IChargingLoginError>>();
  const [sendCodeEnabled, setSendCodeEnabled] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [creditCard, setCreditCard] = useState<CreditCard | null>(null);

  const navigate = useNavigate();

  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  useEffect(() => {
    getCreditCard()
      .then(setCreditCard)
      .catch((_err) => {});
  }, []);

  // useEffect(() => {
  //   const fetchCC = () => {
  //     getCreditCard()
  //       .then(setCreditCard)
  //       .catch((err) => {});
  //   };
  //   fetchCC();
  //   const timerId = setInterval(() => {
  //     fetchCC();
  //   }, 3000);
  //   return () => clearInterval(timerId);
  // }, []);

  useEffect(() => {
    const syncSession = async () => {
      try {
        const { data: chargingEvent } = await findActiveSession();
        setActiveSession(chargingEvent);
      } catch (err) {
        setActiveSession(null);
      }
    };
    syncSession();
  }, []);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    // Validation
    try {
      const { data: chargingEvent } = await startCharge(stationId);
      setErrors({ page: "" });
      navigate(
        `/charging-status?phoneNumber=${chargingEvent.phoneNumber}&stationId=${stationId}&eventId=${chargingEvent.id}`
      );
    } catch (err) {
      console.log((err as any).response?.data);
      if (err instanceof AxiosError)
        setErrors({ page: err.response?.data.message });
    }
  };

  const onChargingStatus = () => {
    if (!activeSesion) return;
    const chargingEvent = activeSesion as any;
    navigate(
      `/charging-status?phoneNumber=${chargingEvent.phoneNumber}&stationId=${chargingEvent.stationId}&eventId=${chargingEvent.id}`
    );
  };

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="flex flex-col w-full gap-5 mb-5">
          <div className="text-nxu-charging-white text-[16px]">
            You must plug charger connector into car before pressing start.
          </div>
          {!creditCard && (
            <div className="text-nxu-charging-white text-[14px]">
              Credit Card is required for charging. Please enter your credit
              card information in your{" "}
              <Link
                to={`/profile-creditcard`}
                className="text-nxu-charging-gold"
              >
                account profile
              </Link>
            </div>
          )}
          {creditCard && (
            <div className="flex flex-col">
              <input
                type="number"
                className={inputStyle}
                placeholder="Enter Charger ID"
                value={stationId}
                disabled={!creditCard}
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
          )}
          <div className="flex flex-col">
            {sendCodeEnabled && !activeSesion && creditCard && (
              <div className="flex flex-row gap-[10px]">
                <button
                  className="text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[350px] py-[10px] rounded text-lg font-semibold mt-5 disabled:bg-nxu-charging-disabled"
                  onClick={onSubmit}
                  disabled={!sendCodeEnabled || !!activeSesion || !creditCard}
                >
                  Start Charge
                </button>
              </div>
            )}
            {activeSesion && (
              <div>
                <button
                  className="text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[350px] py-[10px] rounded text-lg font-semibold mt-5 disabled:bg-nxu-charging-disabled"
                  onClick={onChargingStatus}
                  disabled={!activeSesion}
                >
                  Charge Status
                </button>
                <label className="text-nxu-charging-white text-[14px]">
                  Active Charge Session in-progress, click above to view status
                </label>
              </div>
            )}
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
