import { Reducer } from "redux";
import { CategoryActions, CategoryState } from "./types";

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  fetchCategoriesError: null,
};

export const categoryReducer: Reducer<CategoryState, CategoryActions> = (
  state = initialState,
  action,
) => {
  const { type } = action;
  switch (type) {
    case "category/FETCH_CATEGORIES_START": {
      return { ...state, isLoading: true, categories: [] };
    }
    case "category/FETCH_CATEGORIES_SUCCESS": {
      const { payload } = action;
      return { ...state, isLoading: false, categories: payload };
    }
    case "category/FETCH_CATEGORIES_FAILED": {
      const { payload } = action;
      return { ...state, isLoading: false, fetchCategoriesError: payload };
    }
    default:
      return state;
  }
};
