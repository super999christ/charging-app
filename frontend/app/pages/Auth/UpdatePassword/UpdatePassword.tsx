import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { useSearchParams } from "react-router-dom";

import {
  validateProfilePasswordForm,
  validateToken,
} from "../../../validations";
import { IProfilePasswordValidation } from "../../../types/ValidationErrors.type";
import { updateUserPassword } from "../../../helpers";
import { AxiosError } from "axios";

type IUpdatePasswordErrors = IProfilePasswordValidation & { page: string };

const UpdatePassword: FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Partial<IUpdatePasswordErrors>>({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") || "";

  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  useEffect(() => {
    if (!userId) navigate("/profile");
  }, [userId]);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    // validation
    const validationResult = validateProfilePasswordForm(
      password,
      confirmPassword
    );
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    // token check
    try {
      await updateUserPassword(userId, password);
      navigate("/profile");
    } catch (err) {
      if (err instanceof AxiosError) setErrors({ page: err.response?.data });
      else setErrors({ page: "User profile update failed" });
    }
  };

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center md:justify-center">
      <div className="max-w-[350px]  w-full flex flex-col justify-center gap-[30px]">
        <div className="py-[35px] w-full text-center text-white font-extrabold text-2xl md:text-4xl border-b border-b-nxu-charging-black">
          Update Password
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
      <button
        className="w-full md:max-w-[350px] md:mt-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={onSubmit}
      >
        <ConfirmIcon />
        <span>Confirm</span>
      </button>
      <button
        className="w-full md:max-w-[350px] md:mt-[10px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={() => navigate('/profile')}
      >
        <span>Cancel</span>
      </button>
    </div>
  );
};

export default UpdatePassword;
