import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../root-store";

const selectUserReducer = (state: RootState) => state.user;

export const selectUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.user,
);
