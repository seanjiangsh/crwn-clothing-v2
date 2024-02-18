import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectUser } from "../../redux/user/selectors";
import { selectCart } from "../../redux/cart/selectors";

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
  const user = useSelector(selectUser);
  const { opened } = useSelector(selectCart);

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
