import { vi } from "vitest";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider as ApolloMockProvider } from "@apollo/client/testing";

import { renderWithProviders } from "../utils/tests/utils-for-tests";
import { getCategories } from "../utils/graphql/query/categories";

import App from "../App";
import { userActions } from "../redux/user/reducer";

vi.mock("firebase/auth", async () => {
  const firebase = await vi.importActual("firebase/auth");
  return {
    ...firebase,
    onAuthStateChanged: vi.fn(),
  };
});

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    doc: vi.fn(() => ({})),
    getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
    getDocs: vi.fn(() => ({ empty: true })),
    setDoc: vi.fn(() => Promise.resolve()),
    writeBatch: vi.fn(() => ({
      set: vi.fn(() => {}),
      commit: vi.fn(() => Promise.resolve()),
    })),
    collection: vi.fn(() => ({})),
    query: vi.fn(() => ({})),
  };
});

describe("App component", () => {
  const user = userEvent.setup();

  it("renders the navigation bar and directory element", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(
      async () => {
        const navigation = await screen.findByTestId("navigation");
        const directory = await screen.findByTestId("directory");
        expect(navigation).toBeInTheDocument();
        expect(directory).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  }, 10000);

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
    await waitFor(
      async () => {
        const checkout = await screen.findByTestId("checkout");
        expect(checkout).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  }, 10000);

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
            imageUrl: "/assets/images/hats/cjwuuj5ip000j0719taw0mjdz.png",
            quantity: 1,
          },
          {
            id: "cjwuuj5j4000l0719l3ialwkj",
            name: "Blue Beanie",
            price: 18,
            imageUrl: "/assets/images/hats/cjwuuj5j4000l0719l3ialwkj.png",
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
    const checkOut = await screen.findByTestId("checkout");
    expect(checkOut).toBeInTheDocument();
  });

  it("navigates to the /shop/hats page and render product cards when the hats directory is clicked", async () => {
    const mockCategoryData = {
      categories: [
        {
          id: "cjwuun2fa001907195roo7iyk",
          title: "Hats",
          items: [
            {
              id: "cjwuuj5ip000j0719taw0mjdz",
              name: "Brown Brim",
              price: 25,
              imageUrl: "/assets/images/hats/cjwuuj5ip000j0719taw0mjdz.png",
              quantity: 1,
            },
            {
              id: "cjwuuj5j4000l0719l3ialwkj",
              name: "Blue Beanie",
              price: 18,
              imageUrl: "/assets/images/hats/cjwuuj5j4000l0719l3ialwkj.png",
              quantity: 2,
            },
            {
              id: "cjwuuj5je000n0719ch6nbhik",
              name: "Brown Cowboy",
              price: 35,
              imageUrl: "/assets/images/hats/cjwuuj5je000n0719ch6nbhik.png",
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

    await waitFor(
      () => {
        // * Check if the product cards are rendered correctly
        const productCards = screen.getAllByTestId("product-card");
        // screen.debug(productCards);
        expect(productCards).toHaveLength(3);

        // * Check if the product card titles and images are correct
        productCards.forEach((productCard, idx) => {
          const product = mockCategoryData.categories[0].items[idx];
          const title = screen.getByText(product.name);
          const lazyLoad = productCard.firstChild;
          expect(title).toBeInTheDocument();
          expect(lazyLoad).toHaveClass("lazyload-wrapper");
        });
      },
      { timeout: 10000 },
    );
  }, 10000);

  it("navigates to the /shop from /auth when user logged in", async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={["/auth"]}>
        <App />
      </MemoryRouter>,
    );

    act(() =>
      store.dispatch(userActions.setCurrentUser({ uid: "123" } as any)),
    );

    await waitFor(
      () => {
        expect(screen.getByTestId("shop-preview")).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  }, 10000);
});
