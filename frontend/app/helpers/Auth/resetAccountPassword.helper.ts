import Environment from "@root/configs/env";
import axios from "axios";

export const resetAccountPassword = async (email: string, password: string) => {
  const url = `${
    Environment.VITE_SERVICE_USER_MANAGEMENT_URL
  }/reset-password`;
  const body = {
    email,
    password,
  };
  return await axios.post(url, body);
};
