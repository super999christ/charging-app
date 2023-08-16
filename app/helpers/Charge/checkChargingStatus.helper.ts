import Environment from "@root/configs/env";
import { setRequestHeader } from "@root/utils/setRequestHeader";
import axios from "axios";

export const checkChargingStatus = async (
  eventId: number,
  phoneNumber: string,
  stationId: number
) => {
  const url = `${
    Environment.VITE_SERVICE_CHARGING_EVENT_URL
  }/charging-status`;
  const body = {
    eventId,
    phoneNumber,
    stationId,
  };

  const { data } = await axios.post(url, body);
  const token = data.token;
  if (token) {
    localStorage.setItem("appToken", token);
    setRequestHeader(token);
  }
  return data;
};

export const checkEventAvailability = async (eventId: number) => {
  const url = `${
    Environment.VITE_SERVICE_CHARGING_EVENT_URL
  }/check-event-availability?eventId=${eventId}`;
  const { data } = await axios.get(url);
  return data;
}