import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useSelector } from "../../redux/root-hook";
import { selectUser } from "../../redux/user/selectors";
import { selectCartTotalPrice } from "../../redux/cart/selectors";
import { createCardPayment } from "../../utils/stripe/stripe";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
  TestDescription,
} from "./Payment-form.style";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const user = useSelector(selectUser);
  const totalPrice = useSelector(selectCartTotalPrice);

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
        <TestDescription>
          <p>*Please use the following test credit card for payments*</p>
          <p>4242 4242 4242 4242 - (future date) - 242 - 42424</p>
        </TestDescription>
      </FormContainer>
    </PaymentFormContainer>
  );
}
