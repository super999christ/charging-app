import { getHistory } from "../../../helpers";
import { validateToken } from "../../../validations";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as BackIcon } from "../../../assets/backOutline.svg";

interface IHistory {
  id: string;
  stationId: number;
  date: string;
  amount: number;
  cost: number;
  createdDate: Date;
}

const AuthDashboard: FC = () => {
  const navigate = useNavigate();
  const isTokenValid = validateToken();

  const [history, setHistory] = useState<IHistory[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getChargingHistory = async () => {
      try {
        const datas = await getHistory();
        setHistory([
          ...datas.map(
            (data: {
              id: string;
              stationId: number;
              createdDate: Date;
              chargeDeliveredKwh: number;
              totalCostDollars: number;
            }) => {
              const {
                id,
                stationId,
                chargeDeliveredKwh,
                createdDate,
                totalCostDollars,
              } = data;
              const date = new Date(createdDate);
              return {
                id,
                stationId,
                date: `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`,
                amount: chargeDeliveredKwh || 0,
                cost: totalCostDollars || 0,
                createdDate,
              };
            }
          ),
        ]);
      } catch (err) {}
    };

    if (!isTokenValid) navigate("/");
    getChargingHistory();
  }, [isTokenValid]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Charging History
        </div>
        <div className="flex flex-col w-full mb-5">
          {errorMsg && (
            <label className="text-nxu-charging-red text-[12px]">
              {errorMsg}
            </label>
          )}
          {history
            .sort((historyA, historyB) =>
              historyA.createdDate < historyB.createdDate ? 1 : -1
            )
            .map((historyData, index) => (
              <div
                className="w-full border-b-2 border-b-black py-2 flex flex-col text-white"
                key={index}
              >
                <div className="flex flex-row w-full">
                  <div className="w-[40%]">Event: </div>
                  <div>{historyData.id}</div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="w-[40%]">Station Id: </div>
                  <div>{historyData.stationId}</div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="w-[40%]">Date: </div>
                  <div>{historyData.date}</div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="w-[40%]">Cost: </div>
                  <div>{`$${historyData.cost}`}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className="w-full md:max-w-[350px] md:mt-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={() => navigate(-1)}
      >
        <BackIcon />
        <span>Back</span>{" "}
      </div>
    </div>
  );
};

export default AuthDashboard;
