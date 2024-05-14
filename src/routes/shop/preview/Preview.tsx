import React from "react";
import { useQuery } from "@apollo/client";

import { getCategories } from "../../../utils/graphql/query/categories";

import Spinner from "../../../components/spinner/Spinner";
import PreviewComponent from "../../../components/category/preview/Preview";
import { getImageUrl } from "../../../utils/misc/misc";

export default function Preview() {
  const { data } = useQuery(getCategories);

  const previewComponents = data?.categories.map(({ title, items }) => {
    const products = items.map((p) => ({
      ...p,
      imageUrl: getImageUrl(title, p.id),
    }));
    const props = { key: title, title, products };
    return <PreviewComponent {...props} />;
  });

  return (
    <div data-testid="shop-preview">
      {data ? previewComponents : <Spinner />}
    </div>
  );
}
