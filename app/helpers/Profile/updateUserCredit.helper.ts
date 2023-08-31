import Environment from "@root/configs/env";
import axios from "axios";

export type CreditCard = {
  last4: string;
  expMonth: number;
  expYear: number;
  postalCode: string;
};

const client = axios.create({ baseURL: Environment.VITE_SERVICE_PAYMENT_URL });

export const updateUserCreditCard = async (pmId: string) => {
  const { data } = await client.put("/update-cc", {
    pmId,
  });
  return data;
};

export const getCreditCard = async () => {
  const { data } = await client.get("/get-cc");
  return data;
};
