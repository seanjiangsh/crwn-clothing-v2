import "./Product-card.css";
import Button from "../../button/Button";

type ProductCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export default function ProductCard(props: ProductCardProps) {
  const { name, imageUrl, price } = props;

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name} </span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to cart</Button>
    </div>
  );
}
