import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCategoriesMap } from "../../../redux/categories/selectors";

import { Product } from "../../../types/common";

import ProductCard from "../../../components/product/card/Product-card";
import { CategoryTitle, CategoryContainer } from "./Category.styles";

export default function Category() {
  const { category } = useParams();
  const categories = useSelector(selectCategoriesMap);

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
