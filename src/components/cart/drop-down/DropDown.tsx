import { useContext } from "react";

import { CartContext } from "../../../contexts/cart";

import "./DropDown.css";
import Button from "../../button/Button";
import Item from "../item/Item";

export default function DropDown() {
  const { items } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-itms">
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}
