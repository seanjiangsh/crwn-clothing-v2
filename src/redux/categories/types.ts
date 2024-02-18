import { CategoryMap } from "../../types/common";

export type CategoryState = { categories: CategoryMap };

export type CategoryActions = {
  type: "SET_CATEGORIES";
  payload: CategoryMap;
};
