import Environment from "@root/configs/env";
import axios from "axios";

type Profile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  billingPlanId: number;
  billingPlan: BillingPlan;
  vehicleCount: number;
};

export type BillingPlan = {
  id: number;
  billingPlan: string;
  active: boolean;
};

export async function getUserProfile(): Promise<Profile> {
  return axios
    .get(`${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/profile`)
    .then((res) => res.data);
}

export async function getBillingPlans(): Promise<BillingPlan[]> {
  return axios
    .get(`${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/billing-plans`)
    .then((res) => res.data);
}

export async function updateUserProfile(user: Profile): Promise<void> {
  return axios.put(
    `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/profile`,
    user
  );
}

export async function setupSubscriptionPlan(): Promise<void> {
  return axios.post(
    `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/subscriptions`
  );
}
