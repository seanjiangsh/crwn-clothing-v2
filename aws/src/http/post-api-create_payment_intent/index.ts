import arc, { HttpAsyncHandler } from "@architect/functions";
import Stripe from "stripe";

const handler: HttpAsyncHandler = async (req) => {
  const { STRIPE_SECRET_KEY } = process.env;
  if (!STRIPE_SECRET_KEY) {
    console.error("cannot find STRIPE_SECRET_KEY");
    const body = { error: "Internal Server Error" };
    return { status: 500, body: JSON.stringify(body) };
  }

  try {
    const { amount } = req.body || {};
    if (!amount) {
      const body = { error: "Bad Request" };
      return { status: 400, body: JSON.stringify(body) };
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const createParams: Stripe.PaymentIntentCreateParams = {
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    };
    const paymentIntents = await stripe.paymentIntents.create(createParams);
    return { status: 200, body: JSON.stringify(paymentIntents) };
  } catch (err) {
    console.log({ err });
    const body = { error: "Internal Server Error" };
    return { status: 500, body: JSON.stringify(body) };
  }
};

exports.handler = arc.http(handler);
