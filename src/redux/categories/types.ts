import { Category } from "../../types/common";

export type CategoryState = {
  categories: Array<Category>;
  isLoading: boolean;
  fetchCategoriesError: null | string;
};

type fetchCategoriesStartAction = { type: "category/FETCH_CATEGORIES_START" };
type fetchCategoriesSuccessAction = {
  type: "category/FETCH_CATEGORIES_SUCCESS";
  payload: Array<Category>;
};
type fetchCategoriesFailedAction = {
  type: "category/FETCH_CATEGORIES_FAILED";
  payload: CategoryState["fetchCategoriesError"];
};
export type CategoryActions =
  | fetchCategoriesStartAction
  | fetchCategoriesSuccessAction
  | fetchCategoriesFailedAction;
