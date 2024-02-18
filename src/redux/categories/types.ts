import { Category } from "../../types/common";

export type CategoryState = { categories: Array<Category> };

export type CategoryActions = {
  type: "category/SET_CATEGORIES";
  payload: Array<Category>;
};
