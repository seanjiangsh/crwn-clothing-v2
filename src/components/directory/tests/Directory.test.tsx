import { render, screen, getByTestId } from "@testing-library/react";
import { MockedProvider as ApolloMockProvider } from "@apollo/client/testing";

import Directory from "../Directory";
import { getCategories } from "../../../utils/graphql/query/categories";
import { MemoryRouter } from "react-router-dom";
import { getImageUrl } from "../../../utils/misc/misc";

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
        },
        {
          id: "cjwuuj5j4000l0719l3ialwkj",
          name: "Blue Beanie",
          price: 18,
        },
      ],
    },
    {
      id: "cjwuun2fa001907195roo7iyk",
      title: "Jackets",
      items: [
        {
          id: "cjwuun2fp001a0719thf91fzq",
          name: "Black Jean Shearling",
          price: 125,
        },
        {
          id: "cjwuun2na001c0719ovsfpdjt",
          name: "Blue Jean Jacket",
          price: 90,
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

describe("Directory component", () => {
  it("renders directory items correctly", async () => {
    render(
      <ApolloMockProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/"]}>
          <Directory />
        </MemoryRouter>
      </ApolloMockProvider>,
    );

    // Wait for the data to be fetched
    await screen.findByTestId("directory");
    const { categories } = mockCategoryData;

    categories.forEach((category) => {
      const { title, items } = category;
      // * Check if the directory item is rendered correctly
      const id = `directory-item-${title}`;
      const directoryItem = screen.getByTestId(id);
      expect(directoryItem).toBeInTheDocument();
      // screen.debug(directoryItem);
      // * Check if the directory item titles and images are correct
      const titleElem = screen.getByText(title);
      const imageElem = getByTestId(directoryItem, "directory-item-image");
      expect(titleElem).toBeInTheDocument();
      expect(imageElem).toBeInTheDocument();
      const imageUrl = getImageUrl(title, items[0].id);
      const style = `background-image: url(${imageUrl})`;
      expect(imageElem).toHaveStyle(style);
    });
  });
});
