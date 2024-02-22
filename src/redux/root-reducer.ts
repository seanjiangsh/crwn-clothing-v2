import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/reducer";
import { categoryReducer } from "./categories/reducer";
import { cartReducer } from "./cart/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  cart: cartReducer,
});
