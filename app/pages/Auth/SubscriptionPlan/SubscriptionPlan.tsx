import { useState } from "react";
import Button from "@root/components/Button";
import { setupSubscriptionPlan } from "@root/helpers";
import { useNavigate } from "react-router";
import SubscriptionPlanTermsConditions from "../SubscriptionPlanTermsConditions/SubscriptionPlanTermsConditions";
import { useFormik } from "formik";
import ResultMessage, { AlertType } from "@root/components/ResultMessage";

interface Values {
  vehicleCount: number;
  isTnCChecked: boolean;
}

export default function SubscriptionPlan() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isTnCOpen, setIsTnCOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", alertType: "" });
  const formik = useFormik({
    initialValues: {
      vehicleCount: 1,
      isTnCChecked: false,
    },
    onSubmit: (values: Values) => {
      const { vehicleCount } = values;
      setLoading(true);

      setupSubscriptionPlan({ vehicleCount })
        .then(() =>
          setAlert({
            message: "Successfully setup subscription plan.",
            alertType: "success",
          })
        )
        .catch((_err) =>
          setAlert({
            message: "Failed to setup subscription plan.",
            alertType: "error",
          })
        )
        .finally(() => setLoading(false));
    },
    validate: (values: any) => {
      const errors: any = {};

      if (values.vehicleCount <= 0)
        errors.vehicleCount = "Vehicle count must be greater than zero.";
      if (!values.isTnCChecked)
        errors.isTnCChecked = "You must agree to the terms and conditions.";

      return errors;
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
      <div className="max-w-[350px] w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl">
          NXU Subscription Plan
        </div>

        <p className="text-white text-center">
          Please click on T&Cs for plan details.
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-[30px]"
        >
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-white">
              Vehicle Count
            </label>
            <input
              id="vehicleCount"
              name="vehicleCount"
              type="text"
              inputMode="numeric"
              className="h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none"
              placeholder="1"
              value={formik.values.vehicleCount}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {errors.vehicleCount && touched.vehicleCount && (
              <p className="text-red-500 text-xs italic">
                {errors.vehicleCount}
              </p>
            )}
          </div>

          <div>
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
                {
                  <p className="text-nxu-charging-white">
                    I have read and agree to the Terms and Conditions
                  </p>
                }
              </div>
            </div>

            {errors.isTnCChecked && touched.isTnCChecked && (
              <p className="text-red-500 text-xs italic">
                {errors.isTnCChecked}
              </p>
            )}
          </div>

          <ResultMessage
            message={alert.message}
            alertType={alert.alertType as AlertType}
          />

          <Button type="submit" loading={loading}>
            Confirm
          </Button>
        </form>

        <Button onClick={() => navigate("/billing-plans")}>Cancel</Button>
      </div>
    </div>
  );
}
