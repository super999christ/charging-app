import axios from "axios";

import { getExpirationDate } from "../../utils";
import Environment from "@root/configs/env";

export const setAccountPassword = async (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
  smsNotificationId: number,
  smsAuthCode: string,
  cardNumber: string,
  cardExpDate: string,
  cardCvv: string,
  rId: string
) => {
  const url = `${
    Environment.VITE_SERVICE_USER_MANAGEMENT_URL
  }/register-confirm`;
  const { expYear, expMonth } = getExpirationDate(cardExpDate);
  const body = {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    smsNotificationId,
    smsAuthCode,
    cardNumber,
    expYear,
    expMonth,
    cvv: cardCvv,
    rId
  };
  return await axios.post(url, body);
};
