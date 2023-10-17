import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as ConfirmIcon } from "../../../assets/tickOutline.svg";
import { ReactComponent as PencilIcon } from "../../../assets/pencilIcon.svg";
import { ReactComponent as CardIcon } from "../../../assets/cardIcon.svg";

import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Environment from "@root/configs/env";
import {
  createStripeCustomer,
  getCreditCard,
  updateUserCreditCard,
} from "@root/helpers";
import useToast from "@root/hooks/useToast";
import Button from "@root/components/Button";
import useSWR from "swr";
import useAuth from "@root/hooks/useAuth";

const UpdateCredit: FC = () => {
  useAuth();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
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
        <Page />
      </Elements>
    </div>
  );
};

const stripePromise = loadStripe(Environment.VITE_STRIPE_PUBLISHABLE_KEY);

function Page() {
  const { data: creditCard, mutate } = useSWR("creditCard", getCreditCard, {
    suspense: true,
  });

  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [editCard, setEditCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCustomerLock, setCreateCustomerLock] = useState(false);
  const [displayAddCardMsg, setDisplayAddCardMsg] = useState(!creditCard);

  useEffect(() => {
    setDisplayAddCardMsg(!creditCard);
  }, [creditCard]);

  useEffect(() => {
    if (createCustomerLock) return;
    setCreateCustomerLock(true);
    createStripeCustomer()
      .catch((err) => {})
      .finally(() => setCreateCustomerLock(false));
  }, []);

  function buttonMessage() {
    if (loading) return "Credit Card setup in-progress. Please wait...";
    else return creditCard ? "Update Card" : "Add Card";
  }

  function handleSubmit() {
    if (!stripe || !elements) return;

    elements.submit();

    setLoading(true);
    setDisplayAddCardMsg(false);
    stripe
      ?.createPaymentMethod({ elements })
      .then((res) => {
        updateUserCreditCard(res.paymentMethod!.id).then(() => {
          getCreditCard().then((cc) => {
            setLoading(false);
            toast(
              "Credit Card setup successful. Re-directing to Charge page.",
              "success"
            );
            mutate({ ...cc });
            navigate("/charging-login");
          });
        });
      })
      .catch((_err) => {
        toast("Failed to update credit card");
        setLoading(false);
        setDisplayAddCardMsg(true);
      });
  }

  if (!creditCard || editCard)
    return (
      <div className="flex flex-col items-center my-5 ">
        {displayAddCardMsg && (
          <div className="text-nxu-charging-green w-full md:max-w-[350px] mb-[10px] text-center">
            Credit Card is required for charging. Please enter your credit card
            information below.
          </div>
        )}

        <PaymentElement
          id="payment-element"
          options={{
            terms: {
              card: "never",
            },
            wallets: {
              applePay: "never",
              googlePay: "never",
            },
          }}
        />

        <div className="flex flex-col items-center gap-4 my-5">
          <Button
            iconLeft={<ConfirmIcon />}
            onClick={handleSubmit}
            loading={loading}
          >
            {buttonMessage()}
          </Button>

          {creditCard! && (
            <Button onClick={() => setEditCard(false)}>Cancel</Button>
          )}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <CreditCardPreview
        onEdit={() => setEditCard(true)}
        last4={creditCard.last4}
      />

      <Button onClick={() => navigate("/profile")}>Back</Button>
    </div>
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

      <div className="flex justify-between items-center md:my-[10px] md:max-w-[350px] w-full block p-6 bg-white border border-gray-200 rounded-lg shadow">
        <CardIcon className="h-8" />

        <p className="ml-3">{`**** **** **** ${last4}`}</p>

        <button
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-500 p-1.5 hover:bg-gray-300 inline-flex items-center justify-center h-8 w-8 ml-10"
          onClick={onEdit}
        >
          <PencilIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default UpdateCredit;
