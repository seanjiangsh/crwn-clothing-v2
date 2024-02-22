import { Product } from "../../types/common";

import { Item } from "./types";

export const addItem = (items: Array<Item>, product: Product): Array<Item> => {
  const existingItem = items.find((i) => i.id === product.id);
  return existingItem
    ? items.map((item) => {
        if (item.id !== product.id) return item;
        else return { ...item, quantity: item.quantity + 1 };
      })
    : [...items, { ...product, quantity: 1 }];
};

export const removeItem = (
  items: Array<Item>,
  product: Product,
): Array<Item> => {
  const existingItem = items.find((i) => i.id === product.id);
  if (!existingItem) return items;
  return existingItem.quantity === 1
    ? items.filter((item) => item.id !== product.id)
    : items.map((item) => {
        if (item.id !== product.id) return item;
        else return { ...item, quantity: item.quantity - 1 };
      });
};

export const clearItem = (items: Array<Item>, product: Product): Array<Item> =>
  items.filter((item) => item.id !== product.id);
