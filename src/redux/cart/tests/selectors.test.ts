import { RootState } from "../../root-store";
import store from "../../root-store";
import * as types from "../types";
import {
  selectCartOpened,
  selectCartItems,
  selectCartCount,
  selectCartTotalPrice,
} from "../selectors";

describe("Cart Selectors", () => {
  const mockItems: Array<types.Item> = [
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
  ];
  const initialRootState = store.getState();
  const mockState: RootState = {
    ...initialRootState,
    cart: { opened: true, items: mockItems },
  };

  describe("selectCartOpened", () => {
    it("should return the value of cart opened", () => {
      const opened = selectCartOpened(mockState);
      expect(opened).toBe(true);
    });
  });

  describe("selectCartItems", () => {
    it("should return the cart items", () => {
      const items = selectCartItems(mockState);
      expect(items).toEqual(mockItems);
    });
  });

  describe("selectCartCount", () => {
    it("should return the total count of items in the cart", () => {
      const count = selectCartCount(mockState);
      expect(count).toBe(3);
    });
  });

  describe("selectCartTotalPrice", () => {
    it("should return the total price of all items in the cart", () => {
      const totalPrice = selectCartTotalPrice(mockState);
      expect(totalPrice).toBe(61);
    });
  });
});
