import {
  loadStripe,
  ConfirmCardPaymentData,
  PaymentIntent,
  Stripe,
  StripeCardElement,
} from "@stripe/stripe-js";
import {} from "@stripe/stripe-js";
import { User } from "firebase/auth";

export const loadStripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
);

type PaymentArgs = {
  totalPrice: number;
  user: User | null;
  stripe: Stripe;
  card: StripeCardElement;
};
export const createCardPayment = async (
  args: PaymentArgs,
): Promise<boolean> => {
  const { totalPrice, user, stripe, card } = args;
  const url = "/.netlify/functions/create-payment-intent";
  const init: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalPrice * 100 }),
  };
  const response = await fetch(url, init);
  const { client_secret } = (await response.json()) as PaymentIntent;
  if (!client_secret) return false;

  const name = user?.displayName || "Guest";
  const data: ConfirmCardPaymentData = {
    payment_method: { card, billing_details: { name } },
  };
  const paymentResult = await stripe.confirmCardPayment(client_secret, data);
  const { error, paymentIntent } = paymentResult;
  if (error) {
    console.error(error);
    return false;
  }
  return paymentIntent?.status === "succeeded";
};
