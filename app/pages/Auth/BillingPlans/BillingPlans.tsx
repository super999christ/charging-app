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

        <div className="flex items-center mb-4">
          <input
            checked={billingPlan.billingPlan === "transaction"}
            id="default-radio-1"
            type="radio"
            onChange={(e) =>
              setBillingPlan(
                billingPlans.find((p) => p.billingPlan === "transaction")!
              )
            }
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-1"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Transactional Plan: pay per charging session/transaction billed to
            the credit card on file after a charge is complete
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={billingPlan.billingPlan === "subscription"}
            id="default-radio-2"
            onChange={(e) =>
              setBillingPlan(
                billingPlans.find((p) => p.billingPlan === "subscription")!
              )
            }
            type="radio"
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
