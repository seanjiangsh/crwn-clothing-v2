import { createContext, useState, Dispatch, SetStateAction } from "react";

import { Product } from "../types/common";

type Item = Product & { quantity: number };
type Context = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  items: Array<Item>;
  addItem: (product: Product) => void;
};

const defaultContext: Context = {
  opened: false,
  setOpened: () => {},
  items: [],
  addItem: () => {},
};
export const CartContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const CartProvider = ({ children }: ProviderProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [items, setItems] = useState<Array<Item>>([]);

  const addItem = (product: Product) => {
    const existingItem = items.find((i) => i.id === product.id);
    const newItems = existingItem
      ? items.map((item) => {
          if (item.id !== product.id) return item;
          else return { ...item, quantity: item.quantity + 1 };
        })
      : [...items, { ...product, quantity: 1 }];
    console.log(newItems);
    setItems(newItems);
  };

  const value = { opened, setOpened, items, addItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
