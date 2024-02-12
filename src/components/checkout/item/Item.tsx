import { useContext } from "react";

import * as cartContext from "../../../contexts/cart";

import "./Item.css";

const { CartContext } = cartContext;

export default function Item(props: cartContext.Item) {
  const { name, imageUrl, price, quantity } = props;
  const { addItem, substractItem, removeItem } = useContext(CartContext);

  const add = () => addItem(props);
  const substract = () => substractItem(props);
  const remove = () => removeItem(props);

  return (
    <div className="checkout-item-container">
      <img className="image-container" src={imageUrl} alt={name} />
      <span className="name">{name}</span>
      <span className="quantity">
        <b className="arrow" onClick={substract}>
          -
        </b>
        <span className="value">{quantity}</span>
        <b className="arrow" onClick={add}>
          +
        </b>
      </span>
      <span className="price">{`${price}`}</span>
      <h3 className="remove-button" onClick={remove}>
        X
      </h3>
    </div>
  );
}
