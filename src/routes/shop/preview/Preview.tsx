import React from "react";
import { useAppSelector } from "../../../redux/root-hook";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../../redux/categories/selectors";

import Spinner from "../../../components/spinner/Spinner";
import PreviewComponent from "../../../components/category/preview/Preview";

export default function Preview() {
  const categories = useAppSelector(selectCategoriesMap);
  const isLoading = useAppSelector(selectCategoriesIsLoading);

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.entries(categories).map(([title, products]) => (
          <PreviewComponent key={title} title={title} products={products} />
        ))
      )}
    </React.Fragment>
  );
}
