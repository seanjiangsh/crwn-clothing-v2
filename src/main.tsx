import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

import { UserProvider } from "./contexts/user.tsx";
import { CategoriesProvider } from "./contexts/categories.tsx";
import { CartProvider } from "./contexts/cart.tsx";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <StyleSheetManager shouldForwardProp={() => true}>
              <App />
            </StyleSheetManager>
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
