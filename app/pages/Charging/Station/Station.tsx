import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import {
  findActiveSession,
  getCreditCard,
  getSubscriptionBillingPlanUser,
  startCharge,
} from "../../../helpers";
import {
  IChargingStationValidation,
  IAuthCodeValidation,
} from "../../../types/ValidationErrors.type";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";
import useCachedForm from "@root/hooks/useCachedForm";
import Button from "@root/components/Button";
import useAuth from "@root/hooks/useAuth";
import { classNames } from "@root/utils/style";

type IChargingStationError = IAuthCodeValidation &
  IChargingStationValidation & { page: string };

type AlertType = "success" | "info" | "error" | "none";

interface IStartStatus {
  statusMessage: string;
  statusType: AlertType;
};

const Login: FC = () => {
  const [{ stationId }, handleChange] = useCachedForm("stationForm", {
    stationId: "001",
  });
  const [errors, setErrors] = useState<Partial<IChargingStationError>>();
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("error");
  const [smsNotificationEnabled, setSmsNotificationEnabled] = useState(function() {
    const data = localStorage.getItem("smsNotificationEnabled");
    return data === 'true';
  }());

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

      // Clears the error message
      setAlertMsg('');

      setLoading(true);

      const data: IStartStatus = await startCharge(stationId);
      if (data.statusMessage && data.statusType !== 'none') {
        setAlertMsg(data.statusMessage);
        setAlertType(data.statusType);
      }
      if (data.statusType !== 'error') {
        localStorage.setItem("smsNotificationEnabled", String(smsNotificationEnabled));
        window.location.href = '/charging-status';
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("@Error: ", err);
      if (err instanceof AxiosError) {
        setAlertMsg(err.response?.data.message);
        setAlertType("error");
      }
    }
  };

  const onChargingStatus = () => {
    if (!activeSession) return;
    window.location.href = '/charging-status';
  };

  const getAlertClass = () => {
    let className = "text-[14px] ";
    const colors = {
      error: "red",
      info: "white",
      success: "green",
      none: "blue",
    };
    className += `text-nxu-charging-${colors[alertType]}`;
    return className;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-[350px] w-full flex flex-col justify-center gap-[30px]">
        <div className="flex flex-col w-full gap-5 mb-5">
          {alertMsg && (
            <label className={getAlertClass()}>
              {alertMsg}
              <span className="text-nxu-charging-green"></span>
            </label>
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
              <label className="text-white mt-4">Charging SMS Notification</label>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white h-11 px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {smsNotificationEnabled ? "Yes" : "No"}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <div
                          className={classNames(
                            !smsNotificationEnabled ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300'
                          )}
                          data-te-toggle="tooltip"
                          data-te-placement="top"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="No SMS notifications configured"
                          onClick={() => setSmsNotificationEnabled(false)}
                        >
                          No
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={classNames(
                            smsNotificationEnabled ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300'
                          )}
                          data-te-toggle="tooltip"
                          data-te-placement="top"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="Charging Notifications will be sent via SMS to the Login Phone. If needed Customer can sign out of the App after Charge Status page is loaded."
                          onClick={() => setSmsNotificationEnabled(true)}
                        >
                          Yes
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
