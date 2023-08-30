import { validateToken } from "../../../validations";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthDashboard: FC = () => {
  const navigate = useNavigate();
  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <button
        className="text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[328px] py-[10px] rounded text-lg font-semibold mt-5"
        onClick={() => navigate("/charging-history")}
      >
        History
      </button>
      <button
        className="text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[328px] py-[10px] rounded text-lg font-semibold mt-5"
        onClick={() => navigate("/profile")}
      >
        Profile
      </button>
      <button
        className="text-white bg-nxu-charging-grey border border-white hover:bg-nxu-charging-darkwhite w-full max-w-[328px] py-[10px] rounded text-lg font-semibold mt-5"
        onClick={() => {
          localStorage.removeItem("appToken");
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default AuthDashboard;
