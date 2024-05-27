import { vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../../utils/tests/utils-for-tests";
import PaymentForm from "../Payment-form";
import * as stripeUtils from "../../../utils/stripe/stripe";

const mockElement = () => ({
  mount: vi.fn(),
  destroy: vi.fn(),
  on: vi.fn(),
  update: vi.fn(),
});

const mockElements = {
  create: () => mockElement(),
  getElement: () => mockElement(),
};

const mockStripe = () => ({
  elements: vi.fn(() => mockElements),
  createToken: vi.fn(),
  createSource: vi.fn(),
  createPaymentMethod: vi.fn(),
  confirmCardPayment: vi.fn(),
  confirmCardSetup: vi.fn(),
  paymentRequest: vi.fn(),
  _registerWrapper: vi.fn(),
});

vi.mock("@stripe/react-stripe-js", async () => {
  const stripe = await vi.importActual("@stripe/react-stripe-js");
  return {
    ...stripe,
    Element: () => mockElement,
    useStripe: () => mockStripe,
    useElements: () => mockElements,
  };
});

describe("PaymentForm component with Stripe getElement mock", () => {
  const user = userEvent.setup();

  test("displays failure message when stripe did not setup", async () => {
    const mockCreateCardPayment = vi.spyOn(stripeUtils, "createCardPayment");
    mockCreateCardPayment.mockImplementation(() => Promise.resolve(false));

    renderWithProviders(<PaymentForm />);
    const payButton = screen.getByText("Pay now");
    await user.click(payButton);

    const alertTitle = screen.getByText("Payment failed, please try again!");
    expect(alertTitle).toBeInTheDocument();
  });

  test("cart cleared after successful payment and dialog closing", async () => {
    const mockCreateCardPayment = vi.spyOn(stripeUtils, "createCardPayment");
    mockCreateCardPayment.mockImplementation(() => Promise.resolve(true));

    const { store } = renderWithProviders(<PaymentForm />);

    const payButton = screen.getByText("Pay now");
    await user.click(payButton);

    const alertTitle = screen.getByText(
      "Thank you for using crwn-clothing app!",
    );
    expect(alertTitle).toBeInTheDocument();

    const backdrop = document.querySelector(".MuiModal-backdrop");
    expect(backdrop).toBeInTheDocument();

    await user.click(backdrop!);
    expect(store.getState().cart.items).toHaveLength(0);
  });
});
