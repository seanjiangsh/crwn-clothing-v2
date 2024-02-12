import { useContext } from "react";

import { CartContext } from "../../contexts/cart";

import "./Checkout.css";
import Item from "../../components/checkout/item/Item";

export default function Checkout() {
  const { items, totalPrice } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Prouct</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {items.map((item) => {
        return <Item key={item.id} {...item} />;
      })}
      <div className="total">{`Total: ${totalPrice}`}</div>
    </div>
  );
}
