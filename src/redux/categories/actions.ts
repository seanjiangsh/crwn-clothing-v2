import { CategoryActions } from "./types";

import { CategoryMap } from "../../types/common";
import { createAction } from "../../utils/reducer/reducer";

export const setCategories = (categories: CategoryMap) =>
  createAction<CategoryActions["type"]>("SET_CATEGORIES", categories);
