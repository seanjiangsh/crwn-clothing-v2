import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/reducer";
import { cartReducer } from "./cart/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
