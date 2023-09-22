import Environment from "@root/configs/env";
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

    await axios.post(url, body);
    return true;
  } catch (err) {
    throw err;
  }
};
