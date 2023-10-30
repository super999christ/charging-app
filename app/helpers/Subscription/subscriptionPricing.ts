import Environment from "@root/configs/env";
import axios, { AxiosError } from "axios";

export type SubscriptionPricing = {
  subscriptionFee: number;
  active?: boolean;
  billingPlanId?: number;
  startDate?: Date;
  endDate?: Date;
  newSubscriptionCustomer: boolean;
  needsPricingUpdate: boolean;
};

export const getActiveSubscriptionPricing = (): Promise<SubscriptionPricing> => {
  const url = `${
    Environment.VITE_SERVICE_USER_MANAGEMENT_URL
  }/active-subscription-pricing`;
  return axios.get(url)
    .then(res => res.data)
    .catch((err: AxiosError) => {
      return { subscriptionFee: 0 };
    });
}