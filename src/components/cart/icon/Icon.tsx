import { useSelector, useDispatch } from "react-redux";

import { selectCart } from "../../../redux/cart/selectors";
import { setCartOpened } from "../../../redux/cart/actions";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./Icon.styles";

export default function Icon() {
  const { count } = useSelector(selectCart);
  const dispatch = useDispatch();

  const onClick = () => dispatch(setCartOpened());

  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon />
      <ItemCount>{count}</ItemCount>
    </CartIconContainer>
  );
}
