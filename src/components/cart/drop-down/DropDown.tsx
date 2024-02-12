import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../../contexts/cart";

import "./DropDown.css";
import Button from "../../button/Button";
import Item from "../item/Item";

export default function DropDown() {
  const navigate = useNavigate();
  const { items } = useContext(CartContext);

  const onClick = () => navigate("/checkout");
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
      <Button onClick={onClick}>GO TO CHECKOUT</Button>
    </div>
  );
}
