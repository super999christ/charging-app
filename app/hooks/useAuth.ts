import { decodeToken, validateToken } from "@root/validations";

export default function useAuth() {
  const isTokenValid = validateToken();

  if (!isTokenValid) {
    window.location.href = "/";
    return null;
  }

  const token = decodeToken(localStorage.getItem("appToken")!);

  return token;
}
