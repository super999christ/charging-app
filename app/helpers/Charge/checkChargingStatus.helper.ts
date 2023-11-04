import Environment from "@root/configs/env";
import axios from "axios";

export const checkChargingStatus = async (
  eventId: number,
  iotException: boolean,
) => {
  const url = `${
    Environment.VITE_SERVICE_CHARGING_EVENT_URL
  }/charging-status`;
  const body = {
    eventId,
    iotException,
  };

  const { data } = await axios.post(url, body);
  return data;
};

export const checkEventAvailability = async (eventId: number) => {
  const url = `${
    Environment.VITE_SERVICE_CHARGING_EVENT_URL
  }/check-event-availability?eventId=${eventId}`;
  const { data } = await axios.get(url);
  return data;
}