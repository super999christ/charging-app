import axios from "axios";

import { setRequestHeader } from "../../utils";
import Environment from "@root/configs/env";

export const getAuthToken = async (phoneNumber: string, authCode: string, notificationId: number) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/login`;
  const body = {
    phoneNumber,
    authCode,
    notificationId,
  };
  const { data } = await axios.post(url, body);
  const { token } = data;
  setRequestHeader(token);
  localStorage.setItem("appToken", token);
  return true;
};

export const getAuthTokenWithPIN = async (phoneNumber: string, pinCode: string) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/login-with-pin`;
  const body = {
    phoneNumber,
    pinCode
  };
  const { data } = await axios.post(url, body);
  const { token } = data;
  setRequestHeader(token);
  localStorage.setItem("appToken", token);
  return data;
};