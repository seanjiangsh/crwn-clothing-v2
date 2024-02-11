import * as cartContext from "../../../contexts/cart";

import "./Item.css";

export default function Item(props: cartContext.Item) {
  const { name, imageUrl, price, quantity } = props;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name}></img>
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">{`${quantity} x ${price}`}</span>
      </div>
    </div>
  );
}
