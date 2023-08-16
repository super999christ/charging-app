import Environment from "@root/configs/env";
import axios from "axios";

export const manageCharge = async (eventId: number, status: string) => {
  const url = `${
    Environment.VITE_SERVICE_CHARGING_EVENT_URL
  }/manage-charging`;
  const body = {
    eventId,
    eventType: status,
  };

  return await axios.post(url, body);
};
