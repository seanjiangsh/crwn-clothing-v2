import { useContext } from "react";

import * as cartContext from "../../../contexts/cart";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./Item.styles";

const { CartContext } = cartContext;

export default function Item(props: cartContext.Item) {
  const { name, imageUrl, price, quantity } = props;
  const { addItem, removeItem, clearItem } = useContext(CartContext);

  const add = () => addItem(props);
  const remove = () => removeItem(props);
  const clear = () => clearItem(props);

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
