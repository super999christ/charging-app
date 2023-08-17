import axios from "axios";

import { getExpirationDate } from "../../utils";
import Environment from "@root/configs/env";

export const registerUser = async (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  smsNotificationId: number,
  smsAuthCode: string,
  cardNumber: string,
  cardExpDate: string,
  cardCvv: string,
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
    smsNotificationId,
    smsAuthCode,
    cardNumber,
    expYear,
    expMonth,
    cvv: cardCvv,
  };
  return await axios.post(url, body);
};
