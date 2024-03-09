import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { renderWithProviders } from "../utils/tests/utils-for-tests";
import App from "../App";

describe("App component", () => {
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
});
