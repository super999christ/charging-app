import Environment from "@root/configs/env";
import { validateToken } from "@root/validations";
import axios, { AxiosError } from "axios";

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
    },
    {
      "axios-retry": {
        retries: 10,
        retryCondition: (err) => err.response!.status !== 204,
        retryDelay: (retryCount) => retryCount * 2000,
      },
    }
  );
  return data;
};

export const getCreditCard = async (): Promise<CreditCard> => {
  if (!validateToken()) {
    window.location.href = '/';
  }
  return axios
    .get(`${Environment.VITE_SERVICE_PAYMENT_URL}/get-cc`)
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      if (err.response?.status !== 200) return null;
      throw err;
    });
};

export const isCreditCardExpired = (cc: CreditCard) => {
  if (!cc)
    return false;
  if (new Date() >= new Date(cc.expYear, cc.expMonth)) {
    return true;
  }
  return false;
};

export const createStripeCustomer = async (): Promise<void> => {
  return axios.post(
    `${Environment.VITE_SERVICE_PAYMENT_URL}/customer`,
    {},
    {
      "axios-retry": {
        retries: 10,
        retryCondition: (err) => err.response!.status !== 204,
        retryDelay: (retryCount) => retryCount * 2000,
      },
    }
  );
};
