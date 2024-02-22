import { PayloadAction } from "@reduxjs/toolkit";

import { Category } from "../../types/common";

export type CategoryState = {
  categories: Array<Category>;
  isLoading: boolean;
  fetchCategoriesError: null | string;
};

export type SetCategoriesAction = PayloadAction<Array<Category>>;
