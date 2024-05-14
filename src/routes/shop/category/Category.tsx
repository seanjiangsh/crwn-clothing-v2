import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { getCategoryByTitle } from "../../../utils/graphql/query/categories";
import { getImageUrl } from "../../../utils/misc/misc";

import Spinner from "../../../components/spinner/Spinner";
import ProductCard from "../../../components/product/card/Product-card";
import { CategoryTitle, CategoryContainer } from "./Category.styles";

export default function Category() {
  const params = useParams();
  const categoryTitle = params.category || "";
  const queryArgs = { variables: { title: categoryTitle } };
  const { loading, data } = useQuery(getCategoryByTitle, queryArgs);

  const productCards = data?.getCategoryByTitle?.items.map((p) => {
    const imageUrl = getImageUrl(categoryTitle, p.id);
    const props = { ...p, imageUrl };
    return <ProductCard key={p.id} {...props} />;
  });

  return loading ? (
    <Spinner />
  ) : data?.getCategoryByTitle ? (
    <React.Fragment>
      <CategoryTitle>{categoryTitle.toUpperCase()}</CategoryTitle>
      <CategoryContainer>{productCards}</CategoryContainer>
    </React.Fragment>
  ) : (
    <Navigate to="/shop" />
  );
}
