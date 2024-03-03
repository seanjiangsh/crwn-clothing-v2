import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "../../../redux/root-hook";
import { selectCartItems } from "../../../redux/cart/selectors";
import { cartActions } from "../../../redux/cart/reducer";

import Button from "../../button/Button";
import Item from "../item/Item";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./DropDown.styles";

export default function DropDown() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCheckout = useCallback(() => {
    navigate("/checkout");
    dispatch(cartActions.setCartOpened());
  }, [navigate, dispatch]);

  return (
    <CartDropdownContainer data-testid="cart-drop-down">
      <CartItems>
        {items.length ? (
          items.map((item) => <Item key={item.id} {...item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
}
