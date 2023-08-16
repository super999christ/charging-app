import jwt from "jwt-decode";

interface IJWT {
  appCode: string;
  appName: string;
  exp: number;
  iat: number;
  userId: string;
}

export const validateToken = () => {
  const appToken = localStorage.getItem("appToken");
  if (!appToken) return false;
  const { exp } = jwt<IJWT>(appToken);
  console.log(exp * 1000, Date.now());
  if (exp * 1000 < Date.now()) {
    return false;
  }
  return true;
};
