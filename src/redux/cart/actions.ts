import { Product } from "../../types/common";

import { createAction } from "../../utils/reducer/reducer";
import { CartActions, Item } from "./types";

const addItem = (items: Array<Item>, product: Product): Array<Item> => {
  const existingItem = items.find((i) => i.id === product.id);
  return existingItem
    ? items.map((item) => {
        if (item.id !== product.id) return item;
        else return { ...item, quantity: item.quantity + 1 };
      })
    : [...items, { ...product, quantity: 1 }];
};

const removeItem = (items: Array<Item>, product: Product): Array<Item> => {
  const existingItem = items.find((i) => i.id === product.id);
  if (!existingItem) return items;
  return existingItem.quantity === 1
    ? items.filter((item) => item.id !== product.id)
    : items.map((item) => {
        if (item.id !== product.id) return item;
        else return { ...item, quantity: item.quantity - 1 };
      });
};

const clearItem = (items: Array<Item>, product: Product): Array<Item> =>
  items.filter((item) => item.id !== product.id);

const updateItemReducer = (newItems: Array<Item>) => {
  const newCount = getCount(newItems);
  const newTotalPrice = getTotalPrice(newItems);
  const payload = {
    items: newItems,
    count: newCount,
    totalPrice: newTotalPrice,
  };
  return createAction<CartActions["type"]>("SET_CART_ITEMS", payload);
};

const getCount = (items: Array<Item>) =>
  items.reduce((p, { quantity }) => p + quantity, 0);

const getTotalPrice = (items: Array<Item>) =>
  items.reduce((p, c) => p + c.quantity * c.price, 0);

export const addCartItem = (items: Array<Item>, product: Product) =>
  updateItemReducer(addItem(items, product));

export const removeCartItem = (items: Array<Item>, product: Product) =>
  updateItemReducer(removeItem(items, product));

export const clearCartItem = (items: Array<Item>, product: Product) =>
  updateItemReducer(clearItem(items, product));

export const setCartOpened = () =>
  createAction<CartActions["type"]>("SET_OPENED");
