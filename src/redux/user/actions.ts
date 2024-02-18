import { UserActions, UserState } from "./types";

import { createAction } from "../../utils/reducer/reducer";

export const setUser = (user: UserState["user"]) =>
  createAction<UserActions["type"]>("user/SET_CURRENT_USER", user);
