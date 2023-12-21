import axios from "axios";

import Environment from "@root/configs/env";

export const registerUserWithPIN = async (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  pinCode: string,
  accountCode: string,
  isPartnerAccount: boolean
) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/register-confirm-with-pin`;
  const body = {
    email,
    firstName,
    lastName,
    phoneNumber,
    pinCode,
    accountCode,
    isPartnerAccount
  };
  return await axios.post(url, body);
};
