import React from "react";
import { RenderOptions, render } from "@testing-library/react";

import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { StyleSheetManager } from "styled-components";

import { Provider } from "react-redux";

import {
  AppStore,
  RootState,
  persister,
  setupStore,
} from "../../redux/root-store";
import { apolloClient } from "../graphql/apollo/apollo";
import { loadStripePromise } from "../stripe/stripe";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {} as Partial<RootState>,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: React.PropsWithChildren<any>): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <ApolloProvider client={apolloClient}>
            <BrowserRouter>
              <Elements stripe={loadStripePromise}>
                <StyleSheetManager shouldForwardProp={() => true}>
                  {children}
                </StyleSheetManager>
              </Elements>
            </BrowserRouter>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
