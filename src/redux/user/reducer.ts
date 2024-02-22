import { createSlice } from "@reduxjs/toolkit";

import * as types from "./types";

const initialState: types.UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: types.SetCurrentUserAction) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
