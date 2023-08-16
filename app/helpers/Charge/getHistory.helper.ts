import Environment from "@root/configs/env";
import axios from "axios";

export const getHistory = async () => {
  const url = `${Environment.VITE_SERVICE_CHARGING_EVENT_URL}/transactions`;

  const { data } = await axios.get(url);
  return data;
};
