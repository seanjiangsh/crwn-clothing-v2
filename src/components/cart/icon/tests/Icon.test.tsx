import { expect, describe, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../utils/tests/utils-for-tests";
import Icon from "../Icon";

describe("Icon component", () => {
  it("renders the cart icon with the correct count", () => {
    const preloadedState = {
      cart: {
        opened: false,
        items: [
          {
            id: "1",
            name: "Item 1",
            imageUrl: "image-url-1",
            price: 10,
            quantity: 1,
          },
          {
            id: "2",
            name: "Item 2",
            imageUrl: "image-url-2",
            price: 20,
            quantity: 2,
          },
          {
            id: "3",
            name: "Item 3",
            imageUrl: "image-url-3",
            price: 30,
            quantity: 3,
          },
          {
            id: "4",
            name: "Item 4",
            imageUrl: "image-url-4",
            price: 40,
            quantity: 4,
          },
          {
            id: "5",
            name: "Item 5",
            imageUrl: "image-url-5",
            price: 50,
            quantity: 5,
          },
        ],
      },
    };
    renderWithProviders(<Icon />, { preloadedState });
    const cartIcon = screen.getByTestId("cart-icon");
    const itemCount = screen.getByTestId("cart-item-count");
    expect(cartIcon).toBeInTheDocument();
    expect(itemCount).toHaveTextContent("5");
  });
});
