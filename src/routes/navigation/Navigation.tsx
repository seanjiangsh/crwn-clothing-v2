import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user";
import { CartContext } from "../../contexts/cart";

import { signOutUser } from "../../utils/firebase/firebase";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart/icon/Icon";
import CartDropDown from "../../components/cart/drop-down/DropDown";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./Navigation.styles";

export default function Navigation() {
  const { user } = useContext(UserContext);
  const { opened } = useContext(CartContext);

  return (
    <React.Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {user ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {opened && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </React.Fragment>
  );
}
