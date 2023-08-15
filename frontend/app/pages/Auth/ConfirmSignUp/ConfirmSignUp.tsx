import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { validatePasswordForm, validateToken } from "../../../validations";
import {
  deleteRegistrationInfo,
  getRegistrationInfo,
  setAccountPassword,
} from "../../../helpers";
import { IConfirmRegisterFormValidation } from "../../../types/ValidationErrors.type";
import { Link, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import TermsConditions from "../TermsConditions/TermsConditions";
import { MaskedInput } from "react-hook-mask";
import { creditCardMask, expDateMask } from "@root/utils";

interface IRegitrationInfo {
  email: string;
  emailNotificationId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  smsNotificationId: string;
}
type IConfirmRegisterErrors = IConfirmRegisterFormValidation & { page: string };

const ConfirmRegister: FC = () => {
  const [errors, setErrors] = useState<Partial<IConfirmRegisterErrors>>({});
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpDate, setCardExpDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isTnCOpen, setTnCOpen] = useState(false);
  const [isTnCChecked, setTnCChecked] = useState(false);
  const [registrationInfo, setRegistrationInfo] = useState<IRegitrationInfo>({
    email: "",
    emailNotificationId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    smsNotificationId: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("registrationId") || "";

  const isTokenValid = validateToken();
  useEffect(() => {
    const getInfo = async (rId: string) => {
      try {
        const data = await getRegistrationInfo(rId);
        setRegistrationInfo(data);
      } catch (err) {
        alert("This link is invalid");
        navigate("/");
      }
    };

    getInfo(registrationId);
  }, []);

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
    const validationResult = validatePasswordForm(
      password,
      passwordConfirm,
      authCode,
      cardNumber,
      cardExpDate,
      cardCvv
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

    //  Send Request
    try {
      const { email, firstName, lastName, phoneNumber, smsNotificationId } =
        registrationInfo;

      const { data } = await setAccountPassword(
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
        Number(smsNotificationId),
        authCode,
        cardNumber,
        cardExpDate,
        cardCvv,
        registrationId
      );

      if (data.message === "User registration confirmed") {
        await deleteRegistrationInfo(registrationId);
        navigate("/auth-sign-in");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrors({ page: err.response?.data });
      }
    }
  };

  return (
    <>
      {isTnCOpen && (
        <TermsConditions onConfirm={onConfirmTNC} />
      )}
      {!isTnCOpen && (
        <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center md:justify-center">
          <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
            <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
              Sign Up Confirm
            </div>
            <div className="flex flex-col w-full gap-5 mb-5">
              <div className="flex flex-col">
                <input
                  type="password"
                  className={inputStyle}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.password}
                  </label>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="password"
                  className={inputStyle}
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                {errors.confirmPassword && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.confirmPassword}
                  </label>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Auth Code"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                />
                {errors.authCode && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.authCode}
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
                  <p className="text-nxu-charging-gold">Terms and Conditions</p>
                </div>
              </div>
              {errors.page && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.page}
                </label>
              )}
            </div>
          </div>
          <button
            className={`w-full md:max-w-[350px] md:mt-[40px] md:mb-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center ${isTnCChecked && "hover:bg-nxu-charging-blackalpha"}`}
            onClick={onSubmit}
          >
            <ConfirmIcon />
            <span>Sign Up</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ConfirmRegister;
