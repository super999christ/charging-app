import { manageCharge } from "@root/helpers";
import { validateToken } from "../../../validations";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const PreCharge: FC = () => {
  const buttonClassName =
    "text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[328px] py-[10px] rounded text-lg font-semibold";
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const stationId = searchParams.get("stationId") || "";
  const eventId = searchParams.get("eventId") || "";
  const navigate = useNavigate();
  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  const orderCharge = async () => {
    try {
      const { data } = manageCharge(Number(eventId), "start");
      navigate(
        `/charging-status?phoneNumber=${phoneNumber}&stationId=${stationId}&eventId=${eventId}`
      );
    } catch (err) {}
  };

  return (
    <div className="h-[calc(100vh_-_75px)] w-full px-[50px] flex flex-col justify-center items-center gap-[35px]">
      <button className={buttonClassName} onClick={() => orderCharge()}>
        Start Charge
      </button>
    </div>
  );
};

export default PreCharge;
