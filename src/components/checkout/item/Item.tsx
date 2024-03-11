import { useDispatch } from "../../../redux/root-hook";
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
  const { id, name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();

  const add = () => dispatch(cartActions.addCartItem(cartItem));
  const remove = () => dispatch(cartActions.removeCartItem(cartItem));
  const clear = () => dispatch(cartActions.clearCartItem(cartItem));

  return (
    <CheckoutItemContainer data-testid={`checkout-item-container-${id}`}>
      <ImageContainer src={imageUrl} alt={name} />
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow data-testid="remove" onClick={remove}>
          &#10094;
        </Arrow>
        <Value data-testid="quantity">{quantity}</Value>
        <Arrow data-testid="add" onClick={add}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan data-testid="price">{`${price}`}</BaseSpan>
      <RemoveButton data-testid="clear" onClick={clear}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
}
