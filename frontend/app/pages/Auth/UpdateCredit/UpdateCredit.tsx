import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { useSearchParams } from "react-router-dom";

import { validateProfileCreditForm, validateToken } from "../../../validations";
import { IProfileCreditValidation } from "../../../types/ValidationErrors.type";
import { updateUserCreditCard } from "../../../helpers";
import { AxiosError } from "axios";
import { MaskedInput } from "react-hook-mask";
import { creditCardMask } from "@root/utils/creditCard";

type IUpdateCreditErrors = IProfileCreditValidation & { page: string };

const UpdateCredit: FC = () => {
  const [creditCard, setCreditCard] = useState("");
  const [expYear, setExpYear] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [errors, setErrors] = useState<Partial<IUpdateCreditErrors>>({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") || "";

  useEffect(() => {
    if (!userId) navigate("/profile");
  }, [userId]);

  const isTokenValid = validateToken();
  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  const inputStyle =
    "h-[50px] px-5 bg-white rounded-[5px] placeholder-nxu-charging-placeholder placeholder:italic focus-visible:outline-none";

  const onSubmit = async () => {
    // validation
    const validationResult = validateProfileCreditForm(
      creditCard,
      expMonth,
      expYear,
      cardCvv
    );
    if (!validationResult.validationResult) {
      setErrors(validationResult);
      return;
    }

    // token check
    try {
      await updateUserCreditCard(
        userId,
        creditCard,
        cardCvv,
        expYear,
        expMonth
      );
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
          Update Credit Card
        </div>
        <div className="flex flex-col w-full gap-5 mb-5">
          <div className="flex flex-col">
            <MaskedInput
              className={inputStyle}
              placeholder="Credit Card"
              value={creditCard}
              onChange={setCreditCard}
              maskGenerator={creditCardMask}
            />
            {errors.cardNumber && (
              <label className="text-nxu-charging-red text-[12px]">
                {errors.cardNumber}
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-5">
              <input
                type="number"
                className={`${inputStyle} w-[calc(50%_-_10px)]`}
                placeholder="Exp Month"
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
              />
              <input
                type="number"
                className={`${inputStyle} w-[calc(50%_-_10px)]`}
                placeholder="Exp Year"
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
              />
            </div>
            {errors.cardExpDate && (
              <label className="text-nxu-charging-red text-[12px]">
                {errors.cardExpDate}
              </label>
            )}
          </div>
          <div className="flex flex-col">
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
          {errors.page && (
            <label className="text-nxu-charging-red text-[12px]">
              {errors.page}
            </label>
          )}
        </div>
      </div>
      <div
        className="w-full md:max-w-[350px] md:mt-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={onSubmit}
      >
        <ConfirmIcon />
        <span>Confirm</span>
      </div>
      <button
        className="w-full md:max-w-[350px] md:mt-[10px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={() => navigate('/profile')}
      >
        <span>Cancel</span>
      </button>
    </div>
  );
};

export default UpdateCredit;
