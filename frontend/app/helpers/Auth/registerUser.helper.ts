import Environment from "@root/configs/env";
import axios from "axios";

export const registerUser = async (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
) => {
  const url = `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/register`;
  const body = {
    email,
    firstName,
    lastName,
    phoneNumber,
  };
  return await axios.post(url, body);
};
