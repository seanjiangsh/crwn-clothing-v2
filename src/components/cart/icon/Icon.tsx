import { useContext } from "react";

import { CartContext } from "../../../contexts/cart";

import "./Icon.css";
import { ReactComponent as ShoppingIcon } from "../../../assets/shopping-bag.svg";

export default function Icon() {
  const { opened, setOpened, count } = useContext(CartContext);

  const onClick = () => setOpened(!opened);

  return (
    <div className="cart-icon-container" onClick={onClick}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{count}</span>
    </div>
  );
}
