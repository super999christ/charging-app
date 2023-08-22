import Environment from "@root/configs/env";
import axios from "axios";

export const sendLoginAuthCode = async (phoneNumber: string) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/send-login-authcode`;
  const body = {
    phoneNumber,
  };

  return await axios.post(url, body);
};

export const sendRegisterAuthCode = async (phoneNumber: string) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/send-register-authcode`;
  const body = {
    phoneNumber,
  };

  return await axios.post(url, body);
};
