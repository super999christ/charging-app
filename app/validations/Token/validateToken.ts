import jwt from "jwt-decode";

const MS_PER_MINUTE = 60000;

interface IJWT {
  subscription_customer: boolean;
  exp: number;
  iat: number;
  userId: string;
}

export function decodeToken(token: string) {
  return jwt<IJWT>(token);
}

export const validateToken = () => {
  const appToken = localStorage.getItem("appToken");
  if (!appToken) return false;
  const { exp } = decodeToken(appToken);

  return !isExpired(exp);
};

export const isTokenExpired = () => {
  const appToken = localStorage.getItem("appToken");
  if (!appToken) return false;
  const { exp } = decodeToken(appToken);
  return isExpired(exp);
};

const isExpired = (exp: number) => exp * 1000 < Date.now();

export const isExpiringIn5Minutes = (exp: number) =>
  exp * 1000 < new Date(Date.now() + MS_PER_MINUTE * 5).getTime();
