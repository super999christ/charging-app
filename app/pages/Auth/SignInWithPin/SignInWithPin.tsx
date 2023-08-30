import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validateSignInForm, validateToken } from "../../../validations";
import { getAuthToken, getAuthTokenWithPIN } from "../../../helpers";
import { ISignInFormValidation } from "../../../types/ValidationErrors.type";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { AxiosError } from "axios";

type ISignInErrors = ISignInFormValidation & { page: string };

const SignInWithPin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<Partial<ISignInErrors>>({});
  const [notificationId, setNotificationId] = useState(NaN);
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const navigate = useNavigate();

  const isTokenValid = validateToken();
  useEffect(() => {
    if (isTokenValid) navigate("/dashboard");
  }, [isTokenValid]);

  useEffect(() => {
    const validationResult = validateSignInForm(phoneNumber, '111111', pinCode);
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

  const onSubmit = async (redirect: boolean) => {
    // validation
    setValidationTriggered(true);
    const validationResult = validateSignInForm(phoneNumber, '111111', pinCode);
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    // token check
    try {
      await getAuthTokenWithPIN(phoneNumber, pinCode, notificationId);
      navigate(redirect ? "/charging-login" : "/dashboard");
    } catch (err) {
      if (err instanceof AxiosError)
        setErrors({ page: err.response?.data });
    }
  };

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center justify-center">
      <div className="w-[90%] md:max-w-[350px] mt-[15px] flex flex-col justify-center gap-[30px]">
        <div className="flex flex-col w-full gap-5 mb-5">
          <div className="flex flex-col">
            <InputMask
              mask="999-999-9999"
              className={inputStyle}
              placeholder="Enter Phone No."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
      <button
        className="w-[90%] md:max-w-[350px] mt-[10px] mb-[5px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha disabled:bg-nxu-charging-disabled"
        onClick={() => onSubmit(true)}
      >
        <span>Sign In</span>
      </button>
      <div className="flex gap-4 flex-col">
        <Link to="/forgot-password">
          <p className="text-nxu-charging-white">Forgot Password</p>
        </Link>
        <Link to="/auth-sign-up">
          <p className="text-nxu-charging-white">Don't have an account? Sign Up</p>
        </Link>
      </div>
    </div>
  );
};

export default SignInWithPin;
