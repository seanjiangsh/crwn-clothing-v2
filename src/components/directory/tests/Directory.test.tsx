import { render, screen, getByTestId } from "@testing-library/react";
import { MockedProvider as ApolloMockProvider } from "@apollo/client/testing";

import Directory from "../Directory";
import { getCategories } from "../../../utils/graphql/query/categories";
import { MemoryRouter } from "react-router-dom";

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
          id: "cjwuun2na001c0719ovsfpdjt",
          name: "Blue Jean Jacket",
          price: 90,
          imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
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
      // * Check if the directory item is rendered correctly
      const id = `directory-item-${category.title}`;
      const directoryItem = screen.getByTestId(id);
      expect(directoryItem).toBeInTheDocument();
      // screen.debug(directoryItem);
      // * Check if the directory item titles and images are correct
      const titleElem = screen.getByText(category.title);
      const imageElem = getByTestId(directoryItem, "directory-item-image");
      expect(titleElem).toBeInTheDocument();
      expect(imageElem).toBeInTheDocument();
      const style = `background-image: url(${category.items[0].imageUrl})`;
      expect(imageElem).toHaveStyle(style);
    });
  });
});
