import { useDispatch, useSelector } from "../../../redux/root-hook";
import { selectCartCount } from "../../../redux/cart/selectors";
import { cartActions } from "../../../redux/cart/reducer";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./Icon.styles";

export default function Icon() {
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const onClick = () => dispatch(cartActions.setCartOpened());

  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon />
      <ItemCount>{count}</ItemCount>
    </CartIconContainer>
  );
}
