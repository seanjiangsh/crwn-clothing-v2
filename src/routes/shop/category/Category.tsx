import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/root-hook";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { gql } from "../../../utils/graphql";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../../redux/categories/selectors";

import { Product } from "../../../types/common";

import Spinner from "../../../components/spinner/Spinner";
import ProductCard from "../../../components/product/card/Product-card";
import { CategoryTitle, CategoryContainer } from "./Category.styles";

const CATEGORIES = gql(/* GraphQL */ `
  query GetCategories {
    categories {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`);

export default function Category() {
  const { category } = useParams();
  const { loading, error, data } = useQuery(CATEGORIES);
  console.log(loading, error, data);
  const categories = useAppSelector(selectCategoriesMap);
  const isLoading = useAppSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    if (!category) return;
    const products = categories?.[category] || [];
    setProducts(products);
  }, [categories, category]);

  return (
    <React.Fragment>
      <CategoryTitle>{category?.toUpperCase() || ""}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products && products.map((p) => <ProductCard key={p.id} {...p} />)}
        </CategoryContainer>
      )}
    </React.Fragment>
  );
}
