import Button from "@root/components/Button";
import { validateToken } from "../../../validations";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthDashboard: FC = () => {
  const navigate = useNavigate();
  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  return (
    <div className="flex flex-col h-full justify-center items-center gap-4 pt-5">
      <Button onClick={() => navigate("/charging-history")}>History</Button>

      <Button onClick={() => navigate("/profile")}>Profile</Button>

      <Button
        onClick={() => {
          localStorage.removeItem("appToken");
          navigate("/");
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default AuthDashboard;
