import { MouseEventHandler } from "react";

import { useDispatch, useSelector } from "../../../redux/root-hook";
import {
  selectCartCount,
  selectCartOpened,
} from "../../../redux/cart/selectors";
import { cartActions } from "../../../redux/cart/reducer";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./Icon.styles";

export default function Icon() {
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const cartOpened = useSelector(selectCartOpened);

  const onClick: MouseEventHandler<HTMLDivElement> = () => {
    if (cartOpened) return;
    dispatch(cartActions.setCartOpened(true));
  };

  return (
    <CartIconContainer data-testid="cart-icon" onClick={onClick}>
      <ShoppingIcon id="cart-icon-svg" />
      <ItemCount data-testid="cart-item-count">{count}</ItemCount>
    </CartIconContainer>
  );
}
