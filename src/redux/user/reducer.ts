import { Reducer } from "redux";

import { UserState, UserActions } from "./types";

const initialState: UserState = { user: null, isLoading: false, error: null };

export const userReducer: Reducer<UserState, UserActions> = (
  state = initialState,
  action,
) => {
  const { type } = action;
  switch (type) {
    case "user/SIGN_IN_SUCCESS": {
      return { ...state, user: action.payload };
    }
    case "user/SIGN_OUT_SUCCESS": {
      return { ...state, user: null };
    }
    case "user/SIGN_UP_FAILED":
    case "user/SIGN_IN_FAILED":
    case "user/SIGN_OUT_FAILED": {
      return { ...state, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
