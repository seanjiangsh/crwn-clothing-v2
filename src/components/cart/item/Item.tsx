import { FC, memo } from "react";
import { Item as CartItem } from "../../../redux/cart/types";

import { CartItemContainer, ItemDetails, ItemText } from "./Item.styles";

const Item: FC<CartItem> = memo((props) => {
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
});

export default Item;
