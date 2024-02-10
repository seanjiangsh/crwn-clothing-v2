import "./Item.css";

type ItemProps = { name: string; quantity: number };

export default function Item(props: ItemProps) {
  const { name, quantity } = props;

  return (
    <div className="cart-icon-container">
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  );
}
