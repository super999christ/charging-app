import { useState } from "react";
import Button from "@root/components/Button";
import {
  BillingPlan,
  getBillingPlans,
  getUserProfile,
  updateUserProfile,
} from "@root/helpers";
import { useNavigate } from "react-router";
import useSWR from "swr";
import ResultMessage, { AlertType } from "@root/components/ResultMessage";

export default function BillingPlans() {
  const navigate = useNavigate();
  const { data: billingPlans } = useSWR("billingPlans", getBillingPlans, {
    suspense: true,
  });
  const { data: user } = useSWR("user", getUserProfile, { suspense: true });

  const [billingPlan, setBillingPlan] = useState(user.billingPlan);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", alertType: "" });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-7">
      <div className="max-w-[350px] w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl">
          NXU Billing Plans
        </div>

        <label className="block mb-2 text-sm font-medium text-white">
          Billing Plans
          <select
            id="billingPlans"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setBillingPlan(
                billingPlans.find(
                  (p) => p.id === Number(e.target.value)
                ) as BillingPlan
              )
            }
          >
            {billingPlans.map((plan) => (
              <option
                selected={plan.billingPlan === billingPlan.billingPlan}
                key={plan.id}
                value={plan.id}
              >
                {plan.billingPlan}
              </option>
            ))}
          </select>
        </label>

        <ResultMessage
          message={alert.message}
          alertType={alert.alertType as AlertType}
        />

        <Button
          loading={loading}
          onClick={() => {
            if (billingPlan.billingPlan === "transaction") {
              setLoading(true);
              updateUserProfile({ ...user, billingPlanId: billingPlan.id })
                .then(() =>
                  setAlert({
                    message: "Successfully updated billing plan.",
                    alertType: "success",
                  })
                )
                .catch((_err) =>
                  setAlert({
                    message: "Failed to update billing plan.",
                    alertType: "error",
                  })
                )
                .finally(() => setLoading(false));
            }

            if (billingPlan.billingPlan === "subscription")
              navigate("/subscription-plans");
          }}
        >
          Confirm
        </Button>

        {user.billingPlan.billingPlan === "subscription" && (
          <Button onClick={() => navigate("/subscription-plans")}>
            Update Subscription
          </Button>
        )}
        <Button onClick={() => navigate("/dashboard")}>Cancel</Button>
      </div>
    </div>
  );
}
