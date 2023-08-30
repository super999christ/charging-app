import axios from "axios";

import Environment from "@root/configs/env";

export const registerUser = async (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  smsNotificationId: number,
  smsAuthCode: string
) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/register-confirm`;
  const body = {
    email,
    firstName,
    lastName,
    phoneNumber,
    smsNotificationId,
    smsAuthCode,
  };
  return await axios.post(url, body);
};

export const registerUserWithPIN = async (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  pinCode: string
) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/register-confirm-with-pin`;
  const body = {
    email,
    firstName,
    lastName,
    phoneNumber,
    pinCode,
  };
  return await axios.post(url, body);
};
