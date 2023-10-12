import { useEffect } from "react";
import { validateToken } from "@root/validations";
import { useNavigate } from "react-router";

export default function useAuth() {
  const navigate = useNavigate();

  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  return {};
}
