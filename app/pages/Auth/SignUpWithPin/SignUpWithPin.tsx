import { useState, FC, useEffect, Fragment } from "react";
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
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from "@root/utils/style";

type ISignUpErrors = ISignUpFormValidation & { page: string };

const SignUpWithPin: FC = () => {
  const [
    { email, firstName, lastName, phoneNumber, isTnCChecked, accountCode },
    handleChange,
    clearCachedForm,
  ] = useCachedForm("signupForm", {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isTnCChecked: false,
    accountCode: ""
  });

  const [errors, setErrors] = useState<Partial<ISignUpErrors>>({});
  const [isTnCOpen, setTnCOpen] = useState(false);
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [pinConfirmCode, setPinConfirmCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);
  const [isConfirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [isPartnerAccount, setPartnerAccount] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const validationResult = validateSignUpForm(
      email,
      firstName,
      lastName,
      phoneNumber,
      "111111",
      accountCode,
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
      accountCode,
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
    registerUserWithPIN(email, firstName, lastName, phoneNumber, pinCode, accountCode, isPartnerAccount)
      .then((res) => {
        setRequestHeader(res.data.token);
        localStorage.setItem("appToken", res.data.token);
        clearCachedForm();
        if (res.data.user.billingPlanId === 3)
          navigate("/");
        else
          navigate("/profile-creditcard");
        toast.success("Successfully signed up!");
        setLoading(false);
      })
      .catch((err) => {
        setErrors({ page: err.response?.data });
        setLoading(false);
      });
  };

  if (isTnCOpen) return <TermsConditions onConfirm={onConfirmTNC} />;
  else
    return (
      <div className="w-full h-full grid justify-items-center flex-col items-center justify-center pb-10">
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
              <label className="text-white">Partner Account</label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white h-11 px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    { isPartnerAccount ? "Yes" : "No" }
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <div
                          className={classNames(
                            !isPartnerAccount ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300'
                          )}
                          data-te-toggle="tooltip"
                          data-te-placement="top"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="No SMS notifications configured"
                          onClick={() => setPartnerAccount(false)}
                        >
                          No
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={classNames(
                            isPartnerAccount ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300'
                          )}
                          data-te-toggle="tooltip"
                          data-te-placement="top"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="Charging Notifications will be sent via SMS to the Login Phone. If needed Customer can sign out of the App after Charge Status page is loaded."
                          onClick={() => setPartnerAccount(true)}
                        >
                          Yes
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {isPartnerAccount && (
              <div className="flex flex-col">
                <input
                  name="accountCode"
                  className={inputStyle}
                  placeholder="Account Code"
                  value={accountCode}
                  onChange={handleChange}
                />
                {errors.accountCode && (
                  <label className="text-nxu-charging-red text-[12px]">
                    {errors.accountCode}
                  </label>
                )}
              </div>
            )}
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

          <Button onClick={onSubmit} loading={loading} className="mb-3">
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </div>
      </div>
    );
};

export default SignUpWithPin;
