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
  eventStatus?: "start" | "pause" | "resume" | "stop";
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
    checkEventAvailability(Number(eventId))
      .then(res => {
        if (res.status) {
          checkStatus();
        } else {
          navigate("/");
        }
      })
  }, []);

  useEffect(() => {
    const timer = setInterval(checkStatus, Environment.VITE_CHARGE_STATUS_INTERVAL || 30000);
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
      if (data.chargeComplete) {
        setTimerRunning(false);
        setAlertMsg("Successfully completed charging. Transaction will be charged to the credit card on file.");
        setAlertType('success');
        setStatus({
          ...data,
          eventStatus: 'stop'
        })
      }
      if (data.error) {
        setAlertMsg(data.error);
        setAlertType('error');
      }
    } catch (err) {
      console.error("@error: ", err);
      if (err instanceof AxiosError) {
        setAlertMsg(err.response?.data.message);
        setAlertType('error');
      }
    }
  };

  const updateStatus = async (
    action: "start" | "pause" | "resume" | "stop"
  ) => {
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
      const { data } = await manageCharge(Number(eventId), action);
      checkStatus();
      setChargingStatusChanging(false);
      if (data.status === 1) {
        setStatus({
          ...status,
          eventStatus: action,
        });
        if (action === 'stop') {
          setAlertMsg('Successfully stopped charging. Transaction will be charged to the credit card on file.');
          setAlertType('success');
        } else if (action === 'pause' || action === 'resume') {
          setAlertMsg('Successful charging ' + action);
          setAlertType('success');
        }
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
      <div className="max-w-[350px]  w-full flex flex-col justify-center">
        <label className="text-white mt-[5px] px-4 text-[14px]">
          Navigating out of this page will end your charging session and will not be able to get back to this page and charge state.
        </label>
        <div className="py-[35px] px-4 w-full flex flex-col gap-2 text-center text-white font-extrabold text-2xl border-b border-b-nxu-charging-black">
          <div className="flex items-center justify-between">
            <span>Station:</span>
            <span>{stationId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Phone:</span>
            <span>{phoneNumber}</span>
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
            status={status?.eventStatus || ''}
          />
          <EnergyComponent
            amount={String(status?.chargeDeliveredKwh || "0.00")}
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
      {status?.eventStatus !== "stop" && (
        <div
          className="w-full md:max-w-[350px] md:mt-[60px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
          onClick={() => updateStatus(!status?.eventStatus ? "start" : "stop")}
        >
          <span>{`${!status?.eventStatus ? "Start" : "Stop"} Charge`}</span>
        </div>
      )}
      {(status?.eventStatus === "start" ||
        status?.eventStatus === "pause" ||
        status?.eventStatus === "resume") && (
        <div
          className="w-full md:max-w-[350px] md:mt-[35px] md:mb-[35px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
          onClick={() =>
            updateStatus(status.eventStatus !== "pause" ? "pause" : "resume")
          }
        >
          <span>{`${
            status.eventStatus !== "pause" ? "Pause" : "Resume"
          } Charge`}</span>
        </div>
      )}
    </div>
  );
};

export default Status;
