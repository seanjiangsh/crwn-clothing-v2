import { User } from "firebase/auth";

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: null | string;
};

export type CheckUserSession = { type: "user/CHECK_USER_SESSION" };
export type GoogleSignInStart = { type: "user/GOOGLE_SIGN_IN_START" };
export type EmailSignInStart = {
  type: "user/EMAIL_SIGN_IN_START";
  payload: { email: string; password: string };
};
export type SignInSuccess = {
  type: "user/SIGN_IN_SUCCESS";
  payload: UserState["user"];
};
export type SignInFailed = { type: "user/SIGN_IN_FAILED"; payload: string };
export type SignUpStart = {
  type: "user/SIGN_UP_START";
  payload: { email: string; password: string; displayName: string };
};
export type SignUpSuccess = {
  type: "user/SIGN_UP_SUCCESS";
  payload: { user: User; displayName: string };
};
export type SignUpFailed = { type: "user/SIGN_UP_FAILED"; payload: string };
export type SignOutStart = { type: "user/SIGN_OUT_START" };
export type SignOutSuccess = { type: "user/SIGN_OUT_SUCCESS" };
export type SignOutFailed = { type: "user/SIGN_OUT_FAILED"; payload: string };
export type UserActions =
  | CheckUserSession
  | GoogleSignInStart
  | EmailSignInStart
  | SignInSuccess
  | SignInFailed
  | SignUpStart
  | SignUpSuccess
  | SignUpFailed
  | SignOutStart
  | SignOutSuccess
  | SignOutFailed;
