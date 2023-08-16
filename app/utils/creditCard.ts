import { createDefaultMaskGenerator } from "react-hook-mask";

export const getExpirationDate = (expDate: string) => {
  const data = [expDate.slice(0, 2), expDate.slice(2, 4)];
  return {
    expYear: data[1],
    expMonth: data[0],
  };
};

export const creditCardMask = createDefaultMaskGenerator('9999 9999 9999 9999');
export const expDateMask = createDefaultMaskGenerator('99 / 99');