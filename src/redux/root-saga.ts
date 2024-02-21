import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/saga";
import { userSagas } from "./user/saga";

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}
