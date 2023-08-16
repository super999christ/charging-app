import { FC } from "react";
import { ReactComponent as BatteryIcon } from "../../../assets/battery.svg";
import Chart from "./Chart";

interface IChargeStatusComponent {
  amount: number;
  timeSpent: string;
  status: string;
}

const ChargeStatusComponent: FC<IChargeStatusComponent> = ({
  amount,
  timeSpent,
  status,
}) => {
  const lightText = "p-0 m-0 text-[10px] font-medium";
  const boldText = "p-0 m-0 text-2xl font-extrabold";

  const getStatus = () => {
    if (status === 'start' || status === 'resume')
      return 'running';
    if (status === 'pause')
      return 'paused';
    if (status === 'stop')
      return 'stopped';
    return 'not started';
  };

  return (
    <div className="w-full h-full min-h-[160px] px-5 border-b border-b-black flex flex-row items-center justify-between text-white">
      <div className="flex gap-2 justify-center items-center w-fit">
        <div className="w-10 h-10">
          <BatteryIcon />
        </div>
        <div className="flex flex-col justify-between">
          <p className={lightText}>CHARGE</p>
          <p className={boldText}>Status</p>
          <p className={lightText}>{getStatus()}</p>
        </div>
      </div>
      <div className="flex justify-center w-1/2">
        <Chart value={amount} timeSpent={timeSpent} />
      </div>
    </div>
  );
};

export default ChargeStatusComponent;
