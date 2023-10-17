import { useState } from "react";
import Button from "@root/components/Button";
import {
  getBillingPlans,
  getUserProfile,
  updateUserProfile,
} from "@root/helpers";
import { useNavigate } from "react-router";
import useSWR from "swr";
import ResultMessage, { AlertType } from "@root/components/ResultMessage";
import useAuth from "@root/hooks/useAuth";

export default function BillingPlans() {
  useAuth();
  const navigate = useNavigate();
  const { data: billingPlans } = useSWR("billingPlans", getBillingPlans, {
    suspense: true,
  });
  const { data: user, mutate } = useSWR("user", getUserProfile, {
    suspense: true,
  });

  const [billingPlan, setBillingPlan] = useState(user.billingPlan);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", alertType: "" });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-7">
      <div className="max-w-[350px] w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-4xl">
          NXU Billing Plans
        </div>

        <p className="text-white text-center">
          Current Plan: {user.billingPlan.billingPlan}
        </p>

        <div className="flex items-center mb-4">
          <input
            checked={billingPlan.billingPlan.toLowerCase() === "transaction"}
            id="default-radio-1"
            type="radio"
            onChange={(e) =>
              setBillingPlan(
                billingPlans.find(
                  (p) => p.billingPlan.toLowerCase() === "transaction"
                )!
              )
            }
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-1"
            className="ml-2 text-sm font-medium text-white"
          >
            Transactional Plan: pay per charging session/transaction billed to
            the credit card on file after a charge is complete
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={billingPlan.billingPlan.toLowerCase() === "subscription"}
            id="default-radio-2"
            onChange={(e) =>
              setBillingPlan(
                billingPlans.find(
                  (p) => p.billingPlan.toLowerCase() === "subscription"
                )!
              )
            }
            type="radio"
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-white"
          >
            Subscription Plan: monthly fee of $70, for multiple charging
            sessions billed to the credit card on file. First month is prorated
            amount, subsequent months is a full fee billed on the first day of
            month. Please see T&Cs for all details.
          </label>
        </div>

        <ResultMessage
          message={alert.message}
          alertType={alert.alertType as AlertType}
        />

        <Button
          loading={loading}
          onClick={() => {
            if (billingPlan.billingPlan.toLowerCase() === "transaction") {
              setLoading(true);
              updateUserProfile({
                ...user,
                billingPlanId: billingPlan.id,
                billingPlan,
              })
                .then(() => {
                  setAlert({
                    message: "Successfully updated plan.",
                    alertType: "success",
                  });
                  mutate({ billingPlan });
                })
                .catch((_err) =>
                  setAlert({
                    message: "Failed to update billing plan.",
                    alertType: "error",
                  })
                )
                .finally(() => setLoading(false));
            }

            if (billingPlan.billingPlan.toLowerCase() === "subscription")
              navigate("/subscription-plans");
          }}
        >
          Update Plan
        </Button>

        <Button onClick={() => navigate("/dashboard")}>Back to Account</Button>
      </div>
    </div>
  );
}
