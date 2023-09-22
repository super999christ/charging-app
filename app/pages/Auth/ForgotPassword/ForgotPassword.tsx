import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";

import { validateForgotPasswordForm } from "../../../validations";
import { requestResetPassword } from "../../../helpers";
import { IForgotPasswordFormValidation } from "../../../types/ValidationErrors.type";
import Button from "@root/components/Button";

type IForgotPasswordErrors = IForgotPasswordFormValidation & { page: string };

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Partial<IForgotPasswordErrors>>({});

  const navigate = useNavigate();

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    // validation
    const validationResult = validateForgotPasswordForm(email);
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    // token check
    try {
      await requestResetPassword(email);
      navigate(`/email-sent?email=${email}&topic=password`);
    } catch (err) {
      setErrors({ page: "User Not Exist" });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Forgot Password
        </div>
        <div className="flex flex-col w-full gap-5 mb-5">
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
          {errors.page && (
            <label className="text-nxu-charging-red text-[12px]">
              {errors.page}
            </label>
          )}
        </div>
      </div>

      <Button iconLeft={<ConfirmIcon />} onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ForgotPassword;
