import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";

import { validateSignInForm, validateToken } from "../../../validations";
import { getAuthToken } from "../../../helpers";
import { ISignInFormValidation } from "../../../types/ValidationErrors.type";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { sendAuthCode } from "@root/helpers/Auth/sendAuthCode.helper";
import { AxiosError } from "axios";

type ISignInErrors = ISignInFormValidation & { page: string };

const SignIn: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [errors, setErrors] = useState<Partial<ISignInErrors>>({});
  const [notificationId, setNotificationId] = useState(NaN);
  const [alertMsg, setAlertMsg] = useState('');
  const [sendCodeEnabled, setSendCodeEnabled] = useState(true);

  const navigate = useNavigate();

  const isTokenValid = validateToken();
  useEffect(() => {
    if (isTokenValid) navigate("/dashboard");
  }, [isTokenValid]);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async (redirect: boolean) => {
    // validation
    const validationResult = validateSignInForm(phoneNumber, authCode);
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    // token check
    try {
      await getAuthToken(phoneNumber, authCode, notificationId);
      navigate(redirect ? "/charging-login" : "/dashboard");
    } catch (err) {
      if (err instanceof AxiosError)
        setErrors({ page: err.response?.data });
    }
  };

  const onSendSMS = async () => {
    // validation
    const validationResult = validateSignInForm(phoneNumber);
    setErrors({});
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }
    try {
      setSendCodeEnabled(false);
      setTimeout(() => {
        setSendCodeEnabled(true);
        setAlertMsg('');
      }, 120000);
      const response = await sendAuthCode(phoneNumber);
      setAlertMsg('SMS code requested, once received please enter the code in SMS code box and click SignIn. To re-request SMS code please wait 2mins.');
      setNotificationId(response.data.id);
    } catch (err) {
      if (err instanceof AxiosError)
        setErrors({ page: 'SMS code request error please try again' });
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
          <button
            className="w-full md:max-w-[350px] md:mt-[10px] mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
            onClick={onSendSMS}
            disabled={!sendCodeEnabled}
          >
            <span>Get SMS Code</span>
          </button>
          <div className="flex flex-col">
            <input
              className={inputStyle}
              placeholder="Enter SMS Code"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            {errors.authCode && (
              <label className="text-nxu-charging-red text-[12px]">
                {errors.authCode}
              </label>
            )}
          </div>
          {errors.page && (
            <label className="text-nxu-charging-red text-[12px]">
              {errors.page}
            </label>
          )}
          <label className="text-nxu-charging-white text-[12px]">
            {alertMsg}
          </label>
        </div>
      </div>
      <button
        className="w-[90%] md:max-w-[350px] mt-[10px] mb-[5px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={() => onSubmit(true)}
        disabled={!validateSignInForm(phoneNumber, authCode).validationResult}
      >
        <span>Charge</span>
      </button>
      <button
        className="w-[90%] md:max-w-[350px] mt-[5px] mb-[20px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={() => onSubmit(false)}
        disabled={!validateSignInForm(phoneNumber, authCode).validationResult}
      >
        <span>Sign In</span>
      </button>
      <div className="flex gap-4">
        <Link to="/change-phone">
          <p className="text-nxu-charging-white">Change Phone No.</p>
        </Link>
        <Link to="/auth-sign-up">
          <p className="text-nxu-charging-white">Sign Up</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
