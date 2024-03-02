import React from "react";
import { RenderOptions, render } from "@testing-library/react";

import { Provider } from "react-redux";

import { AppStore, RootState, setupStore } from "../../redux/root-store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: RootState;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {} as RootState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: React.PropsWithChildren<any>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
