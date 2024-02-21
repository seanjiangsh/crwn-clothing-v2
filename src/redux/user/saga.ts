// @ts-nocheck

import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase";

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutFailed,
  signOutSuccess,
} from "./actions";

function* getSnapshotFromUserAuth(user, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      user,
      additionalInfo,
    );
    const { id } = userSnapshot;
    yield put(signInSuccess({ id, ...userSnapshot.data() }));
  } catch (err: any) {
    yield put(signInFailed(err.message));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (err: any) {
    yield put(signInFailed(err.message));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password,
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (err: any) {
    yield put(signInFailed(err.message));
  }
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password,
    );
    yield put(signUpSuccess({ user, displayName }));
  } catch (err: any) {
    yield put(signUpFailed(err.message));
  }
}

function* signInAfterSignUp({ payload: { user, displayName } }) {
  try {
    yield call(createUserDocumentFromAuth, user, { displayName });
    yield call(getSnapshotFromUserAuth, user, displayName);
  } catch (err: any) {
    yield put(signUpFailed(err.message));
  }
}

function* signOutStart() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (err: any) {
    yield put(signOutFailed(err.message));
  }
}

function* isUserAuthenticated() {
  try {
    const user = yield call(getCurrentUser);
    if (!user) return;
    yield call(getSnapshotFromUserAuth, user);
  } catch (err: any) {
    yield put(signInFailed(err.message));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest("user/GOOGLE_SIGN_IN_START", signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest("user/EMAIL_SIGN_IN_START", signInWithEmail);
}

function* onSignUpStart() {
  yield takeLatest("user/SIGN_UP_START", signUp);
}

function* onSignUpSuccess() {
  yield takeLatest("user/SIGN_UP_SUCCESS", signInAfterSignUp);
}

function* onSignOutStart() {
  yield takeLatest("user/SIGN_OUT_START", signOutStart);
}

function* onCheckUserSession() {
  yield takeLatest("user/CHECK_USER_SESSION", isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
    call(onSignUpSuccess),
  ]);
}
