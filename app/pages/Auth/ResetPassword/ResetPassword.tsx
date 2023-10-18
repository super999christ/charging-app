import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";

import { validateResetPasswordForm, validateToken } from "../../../validations";
import {
  deleteResetPasswordInfo,
  getPasswordResetInfo,
  resetAccountPassword,
} from "../../../helpers";
import { IResetPasswordFormValidation } from "../../../types/ValidationErrors.type";
import { useSearchParams } from "react-router-dom";
import Button from "@root/components/Button";

interface IPasswordResetInfo {
  email: string;
}
type IResetPasswordErrors = IResetPasswordFormValidation & { page: string };

const ResetPassword: FC = () => {
  const [errors, setErrors] = useState<Partial<IResetPasswordErrors>>({});
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordResetInfo, setPasswordResetInfo] =
    useState<IPasswordResetInfo>({
      email: "",
    });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const passwordResetId = searchParams.get("passwordResetId") || "";

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  useEffect(() => {
    const getInfo = async (rId: string) => {
      try {
        const data = await getPasswordResetInfo(rId);
        setPasswordResetInfo(data);
      } catch (err) {
        alert("This link is invalid");
        navigate("/");
      }
    };

    getInfo(passwordResetId);
  }, []);

  const onSubmit = async () => {
    //  Validation
    const validationResult = validateResetPasswordForm(
      password,
      passwordConfirm
    );
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    //  Send Request
    try {
      const { email } = passwordResetInfo;

      const { data } = await resetAccountPassword(email, password);

      if (data === "success") {
        await deleteResetPasswordInfo(passwordResetId);
        localStorage.removeItem("appToken");
        navigate("/auth-sign-in?reset_pwd=1");
      }
    } catch (err) {
      setErrors({ page: "Error while resetting password" });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Reset Password
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
          {errors.page && (
            <label className="text-nxu-charging-red text-[12px]">
              {errors.page}
            </label>
          )}
        </div>
      </div>

      <Button iconLeft={<ConfirmIcon />} onClick={onSubmit}>
        Reset
      </Button>
    </div>
  );
};

export default ResetPassword;
