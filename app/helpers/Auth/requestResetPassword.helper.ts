import Environment from "@root/configs/env";
import axios from "axios";

export const requestResetPassword = async (email: string) => {
  const url = `${
    Environment.VITE_SERVICE_USER_MANAGEMENT_URL
  }/request-reset-password`;
  const body = {
    email,
  };
  return await axios.post(url, body);
};
