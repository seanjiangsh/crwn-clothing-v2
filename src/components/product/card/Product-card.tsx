import { useContext } from "react";

import { CartContext } from "../../../contexts/cart";
import { Product } from "../../../types/common";

import "./Product-card.css";
import Button from "../../button/Button";

export default function ProductCard(props: Product) {
  const { name, imageUrl, price } = props;
  const { addItem } = useContext(CartContext);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name} </span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={() => addItem(props)}>
        Add to cart
      </Button>
    </div>
  );
}
