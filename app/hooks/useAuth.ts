import { validateToken } from "@root/validations";

export default function useAuth() {
  const isTokenValid = validateToken();

  if (!isTokenValid) {
    window.location.href = "/";
  }

  return {};
}
