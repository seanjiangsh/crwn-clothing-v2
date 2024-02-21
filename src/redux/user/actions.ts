import {
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
  UserActions,
  UserState,
} from "./types";

import { createAction } from "../../utils/reducer/reducer";

export const checkUserSession = () =>
  createAction<UserActions["type"]>("user/CHECK_USER_SESSION");

export const googleSignInStart = () =>
  createAction<UserActions["type"]>("user/GOOGLE_SIGN_IN_START");

export const emailSignInStart = (payload: EmailSignInStart["payload"]) =>
  createAction<UserActions["type"]>("user/EMAIL_SIGN_IN_START", payload);

export const signInSuccess = (payload: UserState) =>
  createAction<UserActions["type"]>("user/SIGN_IN_SUCCESS", payload);

export const signInFailed = (payload: string) =>
  createAction<UserActions["type"]>("user/SIGN_IN_FAILED", payload);

export const signUpStart = (payload: SignUpStart["payload"]) =>
  createAction<UserActions["type"]>("user/SIGN_UP_START", payload);

export const signUpSuccess = (payload: SignUpSuccess["payload"]) =>
  createAction<UserActions["type"]>("user/SIGN_UP_SUCCESS", payload);

export const signUpFailed = (payload: string) =>
  createAction<UserActions["type"]>("user/SIGN_UP_FAILED", payload);

export const signOutStart = () =>
  createAction<UserActions["type"]>("user/SIGN_OUT_START");

export const signOutSuccess = () =>
  createAction<UserActions["type"]>("user/SIGN_OUT_SUCCESS");

export const signOutFailed = (payload: string) =>
  createAction<UserActions["type"]>("user/SIGN_OUT_FAILED", payload);
