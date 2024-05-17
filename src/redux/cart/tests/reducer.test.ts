import { cartReducer, cartActions } from "../reducer";

import * as types from "../types";

describe("cart reducer", () => {
  const item: types.Item = {
    id: "cjwuuj5ip000j0719taw0mjdz",
    name: "Brown Brim",
    price: 25,
    imageUrl: "/assets/images/hats/cjwuuj5ip000j0719taw0mjdz.png",
    quantity: 1,
  };

  it("should handle setCartOpened", () => {
    const initialState: types.CartState = { opened: false, items: [] };
    const action = cartActions.setCartOpened(true);
    const { opened } = cartReducer(initialState, action);
    expect(opened).toBe(true);
  });

  it("should handle addCartItem", () => {
    const initialState: types.CartState = { opened: false, items: [] };
    const action = cartActions.addCartItem(item);
    const { items } = cartReducer(initialState, action);
    expect(items[0]).toEqual(item);
  });

  it("should handle removeCartItem", () => {
    const initialState: types.CartState = { opened: false, items: [item] };
    const action = cartActions.removeCartItem(item);
    const { items } = cartReducer(initialState, action);
    expect(items).not.toContain(item);
  });

  it("should handle clearCartItem", () => {
    const initialState: types.CartState = { opened: false, items: [item] };
    const action = cartActions.clearCartItem(item);
    const { items } = cartReducer(initialState, action);
    expect(items).toEqual([]);
  });
});
