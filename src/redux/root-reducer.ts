import { combineReducers } from "redux";

import { userReducer } from "./user/reducer";
import { categoryReducer } from "./categories/reducer";
import { cartReducer } from "./cart/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  cart: cartReducer,
});
