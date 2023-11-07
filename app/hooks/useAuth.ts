import { decodeToken, isTokenExpired, validateToken } from "@root/validations";
import { useEffect } from "react";

export default function useAuth() {
  useEffect(() => {
    const timer = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem('appToken');
        window.location.href = "/auth-sign-in?token_expired=1";
        return;
      }
      if (!validateToken()) {
        localStorage.removeItem('appToken');
        window.location.href = "/";
        return;
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const isTokenValid = validateToken();

  if (!isTokenValid) {
    localStorage.removeItem('appToken');
    window.location.href = "/";
    return null;
  }

  const token = decodeToken(localStorage.getItem("appToken")!);

  return token;
}
