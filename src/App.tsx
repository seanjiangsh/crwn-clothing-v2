import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { UserState } from "./redux/user/types";
import { setUser } from "./redux/user/actions";

import {
  addCollectionAndDocuments,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase";
import SHOP_DATA from "./shop-data";

import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/Checkout";
import Authentication from "./routes/authentication/Authentication";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const nextFn = (user: UserState["user"]) => {
      if (user) createUserDocumentFromAuth(user);
      dispatch(setUser(user));
    };
    const unsubscribe = onAuthStateChangedListener(nextFn);
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    addCollectionAndDocuments(SHOP_DATA);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}
