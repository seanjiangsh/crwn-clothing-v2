import { Product } from "../../types/common";

export type Item = Product & { quantity: number };

export type CartState = {
  opened: boolean;
  items: Array<Item>;
};

type OpenAction = { type: "cart/SET_OPENED" };
type ItemAction = {
  type: "cart/SET_CART_ITEMS";
  payload: { items: Array<Item> };
};
export type CartActions = OpenAction | ItemAction;
