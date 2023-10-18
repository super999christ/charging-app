import { useState, FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { validateSignUpForm } from "../../../validations";
import { registerUserWithPIN } from "../../../helpers";
import { ISignUpFormValidation } from "../../../types/ValidationErrors.type";
import InputMask from "react-input-mask";
import TermsConditions from "../TermsConditions";
import { setRequestHeader } from "@root/utils/setRequestHeader";
import useToast from "@root/hooks/useToast";
import useCachedForm from "@root/hooks/useCachedForm";
import Button from "@root/components/Button";

type ISignUpErrors = ISignUpFormValidation & { page: string };

const SignUpWithPin: FC = () => {
  const [
    { email, firstName, lastName, phoneNumber, isTnCChecked },
    handleChange,
    clearCachedForm,
  ] = useCachedForm("signupForm", {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isTnCChecked: false,
  });

  const [errors, setErrors] = useState<Partial<ISignUpErrors>>({});
  const [isTnCOpen, setTnCOpen] = useState(false);
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [pinConfirmCode, setPinConfirmCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);
  const [isConfirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const validationResult = validateSignUpForm(
      email,
      firstName,
      lastName,
      phoneNumber,
      "111111",
      pinCode,
      pinConfirmCode
    );
    if (validationResult.validationResult) {
      setErrors({});
      return;
    }
    if (validationTriggered && !validationResult.validationResult) {
      setErrors(validationResult);
    }
  }, [firstName, lastName, email, phoneNumber, pinCode, pinConfirmCode]);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onConfirmTNC = () => {
    setTnCOpen(false);
    handleChange({ target: { name: "isTnCChecked", value: true } });
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
      "111111",
      pinCode,
      pinConfirmCode
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

    setLoading(true);
    registerUserWithPIN(email, firstName, lastName, phoneNumber, pinCode)
      .then((res) => {
        setRequestHeader(res.data.token);
        localStorage.setItem("appToken", res.data.token);
        clearCachedForm();
        navigate("/profile-creditcard?signup=success");
        setLoading(false);
      })
      .then(() => toast.success("Successfully signed up!"))
      .catch((err) => {
        setErrors({ page: err.response?.data });
        setLoading(false);
      });
  };

  if (isTnCOpen) return <TermsConditions onConfirm={onConfirmTNC} />;
  else
    return (
      <div className="w-full h-full flex flex-col items-center justify-center pb-10">
        <div className="w-[90%] md:max-w-[350px] flex flex-col justify-center gap-[30px]">
          <div className="flex flex-col w-full gap-5 mb-5 mt-3">
            <div className="flex flex-col">
              <input
                name="firstName"
                type="text"
                className={inputStyle}
                placeholder="First Name"
                value={firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.firstName}
                </label>
              )}
            </div>
            <div className="flex flex-col">
              <input
                name="lastName"
                type="text"
                className={inputStyle}
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.lastName}
                </label>
              )}
            </div>
            <div className="flex flex-col">
              <input
                name="email"
                type="text"
                className={inputStyle}
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
              {errors.email && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.email}
                </label>
              )}
            </div>
            <div className="flex flex-col">
              <InputMask
                name="phoneNumber"
                mask="999-999-9999"
                className={inputStyle}
                placeholder="Phone Number"
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
                className={inputStyle}
                placeholder="Password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
              />
              {isPasswordFocus && !errors.pinCode && (
                <label className="text-nxu-charging-white text-[12px]">
                  Password must be at least 7 characters with alphabets and
                  numbers.
                </label>
              )}
              {errors.pinCode && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.pinCode}
                </label>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                className={inputStyle}
                placeholder="Confirm Password"
                value={pinConfirmCode}
                onChange={(e) => setPinConfirmCode(e.target.value)}
                onFocus={() => setConfirmPasswordFocus(true)}
              />
              {isConfirmPasswordFocus && !errors.pinConfirmCode && (
                <label className="text-nxu-charging-white text-[12px]">
                  Confirm Password must be at least 7 characters with alphabets
                  and numbers.
                </label>
              )}
              {errors.pinConfirmCode && (
                <label className="text-nxu-charging-red text-[12px]">
                  {errors.pinConfirmCode}
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
              <div onClick={() => setTnCOpen(true)} className="cursor-pointer">
                <p className="text-nxu-charging-white">
                  I have read and agree to the Terms and Conditions
                </p>
              </div>
            </div>
            {errors.page && (
              <label className="text-nxu-charging-red text-[12px]">
                {errors.page}
              </label>
            )}
          </div>

          <Button onClick={onSubmit} loading={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </div>
      </div>
    );
};

export default SignUpWithPin;
