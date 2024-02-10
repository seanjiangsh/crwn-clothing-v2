import "./DropDown.css";
import Button from "../../button/Button";

export default function DropDown() {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-itms"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}
