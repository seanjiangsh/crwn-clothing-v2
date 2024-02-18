import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

import { store } from "./redux/store.ts";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StyleSheetManager shouldForwardProp={() => true}>
          <App />
        </StyleSheetManager>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
