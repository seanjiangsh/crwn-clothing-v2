import { useContext } from "react";

import { ProductContext } from "../../contexts/product";

import "./Shop.css";
import ProductCard from "../../components/product/card/Product-card";

export default function Shop() {
  const { products } = useContext(ProductContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} {...product} />;
      })}
    </div>
  );
}