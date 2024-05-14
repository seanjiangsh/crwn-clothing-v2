import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDispatch } from "./redux/root-hook";
import { userActions } from "./redux/user/reducer";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase";

import Spinner from "./components/spinner/Spinner";
import GlobalStyle from "./global.styles";

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

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home data-testid="home" />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
