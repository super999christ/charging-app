import Environment from "@root/configs/env";
import axios from "axios";

export const startCharge = async (stationId: string) => {
  const url = `${Environment.VITE_SERVICE_CHARGING_EVENT_URL}/start-charge`;
  const body = {
    stationId,
  };

  return await axios.post(url, body);
};
