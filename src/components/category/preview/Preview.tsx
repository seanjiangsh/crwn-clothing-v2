import { Link } from "react-router-dom";

import { Product } from "../../../types/common";
import ProductCard from "../../product/card/Product-card";
import "./Preview.css";

type PreviewProps = { title: string; products: Array<Product> };
export default function Preview(props: PreviewProps) {
  const { title, products } = props;

  return (
    <div className="category-preview-container">
      <h2 className="title">
        <Link to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, i) => i < 4)
          .map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
      </div>
    </div>
  );
}
