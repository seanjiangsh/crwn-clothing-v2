import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider as ApolloMockProvider } from "@apollo/client/testing";

import { renderWithProviders } from "../utils/tests/utils-for-tests";
import { getCategories } from "../utils/graphql/query/categories";
import App from "../App";

describe("App component", () => {
  const user = userEvent.setup();

  it("renders the navigation bar and directory element", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    // * note: waitFor is used to wait for the data to be fetched
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
    // * note: await findByTestId is used to wait for the data to be fetched
    // * just different approach to wait
    const shop = await screen.findByTestId("shop-preview");
    expect(shop).toBeInTheDocument();
  });

  it("renders the checkout page", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/checkout"]}>
        <App />
      </MemoryRouter>,
    );
    const checkout = await screen.findByTestId("checkout");
    expect(checkout).toBeInTheDocument();
  });

  it("renders the authentication page", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/auth"]}>
        <App />
      </MemoryRouter>,
    );
    const authentication = await screen.findByTestId("authentication");
    expect(authentication).toBeInTheDocument();
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

  it("navigates to the /shop/jacket page and render product cards when the jacket directory is clicked", async () => {
    const mockCategoryData = {
      categories: [
        {
          id: "cjwuun2fa001907195roo7iyk",
          title: "Jackets",
          items: [
            {
              id: "cjwuun2fp001a0719thf91fzq",
              name: "Black Jean Shearling",
              price: 125,
              imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
            },
            {
              id: "cjwuuj5j4000l0719l3ialwkj",
              name: "Blue Beanie",
              price: 18,
              imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
            },
            {
              id: "cjwuuj5je000n0719ch6nbhik",
              name: "Brown Cowboy",
              price: 35,
              imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
            },
          ],
        },
      ],
    };
    const mocks = [
      {
        request: { query: getCategories },
        result: { data: mockCategoryData },
      },
    ];
    renderWithProviders(
      <ApolloMockProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </ApolloMockProvider>,
    );
    const jacketTitle = mockCategoryData.categories[0].title;
    const directoryItemId = `directory-item-${jacketTitle}`;
    const directoryItem = await screen.findByTestId(directoryItemId);
    await user.click(directoryItem);

    // * Check if the product cards are rendered correctly
    const productCards = screen.getAllByTestId("product-card");
    // screen.debug(productCards);
    expect(productCards).toHaveLength(3);

    // * Check if the product card titles and images are correct
    productCards.forEach((productCard, idx) => {
      const product = mockCategoryData.categories[0].items[idx];
      const title = screen.getByText(product.name);
      const image = productCard.querySelector("img");
      expect(title).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(image?.src).toBe(product.imageUrl);
    });
  });
});
