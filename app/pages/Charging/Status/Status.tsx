import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EnergyComponent from "./EnergyComponent";
import ChargeSpeedComponent from "./ChargeSpeedComponent";
import CostComponent from "./CostComponent";
import ChargeStatusComponent from "./ChargeStatusComponent";
import { validateToken } from "../../../validations";
import { checkChargingStatus, checkEventAvailability, manageCharge } from "../../../helpers";
import { AxiosError } from "axios";
import Environment from "@root/configs/env";

type SessionStatus = "available" | "stopped" | "trickle" | "charging" | "idle" | "offline" | "completed";

interface IChargeStatus {
  chargeComplete: number;
  chargeDeliveredKwh: number;
  chargeSpeedKwh: number;
  chargeStatusPercentage: number;
  chargeVehicleRequestedKwh: number;
  rateActivekWh: number;
  error: string;
  eventId: string;
  status: number;
  sessionStatus?: SessionStatus;
  sessionTotalDuration: number;
  sessionTotalCost: string;
}

type AlertType = 'success' | 'info' | 'error';

const Status: FC = () => {
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const stationId = searchParams.get("stationId") || "";
  const eventId = searchParams.get("eventId") || "";
  const navigate = useNavigate();
  const [status, setStatus] = useState<IChargeStatus>({
    chargeComplete: 0,
    chargeDeliveredKwh: 0,
    chargeSpeedKwh: 0,
    chargeStatusPercentage: 0,
    chargeVehicleRequestedKwh: 0,
    rateActivekWh: 0,
    error: "",
    eventId: "",
    status: 0,
    sessionTotalDuration: 0,
    sessionTotalCost: "",
  });
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<AlertType>('error');
  const [isChargingStatusChanging, setChargingStatusChanging] = useState(false);
  const [isTimerRunning, setTimerRunning] = useState(true);
  
  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  useEffect(() => {
    const timer = setInterval(checkStatus, Environment.VITE_CHARGE_STATUS_INTERVAL || 10000);
    checkStatus();
    return () => clearInterval(timer);
  }, []);

  const checkStatus = async () => {
    try {
      if (!isTimerRunning)
        return;
      const data: IChargeStatus = await checkChargingStatus(
        Number(eventId),
        phoneNumber,
        Number(stationId)
      );
      setStatus(data);
      if (!data.status && data.error) {
        setAlertMsg(data.error);
        setAlertType('error');
      }
      if (data.sessionStatus === 'completed') {
        setTimerRunning(false);
        if (data.sessionTotalCost)
          setAlertMsg("Successfully completed charging. Transaction will be charged to the credit card on file.");
        else
          setAlertMsg("Successfully completed charging. No payment was made to the credit card");
        setAlertType('success');
      } else {
        if (data.sessionStatus === 'idle') {
          if (data.sessionTotalCost)
            setAlertMsg("Successfully completed charging. Transaction will be charged to the credit card on file. Please remove the Car connector from the charger.");
          else
            setAlertMsg("Successfully completed charging. No payment was made to the credit card. Please remove the Car connector from the charger.");
          setAlertType('success');
          setTimerRunning(false);
        } else if (data.sessionStatus === 'offline') {
          if (data.sessionTotalCost)
            setAlertMsg("Error completing charging. Partial charging transaction will be charged to credit card on file. Please remove Car connector from the charger and retry charging later.");
          else
            setAlertMsg("Error completing charging. No payment was made to the credit card. Please remove Car connector from the charger and retry charging later.");
          setAlertType('error');
          setTimerRunning(false);
        } else if (data.sessionStatus === 'stopped') {
          if (data.sessionTotalCost)
            setAlertMsg("Successfully stopped charging. Transaction will be charged to the credit card on file. Please remove Car connector from the charger and retry charging later.");
          else
            setAlertMsg("Successfully stopped charging. No payment was made to the credit card. Please remove Car connector from the charger and retry charging later.");
          setAlertType('success');
          setTimerRunning(false);
        }
      }
      if (data.error) {
        setAlertMsg(data.error);
        setAlertType('error');
      }
    } catch (err) {
      console.error("@Error: ", err);
      if (err instanceof AxiosError) {
        setAlertMsg(err.response?.data.message);
        setAlertType('error');
      }
    }
  };

  const stopCharging = async () => {
    if (isChargingStatusChanging) {
      setAlertMsg(
        "Processing the request now... Please try it again after sometime."
      );
      setAlertType('info');
      return;
    }
    setAlertMsg("");
    setChargingStatusChanging(true);
    try {
      const { data } = await manageCharge(Number(eventId), 'stop');
      checkStatus();
      setChargingStatusChanging(false);
      if (data.status === 1) {
        setStatus({
          ...status,
          sessionStatus: "stopped",
        });
        if (data.error) {
          setAlertMsg(data.error);
          setAlertType('error');
        }
      } else {
        setAlertMsg(data.error);
        setAlertType('error');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setAlertMsg(error.response?.data.message || "");
        setAlertType('error');
      }
      setChargingStatusChanging(false);
    }
  };

  const formatTime = (time?: number) => {
    time = time || 0;
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = (Math.floor(time / 60) % 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getAlertClass = () => {
    let className = "text-[14px] ";
    const colors = {
      'error': 'red',
      'info': 'white',
      'success': 'green'
    };
    className += `text-nxu-charging-${colors[alertType]}`;
    return className;
  };

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center overflow-y-scroll">
      {!eventId && (
        <div className="max-w-[350px]  w-full flex flex-col justify-center">
          <div className="text-nxu-charging-white text-[12px]">No Active Sessions</div>
        </div>  
      )}
      <div className="max-w-[350px]  w-full flex flex-col justify-center">
        <div className="py-[35px] px-4 w-full flex flex-col gap-2 text-center text-white font-extrabold text-2xl border-b border-b-nxu-charging-black">
          <div className="flex items-center justify-between">
            <span>Station:</span>
            <span>{stationId}</span>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <ChargeStatusComponent
            amount={
              status?.chargeStatusPercentage &&
              status.chargeStatusPercentage >= 0
                ? status?.chargeStatusPercentage
                : -1
            }
            timeSpent={formatTime(status?.sessionTotalDuration)}
            status={status?.sessionStatus || ''}
          />
          <ChargeSpeedComponent
            amount={`${status?.chargeSpeedKwh || "0.00"}`}
          />
          <CostComponent
            amount={`${status?.sessionTotalCost || "0.00"}`}
            rate={`${status?.rateActivekWh || "0.00"}`}
          />
          {alertMsg && (
            <label className={getAlertClass()}>
              {alertMsg}
              <span className="text-nxu-charging-green"></span>
            </label>
          )}
        </div>
      </div>
      {!["completed", "stopped", "idle", "offline"].includes(status?.sessionStatus as string) && (
        <div
          className="w-full md:max-w-[350px] md:mt-[60px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
          onClick={() => stopCharging()}
        >
          <span>Stop Charge</span>
        </div>
      )}
    </div>
  );
};

export default Status;
