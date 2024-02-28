import { useDispatch } from "../../../redux/root-hook";
import { cartActions } from "../../../redux/cart/reducer";

import { Product } from "../../../types/common";

import Button from "../../button/Button";
import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./Product-card.styles";

export default function ProductCard(product: Product) {
  const { name, imageUrl, price } = product;

  const dispatch = useDispatch();

  const add = () => dispatch(cartActions.addCartItem(product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name} </Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType="inverted" onClick={add}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
}
