import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const middlewares = import.meta.env.DEV ? [logger] : [];

const composeEnhancer =
  (!import.meta.env.PROD &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(
  { key: "root", storage, blacklist: ["user"] },
  rootReducer as any, // tmp fix
);

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
