import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import "./Navigation.css";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { UserContext } from "../../contexts/user";
import { signOutUser } from "../../utils/firebase/firebase";

export default function Navigation() {
  const { userState } = useContext(UserContext);

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
          {userState?.user ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
