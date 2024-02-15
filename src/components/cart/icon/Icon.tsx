import { useContext } from "react";

import { CartContext } from "../../../contexts/cart";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./Icon.styles";

export default function Icon() {
  const { opened, setOpened, count } = useContext(CartContext);

  const onClick = () => setOpened(!opened);

  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon />
      <ItemCount>{count}</ItemCount>
    </CartIconContainer>
  );
}
