import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  startCharge,
  findActiveSession,
  getCreditCard,
  getSubscriptionBillingPlanUser,
} from "../../../helpers";
import {
  IChargingLoginValidation,
  IAuthCodeValidation,
} from "../../../types/ValidationErrors.type";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";
import useCachedForm from "@root/hooks/useCachedForm";
import Button from "@root/components/Button";
import useAuth from "@root/hooks/useAuth";

type IChargingLoginError = IAuthCodeValidation &
  IChargingLoginValidation & { page: string };

const Login: FC = () => {
  const [{ stationId }, handleChange] = useCachedForm("stationForm", {
    stationId: "001",
  });
  const [errors, setErrors] = useState<Partial<IChargingLoginError>>();
  const [loading, setLoading] = useState(false);

  const { data: creditCard } = useSWR("creditCard", getCreditCard, {
    suspense: true,
    errorRetryCount: 5,
    errorRetryInterval: 2000,
  });

  const { data: activeSession } = useSWR("activeSession", findActiveSession, {
    suspense: true,
  });

  const { data: isSubscriptionBillingPlanUser } = useSWR("isSubscriptionBillingPlanUser", getSubscriptionBillingPlanUser, {
    suspense: true
  });

  const navigate = useNavigate();

  const token = useAuth();

  useEffect(() => {
    if (isSubscriptionBillingPlanUser) {
      navigate("/billing-plans");
    }
  }, []);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    // Validation
    try {
      if (!stationId) {
        setErrors({ stationId: "Please enter a Charger ID" });
        return;
      }

      setLoading(true);

      const { data: chargingEvent } = await startCharge(stationId);
      setErrors({ page: "" });
      navigate(
        `/charging-status?stationId=${stationId}&eventId=${chargingEvent.id}`
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof AxiosError)
        setErrors({ page: err.response?.data.message });
    }
  };

  const onChargingStatus = () => {
    if (!activeSession) return;
    const chargingEvent = activeSession as any;
    navigate(
      `/charging-status?stationId=${chargingEvent.stationId}&eventId=${chargingEvent.id}`
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-[350px] w-full flex flex-col justify-center gap-[30px]">
        <div className="flex flex-col w-full gap-5 mb-5">
          {!activeSession && creditCard && (
            <div className="text-nxu-charging-white text-[16px]">
              You must plug charger connector into car before pressing start.
            </div>
          )}
          {activeSession && (
            <div className="text-nxu-charging-white text-[16px]">
              Active Charge Session in-progress, click below to view status
            </div>
          )}
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

          {!activeSession && creditCard && (
            <div className="flex flex-col">
              <label className="text-white">Charger ID</label>
              <input
                name="stationId"
                type="text"
                inputMode="numeric"
                className={inputStyle}
                placeholder="001"
                value={stationId}
                disabled={!creditCard}
                maxLength={3}
                onChange={(e) => {
                  setErrors(undefined);
                  e.target.value = e.target.value.replace(/\D/, "");
                  handleChange(e);
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
            {!activeSession && creditCard && (
              <div className="flex flex-row gap-[10px]">
                <Button onClick={onSubmit} loading={loading}>
                  {loading ? "Starting Charge..." : "Start Charge"}
                </Button>
              </div>
            )}
            {activeSession && (
              <div>
                <Button onClick={onChargingStatus} disabled={!activeSession}>
                  Active Session
                </Button>
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
