import React from "react";
import { useQuery } from "@apollo/client";

import { getCategories } from "../../../utils/graphql/query/categories";

import Spinner from "../../../components/spinner/Spinner";
import PreviewComponent from "../../../components/category/preview/Preview";

export default function Preview() {
  const { data } = useQuery(getCategories);

  return (
    <React.Fragment>
      {data ? (
        data.categories.map(({ title, items }) => (
          <PreviewComponent key={title} title={title} products={items} />
        ))
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}
