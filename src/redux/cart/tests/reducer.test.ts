import { cartReducer, cartActions } from "../reducer";

import * as types from "../types";

describe("cart reducer", () => {
  const item: types.Item = {
    id: "cjwuuj5ip000j0719taw0mjdz",
    name: "Brown Brim",
    price: 25,
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    quantity: 1,
  };

  it("should handle setCartOpened", () => {
    const initialState: types.CartState = { opened: false, items: [] };
    const { opened } = cartReducer(initialState, cartActions.setCartOpened());
    expect(opened).toBe(true);
  });

  it("should handle addCartItem", () => {
    const initialState: types.CartState = { opened: false, items: [] };
    const { items } = cartReducer(initialState, cartActions.addCartItem(item));
    expect(items[0]).toEqual(item);
  });

  it("should handle removeCartItem", () => {
    const initialState: types.CartState = { opened: false, items: [item] };
    const { items } = cartReducer(
      initialState,
      cartActions.removeCartItem(item),
    );
    expect(items).not.toContain(item);
  });

  it("should handle clearCartItem", () => {
    const initialState: types.CartState = { opened: false, items: [item] };
    const { items } = cartReducer(
      initialState,
      cartActions.clearCartItem(item),
    );
    expect(items).toEqual([]);
  });
});
