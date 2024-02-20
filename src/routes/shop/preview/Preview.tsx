import React from "react";
import { useSelector } from "react-redux";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../../redux/categories/selectors";

import Spinner from "../../../components/spinner/Spinner";
import PreviewComponent from "../../../components/category/preview/Preview";

export default function Preview() {
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

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
