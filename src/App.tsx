import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { addCollectionAndDocuments } from "./utils/firebase/firebase";
import { checkUserSession } from "./redux/user/actions";
import SHOP_DATA from "./shop-data";

import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/Checkout";
import Authentication from "./routes/authentication/Authentication";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
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
