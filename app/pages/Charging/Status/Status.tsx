import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkChargingStatus, findActiveSession } from "../../../helpers";
import { AxiosError } from "axios";
import Environment from "@root/configs/env";
import Button from "@root/components/Button";
import { ReactComponent as BatteryIcon } from "../../../assets/battery.svg";
import { ReactComponent as MomentizationIcon } from "../../../assets/momentization.svg";
import { ReactComponent as BoltIcon } from "../../../assets/bolt.svg";
import Chart from "./Chart";
import useAuth from "@root/hooks/useAuth";
import useSWR from "swr";

type SessionStatus =
  | "available"
  | "stopped"
  | "stopped_sub"
  | "trickle"
  | "charging"
  | "idle"
  | "beginning"
  | "offline"
  | "completed"
  | "completed_sub"
  | "iot_error"
  | "in_progress"
  | "payment_error";

type AlertType = "success" | "info" | "error" | "none";

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
  promoted?: boolean;
  billingPlanId?: number;
  statusType: AlertType;
  statusMessage: string;
}

const lightText = "p-0 m-0 text-[10px] font-medium";
const boldText = "p-0 m-0 text-2xl font-extrabold";

const Status: FC = () => {
  const [isInitialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const { data: activeSession } = useSWR("activeSession", findActiveSession, {
    suspense: true,
  });
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
    sessionStatus: "beginning",
    statusType: 'info',
    statusMessage: ''
  });
  const iotExceptionCount = useRef(0);
  const isChargeStatusRunning = useRef(false);
  const stopLock = useRef(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("error");
  const [isChargingStopping, setChargingStopping] = useState(false);
  const [isTimerRunning, setTimerRunning] = useState(true);

  useAuth();

  useEffect(() => {
    const timer = setInterval(
      checkStatus,
      Environment.VITE_CHARGE_STATUS_INTERVAL || 3000
    );
    checkStatus();
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const checkStatus = async (isStopped: boolean = false) => {
    try {
      if (!activeSession)
        return;
      if (!isStopped) {
        if (
          !isTimerRunning ||
          isChargeStatusRunning.current ||
          stopLock.current
        )
          return;
      }

      isChargeStatusRunning.current = true;
      const data: IChargeStatus = await checkChargingStatus(
        Number(activeSession.id),
        isStopped
      );
      if (data.statusMessage && data.statusType !== 'none') {
        setAlertMsg(data.statusMessage);
        setAlertType(data.statusType);
      }
      isChargeStatusRunning.current = false;
      setStatus(data);
    } catch (err) {
      console.error("@Error: ", err);
      isChargeStatusRunning.current = false;
      if (err instanceof AxiosError) {
        const errorMsg = err.response?.data.message;
        if (errorMsg === "ChargingIoT exception occurred") {
          setAlertType("info");
        } else {
          setAlertMsg(errorMsg);
          setAlertType("error");
        }
      }
    } finally {
      setInitialized(true);
    }
  };

  const startNewCharging = async () => {
    navigate("/charging-login");
  };

  const stopCharging = async () => {
    setChargingStopping(true);
    try {
      stopLock.current = true;
      await checkStatus(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setAlertMsg(error.response?.data.message || "");
        setAlertType("error");
      }
    } finally {
      stopLock.current = false;
      setChargingStopping(false);
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
      error: "red",
      info: "white",
      success: "green",
      none: "blue",
    };
    className += `text-nxu-charging-${colors[alertType]}`;
    return className;
  };

  const getStatus = () => {
    const s: string = status.sessionStatus || "";
    if (s === "charging") return "running";
    if (s === "completed" || s === "completed_sub") return "completed";
    return "stopped";
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {!activeSession && (
        <div className="max-w-[350px] w-full flex flex-col justify-center">
          <div className="text-nxu-charging-white text-center text-[16px]">
            No Active Sessions
          </div>
        </div>
      )}
      {activeSession && (
        <>
          {!isInitialized && (
            <div className="max-w-[350px] w-full flex flex-col justify-center">
              <div className="text-nxu-charging-white text-center text-[16px]">
                Charging started, data loading...
              </div>
            </div>
          )}
          {isInitialized && (
            <>
              <div className="mb-10" />

              <div className="max-w-[350px] w-full flex flex-col justify-center divide-y-2 divide-black">
                <Row
                  left={<p className="font-extrabold text-2xl">Station</p>}
                  right={<p className="font-extrabold text-2xl">{activeSession.stationId}</p>}
                  className="min-h-min"
                />

                <Row
                  icon={<BatteryIcon />}
                  left={
                    <div className="flex flex-col justify-between">
                      <p className={lightText}>CHARGE</p>
                      <p className={boldText}>Status</p>
                      <p className={lightText}>{getStatus()}</p>
                    </div>
                  }
                  right={
                    <Chart
                      value={
                        status?.chargeStatusPercentage &&
                        status.chargeStatusPercentage >= 0
                          ? status?.chargeStatusPercentage
                          : -1
                      }
                      timeSpent={formatTime(status?.sessionTotalDuration)}
                    />
                  }
                />

                <Row
                  icon={<BoltIcon />}
                  left={
                    <div className="flex flex-col justify-between">
                      <p className={lightText}>CHARGE</p>
                      <p className={boldText}>Speed</p>
                    </div>
                  }
                  right={
                    <p className={boldText}>
                      {([
                        "completed",
                        "completed_sub",
                        "stopped",
                        "stopped_sub",
                        "idle",
                      ].includes(status?.sessionStatus as string)
                        ? "0.00"
                        : status?.chargeSpeedKwh) || "0.00"}
                      kW
                    </p>
                  }
                />

                <Row
                  icon={<MomentizationIcon />}
                  left={
                    <div className="flex flex-col justify-between">
                      <p className={lightText}>TOTAL</p>
                      <p className={boldText}>Cost</p>
                    </div>
                  }
                  right={
                    <>
                      <p className={boldText}>
                        {USDollar.format(Number(status?.sessionTotalCost) || 0)}
                      </p>
                      <p className={lightText}>
                        {USDollar.format(Number(status?.rateActivekWh) || 0)} /
                        kWh
                      </p>
                    </>
                  }
                />
                {alertMsg && (
                  <label className={getAlertClass()}>
                    {alertMsg}
                    <span className="text-nxu-charging-green"></span>
                  </label>
                )}
              </div>

              <div className="mb-3" />

              {![
                "completed",
                "completed_sub",
                "stopped",
                "stopped_sub",
                "idle",
                "offline",
                "iot_error",
                "payment_error",
              ].includes(status?.sessionStatus as string) &&
                iotExceptionCount.current === 0 && (
                  <Button
                    onClick={stopCharging}
                    loading={isChargingStopping}
                    className="mb-10"
                  >
                    {isChargingStopping
                      ? "Stopping Charge..."
                      : "Stop Charge"}
                  </Button>
                )}
              {[
                "completed",
                "completed_sub",
                "stopped",
                "stopped_sub",
                "idle",
                "offline",
                "iot_error",
                "payment_error",
              ].includes(status?.sessionStatus as string) && (
                <Button onClick={startNewCharging} className="mb-10">
                  Start New Charge
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Status;

type RowProps = {
  icon?: React.ReactNode;
  left: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

function Row({ icon, left, right, className }: RowProps) {
  return (
    <div
      className={`w-full h-full min-h-[120px] px-5 flex flex-row items-center justify-between text-white ${className}`}
    >
      <div className="flex gap-2 justify-center items-center w-fit">
        <div className="w-10 h-10">{icon}</div>

        {left}
      </div>

      <div className="flex flex-col items-center justify-center w-1/2">
        {right}
      </div>
    </div>
  );
}
