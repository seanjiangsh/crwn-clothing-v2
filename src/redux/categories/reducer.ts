import { createSlice } from "@reduxjs/toolkit";

import * as types from "./types";

const initialState: types.CategoryState = {
  categories: [],
  isLoading: false,
  fetchCategoriesError: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action: types.SetCategoriesAction) {
      state.categories = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
