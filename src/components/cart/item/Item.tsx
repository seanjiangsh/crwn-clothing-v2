import * as cartContext from "../../../contexts/cart";

import { CartItemContainer, ItemDetails, ItemText } from "./Item.styles";

export default function Item(props: cartContext.Item) {
  const { name, imageUrl, price, quantity } = props;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <ItemText>{name}</ItemText>
        <ItemText>{`${quantity} x ${price}`}</ItemText>
      </ItemDetails>
    </CartItemContainer>
  );
}
