import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider as ApolloMockProvider } from "@apollo/client/testing";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { renderWithProviders } from "../../../../utils/tests/utils-for-tests";
import { getCategoryByTitle } from "../../../../utils/graphql/query/categories";
import Category from "../Category";

const mockCategoryData = {
  getCategoryByTitle: {
    id: "cjwuuj5bz000i0719rrtw5gqk",
    title: "Hats",
    items: [
      {
        id: "cjwuuj5ip000j0719taw0mjdz",
        name: "Brown Brim",
        price: 25,
      },
      {
        id: "cjwuuj5j4000l0719l3ialwkj",
        name: "Blue Beanie",
        price: 18,
      },
    ],
  },
};

const mocks = [
  {
    request: {
      query: getCategoryByTitle,
      variables: { title: "hats" },
    },
    result: { data: mockCategoryData },
  },
];

describe("Category component", () => {
  it("renders loading spinner while fetching category data", () => {
    renderWithProviders(
      <ApolloMockProvider mocks={mocks}>
        <Category />
      </ApolloMockProvider>,
    );

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders category title and product cards after data is fetched", async () => {
    renderWithProviders(
      <ApolloMockProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/shop/hats"]}>
          <Routes>
            <Route path="/shop/:category" element={<Category />} />
          </Routes>
        </MemoryRouter>
      </ApolloMockProvider>,
    );
    await waitFor(() => {
      const categoryTitle = screen.getByText("HATS");
      const productCards = screen.getAllByTestId("product-card");
      expect(categoryTitle).toBeInTheDocument();
      expect(productCards.length).toBe(2);
    });
  });

  it("navigates to /shop if category data is not available", async () => {
    const errorMocks = [
      {
        request: {
          query: getCategoryByTitle,
          variables: { title: "notfound" },
        },
        error: new Error("Failed to fetch category data"),
      },
    ];
    render(
      <ApolloMockProvider mocks={errorMocks}>
        <MemoryRouter initialEntries={["/shop/notfound"]}>
          <Routes>
            <Route path="/shop" element={<div data-testid="shop-for-test" />} />
            <Route path="/shop/:category" element={<Category />} />
          </Routes>
        </MemoryRouter>
      </ApolloMockProvider>,
    );

    await waitFor(() => {
      const navigateComponent = screen.getByTestId("shop-for-test");
      expect(navigateComponent).toBeInTheDocument();
    });
  });
});
