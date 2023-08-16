import Environment from "@root/configs/env";
import axios from "axios";

export const updateUserProfile = async (
  userId: string,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string
) => {
  const { data } = await axios.put(
    `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/profile`,
    {
      userId,
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
    }
  );
  return data;
};
