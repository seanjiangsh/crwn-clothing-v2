import { vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";

import Navigation from "../Navigation";
import { renderWithProviders } from "../../../utils/tests/utils-for-tests";
import * as firebaseUtils from "../../../utils/firebase/firebase";

describe("Navigation component", () => {
  const user = userEvent.setup();

  it("renders the navigation bar correctly", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
      </MemoryRouter>,
    );

    const logo = screen.getByTestId("nav-crwn-logo");
    const shopLink = screen.getByRole("link", { name: /shop/i });
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    const cartIcon = screen.getByTestId("cart-icon");

    expect(logo).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(signInLink).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
  });

  it("renders sign out link if user exist", () => {
    const firebaseUser = { displayName: "John Doe" } as User;
    const preloadedState = {
      user: { user: firebaseUser, isLoading: false, error: null },
    };
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
      </MemoryRouter>,
      { preloadedState },
    );
    const signOut = screen.getByTestId("nav-sign-out");
    expect(signOut).toBeInTheDocument();
  });

  it("renders sign in link if user not exist", () => {
    const preloadedState = {
      user: { user: null, isLoading: false, error: null },
    };
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
      </MemoryRouter>,
      { preloadedState },
    );
    const signIn = screen.getByTestId("nav-sign-in");
    expect(signIn).toBeInTheDocument();
  });

  it("renders CartDropDown when cart is closed and cart icon is clicked", async () => {
    const preloadedState = { cart: { opened: false, items: [] } };
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
      </MemoryRouter>,
      { preloadedState },
    );
    const cartIcon = screen.getByTestId("cart-icon");
    await user.click(cartIcon);
    const cartDropdown = screen.getByTestId("cart-drop-down");
    expect(cartDropdown).toBeInTheDocument();
  });

  it("calls the signOut function when sign out link is clicked", async () => {
    const spy = vi.spyOn(firebaseUtils, "signOutUser");
    const firebaseUser = { displayName: "John Doe" } as User;
    const preloadedState = {
      user: { user: firebaseUser, isLoading: false, error: null },
    };
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
      </MemoryRouter>,
      { preloadedState },
    );
    const signOut = screen.getByTestId("nav-sign-out");
    await user.click(signOut);
    expect(spy).toHaveBeenCalled();
  });
});
