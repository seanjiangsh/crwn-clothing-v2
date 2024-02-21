// @ts-nocheck

import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./actions";

function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments, "categories");
    console.log(categories);
    yield put(fetchCategoriesSuccess(categories));
  } catch (err: any) {
    yield put(fetchCategoriesFailed(err.message));
  }
}

function* onFetchCategories() {
  yield takeLatest("category/FETCH_CATEGORIES_START", fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
