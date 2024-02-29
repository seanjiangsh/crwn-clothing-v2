import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "./redux/root-hook";
import { userActions } from "./redux/user/reducer";
import {
  addCollectionAndDocuments,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase";
import SHOP_DATA from "./shop-data";

import Spinner from "./components/spinner/Spinner";
const Home = lazy(() => import("./routes/home/Home"));
const Navigation = lazy(() => import("./routes/navigation/Navigation"));
const Shop = lazy(() => import("./routes/shop/Shop"));
const Checkout = lazy(() => import("./routes/checkout/Checkout"));
const Authentication = lazy(
  () => import("./routes/authentication/Authentication"),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      dispatch(userActions.setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    addCollectionAndDocuments(SHOP_DATA);
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Authentication />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
