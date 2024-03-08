import { addItem, removeItem, clearItem } from "../utils";
import { Item } from "../types";
import { Product } from "../../../types/common";

describe("cart utils", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Product 1",
    imageUrl: "http://test.com",
    price: 10,
  };
  const mockItems: Array<Item> = [
    {
      id: "2",
      name: "Product 2",
      imageUrl: "http://test.com",
      price: 20,
      quantity: 2,
    },
    {
      id: "3",
      name: "Product 3",
      imageUrl: "http://test.com",
      price: 30,
      quantity: 3,
    },
  ];

  it("should add a new item to the cart", () => {
    const expected: Array<Item> = [
      ...mockItems,
      { ...mockProduct, quantity: 1 },
    ];
    const result = addItem(mockItems, mockProduct);
    expect(result).toEqual(expected);
  });

  it("should add a existing item to the cart and add up the quantity", () => {
    const items: Array<Item> = [...mockItems, { ...mockProduct, quantity: 2 }];
    const expected: Array<Item> = [
      ...mockItems,
      { ...mockProduct, quantity: 3 },
    ];
    const result = addItem(items, mockProduct);
    expect(result).toEqual(expected);
  });

  it("should remove an item from the cart if quantity became 0", () => {
    const items: Array<Item> = [...mockItems, { ...mockProduct, quantity: 1 }];
    const expected: Array<Item> = mockItems;
    const result = removeItem(items, mockProduct);
    expect(result).toEqual(expected);
  });

  it("should reduce item quantity from the cart", () => {
    const items: Array<Item> = [...mockItems, { ...mockProduct, quantity: 5 }];
    const expected: Array<Item> = [
      ...mockItems,
      { ...mockProduct, quantity: 4 },
    ];
    const result = removeItem(items, mockProduct);
    expect(result).toEqual(expected);
  });

  it("should remove nothing from the cart if item not exist", () => {
    const items: Array<Item> = [{ ...mockProduct, quantity: 1 }];
    const expected: Array<Item> = items;
    const result = removeItem(items, { ...mockProduct, id: "2" });
    expect(result).toEqual(expected);
  });

  it("should remove all items with the same id from the cart", () => {
    const expected: Array<Item> = [
      {
        id: "2",
        name: "Product 2",
        imageUrl: "http://test.com",
        price: 20,
        quantity: 2,
      },
      {
        id: "3",
        name: "Product 3",
        imageUrl: "http://test.com",
        price: 30,
        quantity: 3,
      },
    ];
    const items = [{ ...mockProduct, quantity: 1 }, ...expected];
    const result = clearItem(items, mockProduct);
    expect(result).toEqual(expected);
  });
});
