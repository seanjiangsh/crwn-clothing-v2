import React from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./Navigation.css";

export default function Navigation() {
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
          <Link className="auth" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
