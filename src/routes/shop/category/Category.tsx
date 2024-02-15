import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../../contexts/categories";

import { Product } from "../../../types/common";

import ProductCard from "../../../components/product/card/Product-card";
import { CategoryTitle, CategoryContainer } from "./Category.styles";

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
      <CategoryTitle>{category?.toUpperCase() || ""}</CategoryTitle>
      <CategoryContainer>
        {products && products.map((p) => <ProductCard key={p.id} {...p} />)}
      </CategoryContainer>
    </React.Fragment>
  );
}
