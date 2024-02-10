import { useContext } from "react";

import { CartContext } from "../../../contexts/cart";

import "./Icon.css";
import { ReactComponent as ShoppingIcon } from "../../../assets/shopping-bag.svg";

export default function Icon() {
  const { cartState, setCartState } = useContext(CartContext);
  const { opened } = cartState;

  const onClick = () => setCartState({ opened: !opened });

  return (
    <div className="cart-icon-container" onClick={onClick}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}
