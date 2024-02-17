import { useContext } from "react";

import { CartContext } from "../../../contexts/cart";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./Icon.styles";

export default function Icon() {
  const { cartState, setOpened } = useContext(CartContext);
  const { opened, count } = cartState;

  const onClick = () => setOpened(!opened);

  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon />
      <ItemCount>{count}</ItemCount>
    </CartIconContainer>
  );
}
