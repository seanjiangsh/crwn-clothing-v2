import { User } from "firebase/auth";

import store, { RootState } from "../../root-store";
import { selectUser } from "../selectors";
import { UserState } from "../types";

describe("user selectors", () => {
  const user = { displayName: "John Doe", email: "john@example.com" } as User;
  const userState: UserState = { user, isLoading: false, error: null };
  const initialRootState = store.getState();
  const mockState: RootState = { ...initialRootState, user: userState };

  it("should select the user from the state", () => {
    const selectedUser = selectUser(mockState);
    expect(selectedUser).toEqual(user);
  });
});
