import { screen, waitFor } from "@testing-library/react";
import { MockedProvider as ApolloMockProvider } from "@apollo/client/testing";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { renderWithProviders } from "../../../utils/tests/utils-for-tests";
import { getCategories } from "../../../utils/graphql/query/categories";

import Shop from "../Shop";

const mockCategoryData = {
  categories: [
    {
      id: "cjwuuj5bz000i0719rrtw5gqk",
      title: "Hats",
      items: [
        {
          id: "cjwuuj5ip000j0719taw0mjdz",
          name: "Brown Brim",
          price: 25,
          imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
        },
        {
          id: "cjwuuj5j4000l0719l3ialwkj",
          name: "Blue Beanie",
          price: 18,
          imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
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

describe("Shop component", () => {
  it("renders the preview components on the index route", async () => {
    renderWithProviders(
      <ApolloMockProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </MemoryRouter>
      </ApolloMockProvider>,
    );
    await waitFor(() => {
      const preview = screen.getByTestId("shop-preview");
      const categoryTitle = screen.getByText("HATS");
      const productCards = screen.getAllByTestId("product-card");
      expect(preview).toBeInTheDocument();
      expect(categoryTitle).toBeInTheDocument();
      expect(productCards.length).toBe(2);
    });
  });
});
