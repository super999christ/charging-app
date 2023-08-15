import Environment from "@root/configs/env";
import axios from "axios";

export const updateUserPassword = async (userId: string, password: string) => {
  const { data } = await axios.put(
    `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/profile/password`,
    {
      userId,
      password,
    }
  );
  return data;
};
