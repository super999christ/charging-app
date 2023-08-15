import Environment from "@root/configs/env";
import axios from "axios";

export const getUserProfile = async () => {
  const { data } = await axios.get(
    `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/profile`
  );
  return data;
};
