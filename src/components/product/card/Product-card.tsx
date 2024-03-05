import { memo } from "react";
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

const ProductCard = memo((props: Product) => {
  const { name, imageUrl, price } = props;
  const dispatch = useDispatch();
  const add = () => dispatch(cartActions.addCartItem(props));

  return (
    <ProductCardContainer data-testid="product-card">
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
});

export default ProductCard;
