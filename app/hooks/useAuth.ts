import { decodeToken, isTokenExpired, validateToken } from "@root/validations";

export default function useAuth() {
  if (isTokenExpired()) {
    localStorage.removeItem('appToken');
    window.location.href = "/auth-sign-in?token_expired=1";
    return null;
  }

  const isTokenValid = validateToken();

  if (!isTokenValid) {
    localStorage.removeItem('appToken');
    window.location.href = "/";
    return null;
  }

  const token = decodeToken(localStorage.getItem("appToken")!);

  return token;
}
