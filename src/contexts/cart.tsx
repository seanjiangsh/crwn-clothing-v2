import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { Product } from "../types/common";

export type Item = Product & { quantity: number };
type Context = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  items: Array<Item>;
  addItem: (product: Product) => void;
  substractItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  count: number;
  totalPrice: number;
};

const defaultContext: Context = {
  opened: false,
  setOpened: () => {},
  items: [],
  addItem: () => {},
  substractItem: () => {},
  removeItem: () => {},
  count: 0,
  totalPrice: 0,
};
export const CartContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const CartProvider = ({ children }: ProviderProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [items, setItems] = useState<Array<Item>>([]);
  const [count, setCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addItem = (product: Product) => {
    const existingItem = items.find((i) => i.id === product.id);
    const newItems = existingItem
      ? items.map((item) => {
          if (item.id !== product.id) return item;
          else return { ...item, quantity: item.quantity + 1 };
        })
      : [...items, { ...product, quantity: 1 }];
    setItems(newItems);
  };

  const substractItem = (product: Product) => {
    const existingItem = items.find((i) => i.id === product.id);
    if (!existingItem) return;
    const newItems =
      existingItem.quantity === 1
        ? items.filter((item) => item.id !== product.id)
        : items.map((item) => {
            if (item.id !== product.id) return item;
            else return { ...item, quantity: item.quantity - 1 };
          });
    setItems(newItems);
  };

  const removeItem = (product: Product) => {
    const newItems = items.filter((item) => item.id !== product.id);
    setItems(newItems);
  };

  const value = {
    opened,
    setOpened,
    items,
    addItem,
    substractItem,
    removeItem,
    count,
    totalPrice,
  };

  useEffect(() => {
    const count = items.reduce((p, { quantity }) => p + quantity, 0);
    setCount(count);
  }, [items]);

  useEffect(() => {
    const totalPrice = items.reduce((p, c) => p + c.quantity * c.price, 0);
    setTotalPrice(totalPrice);
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
