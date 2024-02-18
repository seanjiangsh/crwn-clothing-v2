import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../../../redux/cart/selectors";
import { addCartItem } from "../../../redux/cart/actions";

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

  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const add = () => dispatch(addCartItem(items, props));

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
