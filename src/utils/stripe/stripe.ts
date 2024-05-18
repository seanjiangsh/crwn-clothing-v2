import {
  loadStripe,
  ConfirmCardPaymentData,
  PaymentIntent,
  Stripe,
  StripeCardElement,
} from "@stripe/stripe-js";
import { User } from "firebase/auth";

const { DEV, VITE_NETLIFY_ENV } = import.meta.env;
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51HPd44DGvQwgB8HFNHHN6yuoOWTkbQR8h6TDgRgB4AzLdl199vNOyY7jdL9en9jHHZk5WVNnuJwWlV3ZhU3R30O100v8MupaEG";
export const loadStripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const createPaymentIntentUrl = VITE_NETLIFY_ENV
  ? "/.netlify/functions/create-payment-intent"
  : DEV
    ? "http://localhost:3000/api/create-payment-intent"
    : "/api/create-payment-intent";

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
  const init: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalPrice * 100 }),
  };
  const response = await fetch(createPaymentIntentUrl, init);
  if (!response.ok) return false;
  const { client_secret } = (await response.json()) as PaymentIntent;
  if (!client_secret) return false;

  const name = user?.displayName || "Guest";
  const data: ConfirmCardPaymentData = {
    payment_method: { card, billing_details: { name } },
  };
  const paymentResult = await stripe.confirmCardPayment(client_secret, data);
  const { error, paymentIntent } = paymentResult;
  // console.log(paymentResult);
  if (error) {
    console.error(error);
    return false;
  }
  return paymentIntent?.status === "succeeded";
};
