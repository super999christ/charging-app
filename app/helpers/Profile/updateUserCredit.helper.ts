import Environment from "@root/configs/env";
import axios from "axios";

export type CreditCard = {
  last4: string;
  expMonth: number;
  expYear: number;
  postalCode: string;
};

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
    `${Environment.VITE_SERVICE_PAYMENT_URL}/get-cc`,
    {
      "axios-retry": {
        retries: 10,
        retryDelay: (retryCount) => {
          return retryCount * 2000;
        },
      },
    }
  );
  return data;
};
