import { Item as CartItem } from "../../../redux/cart/types";

import { CartItemContainer, ItemDetails, ItemText } from "./Item.styles";

export default function Item(props: CartItem) {
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
