import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { getCategoryByTitle } from "../../../utils/graphql/query/categories";

import Spinner from "../../../components/spinner/Spinner";
import ProductCard from "../../../components/product/card/Product-card";
import { CategoryTitle, CategoryContainer } from "./Category.styles";

export default function Category() {
  const params = useParams();
  const categoryTitle = params.category || "";
  const queryArgs = { variables: { title: categoryTitle } };
  const { loading, data } = useQuery(getCategoryByTitle, queryArgs);

  return loading ? (
    <Spinner />
  ) : data?.getCategoryByTitle ? (
    <React.Fragment>
      <CategoryTitle>{categoryTitle.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {data.getCategoryByTitle.items.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </CategoryContainer>
    </React.Fragment>
  ) : (
    <Navigate to="/shop" />
  );
}
