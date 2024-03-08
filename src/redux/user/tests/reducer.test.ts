import { User } from "firebase/auth";

import { userReducer, userActions } from "../reducer";
import * as types from "../types";

describe("user reducer", () => {
  it("should set the user", () => {
    const initialState: types.UserState = {
      user: null,
      isLoading: false,
      error: null,
    };
    const user = { displayName: "John Doe" } as User;
    const action = userActions.setCurrentUser(user);
    const newState = userReducer(initialState, action);
    expect(newState.user).toEqual(user);
  });

  it("should clear the user", () => {
    const user = { displayName: "John Doe" } as User;
    const initialState: types.UserState = {
      user,
      isLoading: false,
      error: null,
    };
    const action = userActions.setCurrentUser(null);
    const newState = userReducer(initialState, action);
    expect(newState.user).toBeNull();
  });
});
