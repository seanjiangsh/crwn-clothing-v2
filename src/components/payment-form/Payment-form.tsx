import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useAppSelector } from "../../redux/root-hook";
import { selectUser } from "../../redux/user/selectors";
import { selectCartTotalPrice } from "../../redux/cart/selectors";
import { createCardPayment } from "../../utils/stripe/stripe";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./Payment-form.style";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const user = useAppSelector(selectUser);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const [isProcessing, setIsProcessing] = useState(false);

  const onPayment: React.FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);
    const args = { totalPrice, user, stripe, card };
    const result = await createCardPayment(args);
    const msg = result ? "Payment successful" : "Payment failed";
    alert(msg);
    setIsProcessing(false);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={onPayment}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton buttonType="inverted" isLoading={isProcessing}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
}
