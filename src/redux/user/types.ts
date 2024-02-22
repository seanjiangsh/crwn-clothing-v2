import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: null | string;
};

export type SetCurrentUserAction = PayloadAction<User | null>;
