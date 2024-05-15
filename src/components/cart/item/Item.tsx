import { FC, memo } from "react";
import LazyLoad from "react-lazyload";

import { Item as CartItem } from "../../../redux/cart/types";

import { CartItemContainer, ItemDetails, ItemText } from "./Item.styles";

const Item: FC<CartItem> = memo((props) => {
  const { name, imageUrl, price, quantity } = props;

  return (
    <CartItemContainer>
      <LazyLoad overflow once offset={100}>
        <img src={imageUrl} alt={name} />
      </LazyLoad>
      <ItemDetails>
        <ItemText>{name}</ItemText>
        <ItemText>{`${quantity} x ${price}`}</ItemText>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default Item;
