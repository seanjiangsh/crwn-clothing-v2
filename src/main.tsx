import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { StyleSheetManager } from "styled-components";

import store, { persister } from "./redux/root-store.ts";
import { loadStripePromise } from "./utils/stripe/stripe.ts";

import { apolloClient } from "./utils/graphql/apollo.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <Elements stripe={loadStripePromise}>
              <StyleSheetManager shouldForwardProp={() => true}>
                <App />
              </StyleSheetManager>
            </Elements>
          </BrowserRouter>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
