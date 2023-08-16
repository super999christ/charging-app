import { FC } from "react";
import { ReactComponent as PowerIcon } from "../../../assets/power.svg";

interface IEnergyComponent {
  amount: string;
}

const EnergyComponent: FC<IEnergyComponent> = ({ amount }) => {
  const lightText = "p-0 m-0 text-[10px] font-medium";
  const boldText = "p-0 m-0 text-2xl font-extrabold";
  return (
    <div className="w-full h-full min-h-[160px] px-5 border-b border-b-black flex flex-row items-center justify-between text-white">
      <div className="flex gap-2 justify-center items-center w-fit">
        <div className="w-10 h-10">
          <PowerIcon />
        </div>
        <div className="flex flex-col justify-between">
          <p className={lightText}>ENERGY</p>
          <p className={boldText}>Delivered</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2">
        <p className={boldText}>{amount}</p>
        <p className={lightText}>kWh</p>
      </div>
    </div>
  );
};

export default EnergyComponent;
