import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import { useDispatch, useSelector } from "../../redux/root-hook";
import { selectUser } from "../../redux/user/selectors";
import { selectCartTotalPrice } from "../../redux/cart/selectors";
import { cartActions } from "../../redux/cart/reducer";
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

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const totalPrice = useSelector(selectCartTotalPrice);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogTitle = paymentSuccess ? "Payment successful" : "Payment failed";
  const dialogMsg = paymentSuccess
    ? "Thank you for using crwn-clothing app!"
    : "Payment failed, please try again!";

  const onPayment: React.FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);
    const args = { totalPrice, user, stripe, card };
    const result = await createCardPayment(args);
    setPaymentSuccess(result);
    setDialogOpen(true);
    setIsProcessing(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    if (paymentSuccess) dispatch(cartActions.clearCart());
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
      <Dialog
        fullWidth
        data-testid="payment-dialog"
        open={dialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>{dialogTitle}</DialogTitle>
        <DialogContent dividers sx={{ p: 5, pl: 2 }}>
          {dialogMsg}
        </DialogContent>
      </Dialog>
    </PaymentFormContainer>
  );
}
