import Environment from "@root/configs/env";
import axios, { AxiosError } from "axios";

export const startCharge = async (stationId: string) => {
  const url = `${Environment.VITE_SERVICE_CHARGING_EVENT_URL}/start-charge`;
  const body = {
    stationId,
  };

  const { data } = await axios.post(url, body);
  return data;
};

export const findActiveSession = async () => {
  const url = `${Environment.VITE_SERVICE_CHARGING_EVENT_URL}/active-session`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      if (err.response?.status !== 200) return null;
      throw err;
    });
};
