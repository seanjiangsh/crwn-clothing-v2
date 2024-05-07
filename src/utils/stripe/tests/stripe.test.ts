import { vi } from "vitest";
import { User } from "firebase/auth";
import { Stripe, StripeCardElement } from "@stripe/stripe-js";

import { createCardPayment } from "../stripe";

// Mocks
const totalPrice = 100;
const user: User | null = null;
const card = {} as StripeCardElement;

describe("Stripe Util createCardPayment", () => {
  it("should process payment successfully", async () => {
    // Mock the client_secret response
    const paymentIntentSpy = vi.spyOn(window, "fetch");
    paymentIntentSpy.mockImplementation(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ client_secret: "client_secret" }),
        }) as any,
    );
    // Mock the Stripe API call
    const paymentResult = { paymentIntent: { status: "succeeded" } };
    const confirmCardPayment = vi.fn(() => Promise.resolve(paymentResult));
    const stripe = { confirmCardPayment } as unknown as Stripe;

    const args = { totalPrice, user, stripe, card };
    const result = await createCardPayment(args);

    expect(result).toEqual(true);
    expect(paymentIntentSpy).toHaveBeenCalledTimes(1);
    expect(paymentIntentSpy).toHaveBeenCalledWith(
      "http://localhost:3000/api/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      },
    );
    expect(confirmCardPayment).toHaveBeenCalledTimes(1);
  });

  it("should return false if client_secret is not returned", async () => {
    // Mock the client_secret response
    const paymentIntentSpy = vi.spyOn(window, "fetch");
    paymentIntentSpy.mockImplementation(
      () => Promise.resolve({ json: () => Promise.resolve({}) }) as any,
    );
    // Mock the Stripe API call
    const paymentResult = { paymentIntent: { status: "failed" } };
    const confirmCardPayment = vi.fn(() => Promise.resolve(paymentResult));
    const stripe = { confirmCardPayment } as unknown as Stripe;

    const args = { totalPrice, user, stripe, card };
    const result = await createCardPayment(args);

    expect(result).toEqual(false);
    expect(paymentIntentSpy).toHaveBeenCalledTimes(1);
    expect(confirmCardPayment).toHaveBeenCalledTimes(0);
  });

  it("should return false and log error if result has error", async () => {
    // Mock the client_secret response
    const paymentIntentSpy = vi.spyOn(window, "fetch");
    paymentIntentSpy.mockImplementation(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ client_secret: "client_secret" }),
        }) as any,
    );
    // Mock the Stripe API call
    const paymentResult = {
      paymentIntent: { status: "failed" },
      error: "test error",
    };
    const confirmCardPayment = vi.fn(() => Promise.resolve(paymentResult));
    const stripe = { confirmCardPayment } as unknown as Stripe;
    // Spy on the console error
    const consoleErrorSpy = vi.spyOn(console, "error");

    const args = { totalPrice, user, stripe, card };
    const result = await createCardPayment(args);

    expect(result).toEqual(false);
    expect(paymentIntentSpy).toHaveBeenCalledTimes(1);
    expect(confirmCardPayment).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});
