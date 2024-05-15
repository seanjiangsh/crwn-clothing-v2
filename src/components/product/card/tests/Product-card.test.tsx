import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductCard from "../Product-card";
import { renderWithProviders } from "../../../../utils/tests/utils-for-tests";

describe("ProductCard component", () => {
  const user = userEvent.setup();
  const product = {
    id: "Sample Product",
    name: "Sample Product",
    imageUrl: "sample-image.jpg",
    price: 9.99,
  };

  it("renders the product card correctly", () => {
    renderWithProviders(<ProductCard {...product} />);
    const { name, price } = product;
    const productCard = screen.getByTestId("product-card");
    const lazyLoad = productCard.firstChild;
    const productName = screen.getByText(name);
    const productPrice = screen.getByText(price.toFixed(2));
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    expect(lazyLoad).toHaveClass("lazyload-wrapper");
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
  });

  it("should add cart item when 'Add to cart' button is clicked", async () => {
    const preloadedState = { cart: { opened: false, items: [] } };
    const { store } = renderWithProviders(<ProductCard {...product} />, {
      preloadedState,
    });

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    await user.click(addToCartButton);

    const expectedItem = { ...product, quantity: 1 };
    const cartState = store.getState();
    expect(cartState.cart.items[0]).toEqual(expectedItem);
  });
});
