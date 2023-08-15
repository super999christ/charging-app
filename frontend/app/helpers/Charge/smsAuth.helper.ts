import Environment from "@root/configs/env";
import { setRequestHeader } from "../../utils";
import axios from "axios";

export const checkSMSAuth = async (
  phoneNumber: string,
  authCode: string,
  notificationId: number,
  chargingEventId: number
) => {
  try {
    const url = `${
      Environment.VITE_SERVICE_CHARGING_EVENT_URL
    }/auth-charge-sms`;
    const body = {
      phoneNumber,
      authCode,
      notificationId,
      chargingEventId,
    };

    const { data } = await axios.post(url, body);
    const { token } = data;
    localStorage.setItem("appToken", token);
    setRequestHeader(token);
    return true;
  } catch (err) {
    throw err;
  }
};
