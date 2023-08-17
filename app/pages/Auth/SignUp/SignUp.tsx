import { useState, FC } from "react";
import { useNavigate } from "react-router";
import { validateSignInForm, validateSignUpForm } from "../../../validations";
import { registerUser } from "../../../helpers";
import { ISignUpFormValidation } from "../../../types/ValidationErrors.type";
import { AxiosError } from "axios";
import InputMask from "react-input-mask";
import { MaskedInput } from "react-hook-mask";
import { creditCardMask, expDateMask } from "@root/utils/creditCard";
import { sendAuthCode } from "@root/helpers/Auth/sendAuthCode.helper";
import TermsConditions from "../TermsConditions";

type ISignUpErrors = ISignUpFormValidation & { page: string };

const SignUp: FC = () => {
  const [errors, setErrors] = useState<Partial<ISignUpErrors>>({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpDate, setCardExpDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isTnCOpen, setTnCOpen] = useState(false);
  const [isTnCChecked, setTnCChecked] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [sendCodeEnabled, setSendCodeEnabled] = useState(true);
  const [notificationId, setNotificationId] = useState(NaN);

  const navigate = useNavigate();

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
    const validationResult = validateSignUpForm(
      email,
      firstName,
      lastName,
      phoneNumber,
      authCode,
      cardNumber,
      cardExpDate,
      cardCvv,
    );
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }
    if (!isTnCChecked) {
      setErrors({
        page: 'Please check the Terms and Conditions to continue',
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
        authCode,
        cardNumber,
        cardExpDate,
        cardCvv,
      );

      if (data.message === "User registration confirmed") {
        navigate("/auth-sign-in");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrors({ page: err.response?.data });
      }
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
    <>
      {isTnCOpen && (
        <TermsConditions onConfirm={onConfirmTNC} />
      )}
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
              <div className="flex flex-col">
                <MaskedInput
                  className={inputStyle}
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={setCardNumber}
                  maskGenerator={creditCardMask}
                />
                {errors.cardNumber && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.cardNumber}
                  </label>
                )}
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-[calc((100%_-_20px)_/_2)]">
                  <MaskedInput
                    className={inputStyle}
                    placeholder="MM / YY"
                    value={cardExpDate}
                    onChange={setCardExpDate}
                    maskGenerator={expDateMask}
                  />
                  {errors.cardExpDate && (
                    <label className="text-nxu-charging-red text-[12px]">
                      {errors.cardExpDate}
                    </label>
                  )}
                </div>
                <div className="flex flex-col w-[calc((100%_-_20px)_/_2)]">
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                  />
                  {errors.cardCvv && (
                    <label className="text-nxu-charging-red text-[12px]">
                      {errors.cardCvv}
                    </label>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-[5px]">
                <input id="tnc-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={isTnCChecked} />
                <div onClick={() => setTnCOpen(true)} className="cursor-pointer">
                  <p className="text-nxu-charging-white">Terms and Conditions</p>
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
            className="w-[90%] md:max-w-[350px] mt-[10px] mb-[5px] bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
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
