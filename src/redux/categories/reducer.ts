import { Reducer } from "redux";
import { CategoryActions, CategoryState } from "./types";

const initialState: CategoryState = {
  categories: [],
};

export const categoryReducer: Reducer<CategoryState, CategoryActions> = (
  state = initialState,
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case "category/SET_CATEGORIES":
      return { ...state, categories: payload };
    default:
      return state;
  }
};
