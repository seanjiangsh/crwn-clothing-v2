import { useSelector, useDispatch } from "react-redux";

import { Item as CartItem } from "../../../redux/cart/types";
import { selectCartItems } from "../../../redux/cart/selectors";
import {
  addCartItem,
  removeCartItem,
  clearCartItem,
} from "../../../redux/cart/actions";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./Item.styles";

export default function Item(props: CartItem) {
  const { name, imageUrl, price, quantity } = props;

  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const add = () => dispatch(addCartItem(items, props));
  const remove = () => dispatch(removeCartItem(items, props));
  const clear = () => dispatch(clearCartItem(items, props));

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
