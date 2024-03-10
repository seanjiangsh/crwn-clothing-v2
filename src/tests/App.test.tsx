import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { renderWithProviders } from "../utils/tests/utils-for-tests";
import App from "../App";

describe("App component", () => {
  const user = userEvent.setup();

  it("renders the navigation bar and directory element", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const navigation = screen.getByTestId("navigation");
      const directory = screen.getByTestId("directory");
      expect(navigation).toBeInTheDocument();
      expect(directory).toBeInTheDocument();
    });
  });

  it("renders the shop page", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/shop"]}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const shop = screen.getByTestId("shop-preview");
      expect(shop).toBeInTheDocument();
    });
  });

  it("renders the checkout page", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/checkout"]}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const checkout = screen.getByTestId("checkout");
      expect(checkout).toBeInTheDocument();
    });
  });

  it("renders the authentication page", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/auth"]}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const authentication = screen.getByTestId("authentication");
      expect(authentication).toBeInTheDocument();
    });
  });

  it("navigate to checkout page when cart checkout button is clicked", async () => {
    const preloadedState = {
      cart: {
        opened: true,
        items: [
          {
            id: "cjwuuj5ip000j0719taw0mjdz",
            name: "Brown Brim",
            price: 25,
            imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
            quantity: 1,
          },
          {
            id: "cjwuuj5j4000l0719l3ialwkj",
            name: "Blue Beanie",
            price: 18,
            imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
            quantity: 2,
          },
        ],
      },
    };
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
      { preloadedState },
    );
    const cartIcon = screen.getByTestId("drop-down-goto-checkout");
    await user.click(cartIcon);
    const checkOut = screen.getByTestId("checkout");
    expect(checkOut).toBeInTheDocument();
  });
});
