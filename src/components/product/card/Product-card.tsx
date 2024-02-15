import { useContext } from "react";

import { CartContext } from "../../../contexts/cart";
import { Product } from "../../../types/common";

import Button from "../../button/Button";
import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./Product-card.styles";

export default function ProductCard(props: Product) {
  const { name, imageUrl, price } = props;
  const { addItem } = useContext(CartContext);

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name} </Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType="inverted" onClick={() => addItem(props)}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
}
