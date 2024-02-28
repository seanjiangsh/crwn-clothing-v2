import { useSelector } from "../../redux/root-hook";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/selectors";

import Item from "../../components/checkout/item/Item";
import PaymentForm from "../../components/payment-form/Payment-form";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./Checkout.styles";

export default function Checkout() {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Prouct</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {items.map((item) => {
        return <Item key={item.id} {...item} />;
      })}
      <Total>{`Total: ${totalPrice}`}</Total>
      <PaymentForm />
    </CheckoutContainer>
  );
}
