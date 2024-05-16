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
    <CheckoutContainer data-testid="checkout">
      <CheckoutHeader data-testid="checkout-header">
        <HeaderBlock />
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock />
      </CheckoutHeader>
      {items.map((item) => {
        return <Item key={item.id} {...item} />;
      })}
      <Total data-testid="checkout-total">{`Total: ${totalPrice}`}</Total>
      {items.length ? <PaymentForm /> : null}
    </CheckoutContainer>
  );
}
