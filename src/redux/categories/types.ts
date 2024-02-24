import { PayloadAction } from "@reduxjs/toolkit";

import { Category } from "../../types/common";

export type CategoryState = {
  readonly categories: Array<Category>;
  readonly isLoading: boolean;
  readonly fetchCategoriesError: null | string;
};

export type SetCategoriesAction = PayloadAction<Array<Category>>;
