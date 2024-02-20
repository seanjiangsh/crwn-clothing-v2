import { Dispatch } from "redux";

import { Category } from "../../types/common";
import { createAction } from "../../utils/reducer/reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

import { CategoryActions } from "./types";

export const fetchCategoriesStart = () =>
  createAction<CategoryActions["type"]>("category/FETCH_CATEGORIES_START");

export const fetchCategoriesSuccess = (categories: Array<Category>) =>
  createAction<CategoryActions["type"]>(
    "category/FETCH_CATEGORIES_SUCCESS",
    categories,
  );

export const fetchCategoriesFailed = (msg: string) =>
  createAction<CategoryActions["type"]>(
    "category/FETCH_CATEGORIES_FAILED",
    msg,
  );

export const fetchCategoriesAsync = (): any => async (dispatch: Dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (err: any) {
    dispatch(fetchCategoriesFailed(err.message));
  }
};
