import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../redux/root-hook";
import { selectCartItems } from "../../../redux/cart/selectors";

import Button from "../../button/Button";
import Item from "../item/Item";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./DropDown.styles";

export default function DropDown() {
  const items = useAppSelector(selectCartItems);
  const navigate = useNavigate();

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
