import Environment from "@root/configs/env";
import axios from "axios";

export const updateUserCreditCard = async (
  userId: string,
  cardNumber: string,
  cvc: string,
  expYear: number,
  expMonth: number
) => {
  const { data } = await axios.put(
    `${Environment.VITE_SERVICE_USER_MANAGEMENT_URL}/profile/creditcard`,
    {
      userId,
      cardNumber,
      cvc,
      expYear,
      expMonth,
    }
  );
  return data;
};
