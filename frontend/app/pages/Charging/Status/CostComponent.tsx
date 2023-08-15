import { FC } from "react";
import { ReactComponent as MomentizationIcon } from "../../../assets/momentization.svg";

interface ICostComponent {
  amount: string;
  rate: string;
}

const CostComponent: FC<ICostComponent> = ({ amount, rate }) => {
  const lightText = "p-0 m-0 text-[10px] font-medium";
  const boldText = "p-0 m-0 text-2xl font-extrabold";
  return (
    <div className="w-full h-full min-h-[160px] px-5 border-b border-b-black flex flex-row items-center justify-between text-white">
      <div className="flex gap-2 justify-center items-center w-fit">
        <div className="w-10 h-10">
          <MomentizationIcon />
        </div>
        <div className="flex flex-col justify-between">
          <p className={lightText}>TOTAL</p>
          <p className={boldText}>Cost</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2">
        <p className={boldText}>${amount}</p>
        <p className={lightText}>${rate} / kWh</p>
      </div>
    </div>
  );
};

export default CostComponent;
