import { createSelector } from "reselect";

import { RootState } from "../store";

const selectUserReducer = (state: RootState) => state.user;

export const selectUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.user,
);
