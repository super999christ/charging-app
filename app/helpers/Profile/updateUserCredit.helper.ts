import Environment from "@root/configs/env";
import axios from "axios";

export const updateUserCreditCard = async (pmId: string) => {
  const { data } = await axios.put(
    `${Environment.VITE_SERVICE_PAYMENT_URL}/update-cc`,
    {
      pmId,
    }
  );
  return data;
};

export const getCreditCard = async () => {
  const { data } = await axios.get(
    `${Environment.VITE_SERVICE_PAYMENT_URL}/get-cc`
  );
  return data;
};
