import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../../contexts/categories";

import { Product } from "../../../types/common";

import "./Category.css";
import ProductCard from "../../../components/product/card/Product-card";

export default function Category() {
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    if (!category) return;
    const products = categories?.[category] || [];
    setProducts(products);
  }, [categories, category]);

  return (
    <React.Fragment>
      <h2 className="category-title">{category?.toUpperCase() || ""}</h2>
      <div className="category-container">
        {products && products.map((p) => <ProductCard key={p.id} {...p} />)}
      </div>
    </React.Fragment>
  );
}
