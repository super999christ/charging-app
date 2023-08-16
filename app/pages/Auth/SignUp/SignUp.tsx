import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { validateSignUpForm } from "../../../validations";
import { registerUser } from "../../../helpers";
import { ISignUpFormValidation } from "../../../types/ValidationErrors.type";
import { AxiosError } from "axios";
import InputMask from "react-input-mask";

type ISignUpErrors = ISignUpFormValidation & { page: string };

const SignUp: FC = () => {
  const [errors, setErrors] = useState<Partial<ISignUpErrors>>({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    //  Validation
    const validationResult = validateSignUpForm(
      email,
      firstName,
      lastName,
      phoneNumber
    );
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    //  Registration
    try {
      const { data } = await registerUser(
        email,
        firstName,
        lastName,
        phoneNumber
      );
      navigate(`/email-sent?email=${email}&topic=signup`);
    } catch (err) {
      if (err instanceof AxiosError) setErrors({ page: err.response?.data });
    }
  };

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center md:justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Sign Up
        </div>
        <div className="flex flex-col w-full gap-5 mb-5">
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
          {errors.page && (
            <label className="text-nxu-charging-red text-[12px]">
              {errors.page}
            </label>
          )}
        </div>
      </div>
      <div
        className="w-full md:max-w-[350px] md:mt-[40px] md:mb-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={onSubmit}
      >
        <ConfirmIcon />
        <span>Sign Up</span>
      </div>
    </div>
  );
};

export default SignUp;
