import type { Context } from "@netlify/functions";
import Stripe from "stripe";

export default async (req: Request, context: Context) => {
  const secretKey = Netlify.env.get("STRIPE_SECRET_KEY");
  if (!secretKey) {
    console.error("cannot find STRIPE_SECRET_KEY");
    const body = { error: "Internal server error" };
    return new Response(JSON.stringify(body), { status: 500 });
  }
  try {
    const { amount } = await req.json();
    const stripe = new Stripe(secretKey);
    const createParams: Stripe.PaymentIntentCreateParams = {
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    };
    const paymentIntents = await stripe.paymentIntents.create(createParams);
    return new Response(JSON.stringify(paymentIntents), { status: 200 });
  } catch (err) {
    console.log({ err });
    const body = { error: "Internal server error" };
    return new Response(JSON.stringify(body), { status: 500 });
  }
};

// import "dotenv/config";
// import Stripe from "stripe";

// export const handler = async (ev: any) => {
//   const secretKey = process.env.STRIPE_SECRET_KEY;
//   if (!secretKey) {
//     console.error("cannot find STRIPE_SECRET_KEY");
//     return;
//   }
//   const stripe = new Stripe(secretKey);
//   try {
//     const { amount } = JSON.parse(ev.body);
//     const createParams: Stripe.PaymentIntentCreateParams = {
//       amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//     };
//     const paymentIntents = await stripe.paymentIntents.create(createParams);
//     return { statusCode: 200, body: JSON.stringify({ paymentIntents }) };
//   } catch (err) {
//     console.log({ err });
//     return { status: 400, body: JSON.stringify({ err }) };
//   }
// };
