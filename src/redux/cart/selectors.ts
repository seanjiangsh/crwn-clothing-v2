import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../root-store";

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartOpened = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.opened,
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.items,
);

export const selectCartCount = createSelector(
  [selectCartReducer],
  ({ items }) => items.reduce((p, { quantity }) => p + quantity, 0),
);

export const selectCartTotalPrice = createSelector(
  [selectCartReducer],
  ({ items }) => items.reduce((p, c) => p + c.quantity * c.price, 0),
);
