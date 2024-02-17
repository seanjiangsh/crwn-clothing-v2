import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../../contexts/cart";

import Button from "../../button/Button";
import Item from "../item/Item";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./DropDown.styles";

export default function DropDown() {
  const navigate = useNavigate();
  const { cartState } = useContext(CartContext);
  const { items } = cartState;

  const onClick = () => navigate("/checkout");

  return (
    <CartDropdownContainer>
      <CartItems>
        {items.length ? (
          items.map((item) => <Item key={item.id} {...item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={onClick}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
}
