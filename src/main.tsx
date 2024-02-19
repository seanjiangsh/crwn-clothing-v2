import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

import { persister, store } from "./redux/store.ts";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <BrowserRouter>
          <StyleSheetManager shouldForwardProp={() => true}>
            <App />
          </StyleSheetManager>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
