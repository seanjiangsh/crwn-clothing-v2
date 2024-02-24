import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export type UserState = {
  readonly user: User | null;
  readonly isLoading: boolean;
  readonly error: null | string;
};

export type SetCurrentUserAction = PayloadAction<User | null>;
