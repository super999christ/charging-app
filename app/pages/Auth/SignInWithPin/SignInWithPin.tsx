import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validateSignInForm, validateToken } from "../../../validations";
import { getAuthTokenWithPIN } from "../../../helpers";
import { ISignInFormValidation } from "../../../types/ValidationErrors.type";
import { Link, useSearchParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { AxiosError } from "axios";
import useCachedForm from "@root/hooks/useCachedForm";
import Button from "@root/components/Button";

type ISignInErrors = ISignInFormValidation & { page: string };

const SignInWithPin: FC = () => {
  const [errors, setErrors] = useState<Partial<ISignInErrors>>({});
  const [loading, setLoading] = useState(false);
  const [notificationId, setNotificationId] = useState(NaN);
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [searchParams] = useSearchParams();
  const reset_pwd = searchParams.get("reset_pwd");
  const token_expired = searchParams.get("token_expired");

  const [{ phoneNumber }, handleChange, clearCachedForm] = useCachedForm(
    "signinForm",
    {
      phoneNumber: "",
    }
  );

  const navigate = useNavigate();

  const isTokenValid = validateToken();
  useEffect(() => {
    if (isTokenValid) navigate("/dashboard");
  }, [isTokenValid]);

  useEffect(() => {
    if (reset_pwd) {
      setResetPasswordSuccess(true);
      navigate("/auth-sign-in");
    }
    if (token_expired) {
      setTokenExpired(true);
      navigate("/auth-sign-in");
    }
  }, [reset_pwd, token_expired]);

  useEffect(() => {
    const validationResult = validateSignInForm(phoneNumber, "111111", pinCode);
    if (validationResult.validationResult) {
      setErrors({});
      return;
    }
    if (validationTriggered && !validationResult.validationResult) {
      setErrors(validationResult);
    }
  }, [phoneNumber, pinCode]);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    // validation
    setValidationTriggered(true);
    const validationResult = validateSignInForm(phoneNumber, "111111", pinCode);
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    // token check
    try {
      setLoading(true);
      const { shouldRedirectToBillingPlan } = await getAuthTokenWithPIN(phoneNumber, pinCode, notificationId);
      clearCachedForm();
      if (shouldRedirectToBillingPlan) {
        navigate("/billing-plans");
      } else {
        navigate("/charging-login");
      }
      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) setErrors({ page: err.response?.data });
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[90%] md:max-w-[350px] mt-[15px] flex flex-col justify-center gap-[30px]">
        <div className="flex flex-col w-full gap-5 mb-5">
          {resetPasswordSuccess && (
            <label className="text-nxu-charging-green text-[14px] text-center">
              Successfully reset password
            </label>
          )}
          {tokenExpired && (
            <label className="text-nxu-charging-white text-[14px] text-center">
              Session Expired please login again.
            </label>
          )}
          <div className="flex flex-col">
            <InputMask
              name="phoneNumber"
              mask="999-999-9999"
              className={inputStyle}
              placeholder="Enter Phone No."
              value={phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <label className="text-nxu-charging-red text-[12px]">
                {errors.phoneNumber}
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Enter Password"
              className={inputStyle}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            {errors.pinCode && (
              <label className="text-nxu-charging-red text-[12px]">
                {errors.pinCode}
              </label>
            )}
          </div>
          {errors.page && (
            <label className="text-nxu-charging-red text-[12px]">
              {errors.page}
            </label>
          )}
        </div>
      </div>

      <Button loading={loading} onClick={onSubmit}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="flex flex-col gap-4 items-center mt-5">
        <Link to="/forgot-password" className="text-nxu-charging-white">
          Forgot Password
        </Link>
        <Link to="/auth-sign-up" className="text-nxu-charging-white">
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInWithPin;
