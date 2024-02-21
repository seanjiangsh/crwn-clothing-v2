import { Category } from "../../types/common";

export type CategoryState = {
  categories: Array<Category>;
  isLoading: boolean;
  fetchCategoriesError: null | string;
};

type FetchCategoriesStartAction = { type: "category/FETCH_CATEGORIES_START" };
type FetchCategoriesSuccessAction = {
  type: "category/FETCH_CATEGORIES_SUCCESS";
  payload: Array<Category>;
};
type FetchCategoriesFailedAction = {
  type: "category/FETCH_CATEGORIES_FAILED";
  payload: CategoryState["fetchCategoriesError"];
};
export type CategoryActions =
  | FetchCategoriesStartAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailedAction;
