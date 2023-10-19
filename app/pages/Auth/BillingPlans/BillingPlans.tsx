import { useState } from "react";
import Button from "@root/components/Button";
import {
  getBillingPlans,
  getCreditCard,
  getUserProfile,
  setupSubscriptionPlan,
  updateUserProfile,
} from "@root/helpers";
import { useNavigate } from "react-router";
import useSWR from "swr";
import useAuth from "@root/hooks/useAuth";
import useToast from "@root/hooks/useToast";
import { useFormik } from "formik";
import SubscriptionPlanTermsConditions from "../SubscriptionPlanTermsConditions/SubscriptionPlanTermsConditions";
import { Link } from "react-router-dom";

interface Values {
  isTnCChecked: boolean;
}

export default function BillingPlans() {
  useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: billingPlans } = useSWR("billingPlans", getBillingPlans, {
    suspense: true,
  });
  const { data: user, mutate } = useSWR("user", getUserProfile, {
    suspense: true,
  });
  const { data: creditCard } = useSWR("creditCard", getCreditCard, {
    suspense: true,
  });

  const [billingPlan, setBillingPlan] = useState(user.billingPlan);
  const [loading, setLoading] = useState(false);
  const [isTnCOpen, setIsTnCOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      isTnCChecked: false,
    },
    validate: (values: any) => {
      const errors: any = {};
      if (!values.isTnCChecked)
        errors.isTnCChecked = "You must agree to the terms and conditions.";

      return errors;
    },
    onSubmit: (_values: Values) => {
      if (billingPlan.billingPlan.toLowerCase() === "transaction") {
        setLoading(true);
        updateUserProfile({
          ...user,
          billingPlanId: billingPlan.id,
          billingPlan,
        })
          .then(() => {
            toast.success("Successfully updated plan.");
            mutate({ billingPlan });
          })
          .catch((_err) => toast.error("Failed to update billing plan."))
          .finally(() => setLoading(false));
      }

      if (billingPlan.billingPlan.toLowerCase() === "subscription") {
        setLoading(true);
        setupSubscriptionPlan({ vehicleCount: 1 })
          .then(() => {
            toast.success("Successfully setup subscription plan.");
            mutate({
              billingPlan: billingPlans.find(
                (p) => p.billingPlan.toLowerCase() === "subscription"
              ),
            });
          })
          .catch((_err) => toast.error("Failed to setup subscription plan."))
          .finally(() => setLoading(false));
      }
    },
  });

  const { errors, touched } = formik;

  if (isTnCOpen)
    return (
      <SubscriptionPlanTermsConditions
        onConfirm={() => {
          formik.setFieldValue("isTnCChecked", true);
          setIsTnCOpen(false);
        }}
      />
    );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-7">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[350px] w-full flex flex-col justify-center gap-[30px]"
      >
        <div className="py-[35px] w-full text-center text-white font-extrabold text-4xl">
          NXU Billing Plans
        </div>

        {!creditCard && (
          <div className="text-nxu-charging-white text-[14px]">
            Credit Card is required for managing billing plans. Please enter
            your credit card information in your{" "}
            <Link to={`/profile-creditcard`} className="text-nxu-charging-gold">
              account profile
            </Link>
          </div>
        )}

        {creditCard && (
          <>
            <p className="text-white text-center">
              Current Plan: {user.billingPlan.billingPlan}
            </p>

            <div className="flex items-center mb-4">
              <input
                checked={
                  billingPlan.billingPlan.toLowerCase() === "transaction"
                }
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
                Transactional Plan: pay per charging session/transaction billed
                to the credit card on file after a charge is complete
              </label>
            </div>

            <div className="flex items-center">
              <input
                checked={
                  billingPlan.billingPlan.toLowerCase() === "subscription"
                }
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
                Subscription Plan: monthly fee of $69.00, for multiple charging
                sessions billed to the credit card on file. First month is
                prorated amount, subsequent months is a full fee billed on the
                first day of month. Please see T&Cs for all details.
              </label>
            </div>

            <div className="ml-5">
              <div className="flex items-center gap-[5px]">
                <input
                  id="isTnCChecked"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={formik.values.isTnCChecked}
                  onClick={() => setIsTnCOpen(true)}
                />
                <div
                  onClick={() => setIsTnCOpen(true)}
                  className="cursor-pointer"
                >
                  <p className="text-nxu-charging-white">
                    I have read and agree to the Terms and Conditions
                  </p>
                </div>
              </div>

              {errors.isTnCChecked && touched.isTnCChecked && (
                <p className="text-red-500 text-xs italic">
                  {errors.isTnCChecked}
                </p>
              )}
            </div>

            <Button type="submit" loading={loading}>
              Update Plan
            </Button>
          </>
        )}

        <Button onClick={() => navigate("/dashboard")}>Back to Account</Button>
      </form>
    </div>
  );
}
