import { useState, FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { validateSignUpForm } from "../../../validations";
import { registerUser } from "../../../helpers";
import { ISignUpFormValidation } from "../../../types/ValidationErrors.type";
import { AxiosError } from "axios";
import InputMask from "react-input-mask";
import { sendRegisterAuthCode } from "@root/helpers/Auth/sendAuthCode.helper";
import TermsConditions from "../TermsConditions";
import { setRequestHeader } from "@root/utils/setRequestHeader";

type ISignUpErrors = ISignUpFormValidation & { page: string };

const SignUp: FC = () => {
  const [errors, setErrors] = useState<Partial<ISignUpErrors>>({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTnCOpen, setTnCOpen] = useState(false);
  const [isTnCChecked, setTnCChecked] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [sendCodeEnabled, setSendCodeEnabled] = useState(true);
  const [notificationId, setNotificationId] = useState(NaN);
  const [validationTriggered, setValidationTriggered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validationResult = validateSignUpForm(
      email,
      firstName,
      lastName,
      phoneNumber,
      "111111"
    );
    if (validationResult.validationResult) {
      setErrors({});
      return;
    }
    if (validationTriggered && !validationResult.validationResult) {
      setErrors(validationResult);
    }
  }, [firstName, lastName, email, phoneNumber, authCode]);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onConfirmTNC = () => {
    setTnCOpen(false);
    setTnCChecked(true);
    if (errors.page?.includes("Terms")) {
      setErrors({});
    }
  };

  const onSubmit = async () => {
    //  Validation
    setValidationTriggered(true);
    const validationResult = validateSignUpForm(
      email,
      firstName,
      lastName,
      phoneNumber,
      authCode
    );
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }
    if (!isTnCChecked) {
      setErrors({
        page: "Please check the Terms and Conditions to continue",
      });
      return;
    }

    //  Registration
    try {
      const { data } = await registerUser(
        email,
        firstName,
        lastName,
        phoneNumber,
        Number(notificationId),
        authCode
      );

      if (data.message === "User registration confirmed") {
        setRequestHeader(data.token);
        localStorage.setItem("appToken", data.token);
        navigate("/charging-login?signup=success");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrors({ page: err.response?.data });
      }
    }
  };

  const onSendSMS = async () => {
    // validation
    setValidationTriggered(true);
    const validationResult = validateSignUpForm(
      email,
      firstName,
      lastName,
      phoneNumber,
      "111111"
    );
    console.log(validationResult);
    setErrors({});
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }
    try {
      setSendCodeEnabled(false);
      const response = await sendRegisterAuthCode(phoneNumber);
      setTimeout(() => {
        setSendCodeEnabled(true);
        setAlertMsg("");
      }, 120000);
      setAlertMsg(
        "SMS code requested, once received please enter the code in SMS code box and click SignIn. To re-request SMS code please wait 2mins."
      );
      setNotificationId(response.data.id);
    } catch (err) {
      setSendCodeEnabled(true);
      if (err instanceof AxiosError) setErrors({ page: err.response?.data });
    }
  };

  return (
    <>
      {isTnCOpen && <TermsConditions onConfirm={onConfirmTNC} />}
      {!isTnCOpen && (
        <div className="w-full flex flex-col items-center md:justify-center overflow-y-auto">
          <div className="w-[90%] md:max-w-[350px] flex flex-col justify-center gap-[30px]">
            <div className="flex flex-col w-full gap-5 mb-5 mt-3">
              <div className="flex flex-col">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.firstName}
                  </label>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.lastName}
                  </label>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.email}
                  </label>
                )}
              </div>

              <div className="flex items-center gap-[5px]">
                <input
                  id="tnc-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={isTnCChecked}
                  onChange={() => setTnCOpen(true)}
                />
                <div
                  onClick={() => setTnCOpen(true)}
                  className="cursor-pointer"
                >
                  <p className="text-nxu-charging-white">
                    Terms and Conditions
                  </p>
                </div>
              </div>
              {errors.page && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.page}
                </label>
              )}
              <div className="flex flex-col">
                <InputMask
                  mask="999-999-9999"
                  className={inputStyle}
                  placeholder="Phone Number"
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
                  type="text"
                  className={inputStyle}
                  placeholder="SMS Code"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                />
                {errors.authCode && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.authCode}
                  </label>
                )}
                <label className="text-nxu-charging-white text-[12px] mt-[10px]">
                  {alertMsg}
                </label>
              </div>
            </div>
          </div>
          <button
            className="w-[90%] md:max-w-[350px] mt-[10px] mb-[5px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha disabled:bg-nxu-charging-disabled"
            onClick={onSendSMS}
            disabled={!sendCodeEnabled}
          >
            <span>Get SMS Code</span>
          </button>
          <button
            className="w-[90%] md:max-w-[350px] mt-[5px] mb-[10px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
            onClick={onSubmit}
          >
            <span>Sign Up</span>
          </button>
        </div>
      )}
    </>
  );
};

export default SignUp;
