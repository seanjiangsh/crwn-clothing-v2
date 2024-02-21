import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares: Array<any> = [sagaMiddleware];
if (import.meta.env.DEV) middlewares.push(logger);

const composeEnhancer =
  (!import.meta.env.PROD &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// * tmp fix
const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: ["cart"] },
  rootReducer as any,
) as unknown as typeof rootReducer;

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
