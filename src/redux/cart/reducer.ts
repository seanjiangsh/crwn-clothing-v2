import { Reducer } from "redux";

import { CartState, CartActions } from "./types";

const initialState: CartState = { opened: false, items: [] };

export const cartReducer: Reducer<CartState, CartActions> = (
  state = initialState,
  action,
) => {
  const { type } = action;
  switch (type) {
    case "cart/SET_OPENED": {
      return { ...state, opened: !state.opened };
    }
    case "cart/SET_CART_ITEMS": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
