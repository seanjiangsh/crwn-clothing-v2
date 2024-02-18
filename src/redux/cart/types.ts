import { Product } from "../../types/common";

export type Item = Product & { quantity: number };

export type CartState = {
  opened: boolean;
  items: Array<Item>;
  count: number;
  totalPrice: number;
};

export type OpenAction = { type: "SET_OPENED" };
export type ItemAction = {
  type: "SET_CART_ITEMS";
  payload: { items: Array<Item>; count: number; totalPrice: number };
};
export type CartActions = OpenAction | ItemAction;
