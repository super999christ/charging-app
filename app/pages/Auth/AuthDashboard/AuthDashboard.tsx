import Button from "@root/components/Button";
import { decodeToken, validateToken } from "../../../validations";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "@root/hooks/useAuth";
import useSWR from "swr";
import { getCreditCard } from "@root/helpers";

const AuthDashboard: FC = () => {
  const navigate = useNavigate();
  useAuth();

  const { subscription_customer } = decodeToken(
    localStorage.getItem("appToken") || ""
  );

  const { data: creditCard } = useSWR("creditCard", getCreditCard, {
    suspense: true,
  });

  return (
    <div className="flex flex-col h-full justify-center items-center gap-4 pt-5">
      <Button onClick={() => navigate("/charging-history")}>History</Button>

      <Button onClick={() => navigate("/profile")}>Profile</Button>

      {subscription_customer && creditCard && (
        <Button onClick={() => navigate("/billing-plans")}>
          Billing Plans
        </Button>
      )}

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
