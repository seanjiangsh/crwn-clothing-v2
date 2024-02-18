import { Reducer } from "redux";

import { UserState, UserActions } from "./types";

const initialState: UserState = { user: null };

export const userReducer: Reducer<UserState, UserActions> = (
  state = initialState,
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, user: payload };
    default:
      return state;
  }
};
