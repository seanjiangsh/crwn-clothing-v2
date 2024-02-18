import { User } from "firebase/auth";

export type UserState = { user: User | null };
export type UserActions = {
  type: "SET_CURRENT_USER";
  payload: UserState["user"];
};
