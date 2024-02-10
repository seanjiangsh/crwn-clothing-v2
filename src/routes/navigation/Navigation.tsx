import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user";
import { CartContext } from "../../contexts/cart";

import { signOutUser } from "../../utils/firebase/firebase";

import "./Navigation.css";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart/icon/Icon";
import CartDropDown from "../../components/cart/drop-down/DropDown";

export default function Navigation() {
  const { user } = useContext(UserContext);
  const { opened } = useContext(CartContext);

  return (
    <React.Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {user ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {opened && <CartDropDown />}
      </div>
      <Outlet />
    </React.Fragment>
  );
}
