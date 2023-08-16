import Environment from "@root/configs/env";
import axios from "axios";

export const sendAuthCode = async (phoneNumber: string) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/send-login-authcode`;
  const body = {
    phoneNumber,
  };

  return await axios.post(url, body);
};
