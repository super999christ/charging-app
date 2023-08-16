import Environment from "@root/configs/env";
import axios from "axios";

export const getRegistrationInfo = async (rId: string) => {
  const url = `${
    Environment.VITE_SERVICE_USER_MANAGEMENT_URL
  }/register?rId=${rId}`;
  const { data } = await axios.get(url);
  return data;
};
