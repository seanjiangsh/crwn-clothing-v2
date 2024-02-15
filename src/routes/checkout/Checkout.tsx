import { useContext } from "react";

import { CartContext } from "../../contexts/cart";

import Item from "../../components/checkout/item/Item";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./Checkout.styles";

export default function Checkout() {
  const { items, totalPrice } = useContext(CartContext);

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
    </CheckoutContainer>
  );
}
