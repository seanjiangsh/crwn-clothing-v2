import { createSelector } from "reselect";

import { RootState } from "../store";
import { CategoryMap } from "../../types/common";

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories,
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    const categoryMap = categories.reduce<CategoryMap>(
      (p, { title, items }) => {
        p[title.toLowerCase()] = items;
        return p;
      },
      {},
    );
    return categoryMap;
  },
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading,
);
