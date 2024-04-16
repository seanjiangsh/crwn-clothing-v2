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

export const logger = createLogger({ duration: true, collapsed: true });

export const getMiddleware = (isDev: boolean) => {
  const middlewares: Array<Middleware> = isDev ? [logger] : [];
  return middlewares;
};
const middlewares = getMiddleware(import.meta.env.DEV);

const persistWhitelist = ["cart"];
const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: persistWhitelist },
  rootReducer,
) as unknown as typeof rootReducer;

const defaultMiddlewareConfig = { serializableCheck: false };
export const setupStore = (preloadedState?: Partial<RootState>) => {
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
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
