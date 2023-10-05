import React, { useState } from "react";
import Button from "@root/components/Button";
import {
  BillingPlan,
  getBillingPlans,
  getUserProfile,
  updateUserProfile,
} from "@root/helpers";
import useSWR from "swr";
import useToast from "@root/hooks/useToast";
import { useNavigate } from "react-router";

export default function SubscriptionPlan() {
  const toast = useToast();
  const navigate = useNavigate();
  const data = useSWR("user", getUserProfile, { suspense: true });
  const { data: billingPlans } = useSWR("billingPlans", getBillingPlans, {
    suspense: true,
  });

  const [user, setUser] = useState({
    ...data.data,
    billingPlanId: (
      billingPlans.find((p) => p.billingPlan === "subscription") as BillingPlan
    ).id,
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-7">
      <div className="max-w-[350px] w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl">
          Welcome to NXU Subscription Plan
        </div>

        <p>Please click on T&Cs for plan details.</p>

        <div className="flex flex-col">
          <label className="text-white">Vehicle Count</label>
          <input
            type="number"
            className="h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none"
            placeholder={"1"}
            value={user.vehicleCount || ""}
            onChange={(e) =>
              setUser({ ...user, vehicleCount: Number(e.target.value) })
            }
          />
        </div>

        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            updateUserProfile(user)
              .then(() =>
                toast("Successfully setup subscription plan.", "success")
              )
              .catch((_err) => toast("Failed to setup subscription plan."))
              .finally(() => setLoading(false));
          }}
        >
          Confirm
        </Button>
        <Button onClick={() => navigate("/billing-plans")}>Cancel</Button>
      </div>
    </div>
  );
}
