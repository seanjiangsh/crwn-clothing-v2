import { CategoryActions } from "./types";

import { Category } from "../../types/common";
import { createAction } from "../../utils/reducer/reducer";

export const setCategories = (categories: Array<Category>) =>
  createAction<CategoryActions["type"]>("category/SET_CATEGORIES", categories);
