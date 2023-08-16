import Environment from "@root/configs/env";
import axios from "axios";

export const deleteResetPasswordInfo = async (rId: string) => {
  const url = `${
    Environment.VITE_SERVICE_USER_MANAGEMENT_URL
  }/request-reset-password?rId=${rId}`;
  const { data } = await axios.delete(url);
  return data;
};
