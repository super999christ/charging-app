import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";

import { validateToken } from "../../../validations";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Environment from "@root/configs/env";
import {
  CreditCard,
  getCreditCard,
  getCreditCardWithRetry,
  updateUserCreditCard,
} from "@root/helpers";
import useToast from "@root/hooks/useToast";
import { useSearchParams } from "react-router-dom";

const stripePromise = loadStripe(Environment.VITE_STRIPE_PUBLISHABLE_KEY);

function CreditCardWidget() {
  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [editCard, setEditCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creditCard, setCreditCard] = useState<CreditCard>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getCreditCard()
      .then(setCreditCard)
      .catch((_err) => {});
  }, []);

  function handleSubmit() {
    if (!stripe || !elements) return;

    elements.submit();

    setLoading(true);
    stripe
      ?.createPaymentMethod({ elements })
      .then((res) => {
        updateUserCreditCard(res.paymentMethod!.id)
          .then(() => {
            getCreditCardWithRetry().then(() => {
              toast("Successfully updated credit card", "success");
              if (!creditCard) navigate("/charging-login");
              else navigate("/profile");
            });
          })
          .catch((_err) => toast("Failed to update credit card"));
      })
      .catch((_err) => {})
      .finally(() => setLoading(false));
  }

  if (!creditCard || editCard)
    return (
      <div className="my-5">
        <PaymentElement
          id="payment-element"
          options={{
            terms: {
              card: "never",
            },
          }}
        />

        <button
          onClick={handleSubmit}
          className="w-full max-w-[350px] mt-5 bg-black text-white uppercase font-semibold flex flex-col md:flex-row gap-4 py-5 justify-center items-center hover:bg-nxu-charging-blackalpha disabled:opacity-25"
          disabled={loading}
        >
          <ConfirmIcon />
          <span>{creditCard ? "Update" : "Add"} Card</span>
        </button>

        {creditCard && (
          <button
            className="w-full max-w-[350px] mt-5 bg-black text-white uppercase font-semibold hover:bg-nxu-charging-blackalpha py-5"
            onClick={() => setEditCard(false)}
          >
            <span>Cancel</span>
          </button>
        )}
      </div>
    );

  return (
    <>
      <CreditCardPreview
        onEdit={() => setEditCard(true)}
        last4={creditCard.last4}
      />

      <button
        className="w-full max-w-[350px] mt-5 bg-black text-white uppercase font-semibold hover:bg-nxu-charging-blackalpha py-5"
        onClick={() => navigate("/profile")}
      >
        <span>Back</span>
      </button>
    </>
  );
}

function CreditCardPreview({
  onEdit,
  last4,
}: {
  onEdit: () => void;
  last4: string;
}) {
  return (
    <div className="my-5">
      <label className="text-white">Credit Card</label>

      <div className="flex justify-between md:my-[10px] md:max-w-[350px] w-full block p-6 bg-white border border-gray-200 rounded-lg shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>

        <p>{`**** **** **** ${last4}`}</p>

        <button
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-500 p-1.5 hover:bg-gray-300 inline-flex items-center justify-center h-8 w-8 ml-10"
          onClick={onEdit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

const UpdateCredit: FC = () => {
  const navigate = useNavigate();
  const isTokenValid = validateToken();
  const [alertMsg, setAlertMsg] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("signup")) {
      setAlertMsg(
        "Credit Card is required for charging. Please enter your credit card information below."
      );
    }
  }, []);

  useEffect(() => {
    if (!isTokenValid) navigate("/");
  }, [isTokenValid]);

  return (
    <div className="w-full h-[calc(100vh_-_75px)] flex flex-col items-center md:justify-center">
      <div className="text-nxu-charging-green w-full md:max-w-[350px] mb-[10px]">
        {alertMsg}
      </div>
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
