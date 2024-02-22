import { useAppDispatch } from "../../../redux/root-hook";
import { cartActions } from "../../../redux/cart/reducer";

import { Item as CartItem } from "../../../redux/cart/types";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./Item.styles";

export default function Item(cartItem: CartItem) {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useAppDispatch();

  const add = () => dispatch(cartActions.addCartItem(cartItem));
  const remove = () => dispatch(cartActions.removeCartItem(cartItem));
  const clear = () => dispatch(cartActions.clearCartItem(cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer src={imageUrl} alt={name} />
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={remove}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={add}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{`${price}`}</BaseSpan>
      <RemoveButton onClick={clear}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}
