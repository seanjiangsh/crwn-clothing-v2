import { screen, getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../../utils/tests/utils-for-tests";
import Checkout from "../Checkout";

describe("Checkout component", () => {
  const user = userEvent.setup();

  it("renders the checkout header and items", () => {
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
    renderWithProviders(<Checkout />, { preloadedState });
    const checkoutHeader = screen.getByTestId("checkout-header");
    const checkoutItems = screen.getAllByTestId("checkout-item-container", {
      exact: false,
    });
    const totalPrice = screen.getByTestId("checkout-total");
    expect(checkoutHeader).toBeInTheDocument();
    expect(checkoutItems).toHaveLength(5);
    expect(totalPrice).toHaveTextContent("Total: 550");
  });

  it("add item quantity when right (add) arrow clicked", async () => {
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
            id: "5",
            name: "Item 5",
            imageUrl: "image-url-5",
            price: 50,
            quantity: 1,
          },
        ],
      },
    };
    renderWithProviders(<Checkout />, { preloadedState });
    const checkoutItem = screen.getByTestId("checkout-item-container-1");
    const add = getByTestId(checkoutItem, "add");
    await user.click(add);
    const itemQuantity = getByTestId(checkoutItem, "quantity");
    const totalPrice = screen.getByTestId("checkout-total");
    expect(itemQuantity).toHaveTextContent("2");
    expect(totalPrice).toHaveTextContent("Total: 70");
  });

  it("remove item quantity when left (remove) arrow clicked", async () => {
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
            id: "5",
            name: "Item 5",
            imageUrl: "image-url-5",
            price: 50,
            quantity: 2,
          },
        ],
      },
    };
    renderWithProviders(<Checkout />, { preloadedState });
    const checkoutItem = screen.getByTestId("checkout-item-container-5");
    const remove = getByTestId(checkoutItem, "remove");
    await user.click(remove);
    const itemQuantity = getByTestId(checkoutItem, "quantity");
    const totalPrice = screen.getByTestId("checkout-total");
    expect(itemQuantity).toHaveTextContent("1");
    expect(totalPrice).toHaveTextContent("Total: 60");
  });

  it("clear item from checkout when clear button clicked", async () => {
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
            id: "5",
            name: "Item 5",
            imageUrl: "image-url-5",
            price: 50,
            quantity: 2,
          },
        ],
      },
    };
    renderWithProviders(<Checkout />, { preloadedState });
    const checkoutItem = screen.getByTestId("checkout-item-container-5");
    const clear = getByTestId(checkoutItem, "clear");
    await user.click(clear);
    const checkoutItems = screen.getAllByTestId("checkout-item-container", {
      exact: false,
    });
    const totalPrice = screen.getByTestId("checkout-total");
    expect(checkoutItems).toHaveLength(1);
    expect(totalPrice).toHaveTextContent("Total: 10");
  });
});
