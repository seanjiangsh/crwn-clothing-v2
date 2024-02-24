import {
  Action,
  Middleware,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";

import { rootReducer } from "./root-reducer";

const logger = createLogger({ duration: true, collapsed: true });
const middlewares: Array<Middleware> = import.meta.env.DEV ? [logger] : [];

const persistWhitelist = ["cart"];
const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: persistWhitelist },
  rootReducer,
);

const defaultMiddlewareConfig = { serializableCheck: false };
const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (gDM) => gDM(defaultMiddlewareConfig).concat(middlewares),
    preloadedState,
  });
};
const store = setupStore();

export const persister = persistStore(store);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof persistedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
