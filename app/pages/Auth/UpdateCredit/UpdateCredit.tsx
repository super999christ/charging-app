import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { useSearchParams } from "react-router-dom";

import { validateToken } from "../../../validations";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Environment from "@root/configs/env";
import { getCreditCard, updateUserCreditCard } from "@root/helpers";
import useToast from "@root/hooks/useToast";

const stripePromise = loadStripe(Environment.VITE_STRIPE_PUBLISHABLE_KEY);

function CreditCardWidget() {
  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cc, setCC] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCreditCard()
      .then(setCC)
      .catch((err) => {});
  }, []);

  function onSubmit() {
    if (!stripe || !elements) return;

    elements.submit();

    setLoading(true);
    stripe
      ?.createPaymentMethod({ elements })
      .then((res) => {
        updateUserCreditCard(res.paymentMethod!.id).then(() => {
          toast("Successfully updated credit card", "success");
          navigate("/profile");
        });
      })
      .catch(() => toast("Failed to update credit card"))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <PaymentElement
        id="payment-element"
        options={{
          terms: {
            card: "never",
          },
        }}
      />

      <button
        className="w-full md:max-w-[350px] md:mt-[60px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha disabled:opacity-25"
        disabled={loading}
        onClick={onSubmit}
      >
        <ConfirmIcon />
        <span>Confirm</span>
      </button>
      <button
        className="w-full md:max-w-[350px] md:mt-[10px]  mt-auto bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha"
        onClick={() => navigate("/profile")}
      >
        <span>Cancel</span>
      </button>
    </>
  );
}

const UpdateCredit: FC = () => {
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

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center md:justify-center">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "setup",
          currency: "usd",
          appearance: {
            theme: "night",
          },
          paymentMethodCreation: "manual",
        }}
      >
        <CreditCardWidget />
      </Elements>
    </div>
  );
};

export default UpdateCredit;
