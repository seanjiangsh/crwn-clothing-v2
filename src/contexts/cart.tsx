import {
  createContext,
  Dispatch,
  SetStateAction,
  Reducer,
  useReducer,
} from "react";

import { Product } from "../types/common";
import { createAction } from "../utils/reducer/reducer";

export type Item = Product & { quantity: number };
type CartState = {
  opened: boolean;
  items: Array<Item>;
  count: number;
  totalPrice: number;
};
type OpenAction = { type: "SET_OPENED" };
type ItemAction = {
  type: "SET_CART_ITEMS";
  payload: { items: Array<Item>; count: number; totalPrice: number };
};
type CartActions = OpenAction | ItemAction;
type Context = {
  cartState: CartState;
  setOpened: Dispatch<SetStateAction<boolean>>;
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  clearItem: (product: Product) => void;
};
type ProviderProps = { children: JSX.Element };

const initialState: CartState = {
  opened: false,
  items: [],
  count: 0,
  totalPrice: 0,
};
const defaultContext: Context = {
  cartState: initialState,
  setOpened: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
};

const addCartItem = (items: Array<Item>, product: Product): Array<Item> => {
  const existingItem = items.find((i) => i.id === product.id);
  return existingItem
    ? items.map((item) => {
        if (item.id !== product.id) return item;
        else return { ...item, quantity: item.quantity + 1 };
      })
    : [...items, { ...product, quantity: 1 }];
};

const removeCartItem = (items: Array<Item>, product: Product): Array<Item> => {
  const existingItem = items.find((i) => i.id === product.id);
  if (!existingItem) return items;
  return existingItem.quantity === 1
    ? items.filter((item) => item.id !== product.id)
    : items.map((item) => {
        if (item.id !== product.id) return item;
        else return { ...item, quantity: item.quantity - 1 };
      });
};

const clearCartItem = (items: Array<Item>, product: Product): Array<Item> =>
  items.filter((item) => item.id !== product.id);

const getCount = (items: Array<Item>) =>
  items.reduce((p, { quantity }) => p + quantity, 0);

const getTotalPrice = (items: Array<Item>) =>
  items.reduce((p, c) => p + c.quantity * c.price, 0);

const cartReducer: Reducer<CartState, CartActions> = (state, action) => {
  const { type } = action;
  switch (type) {
    case "SET_OPENED": {
      return { ...state, opened: !state.opened };
    }
    case "SET_CART_ITEMS": {
      return { ...state, ...action.payload };
    }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const CartContext = createContext<Context>(defaultContext);

export const CartProvider = ({ children }: ProviderProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const { items } = cartState;

  const setOpened = () => dispatch({ type: "SET_OPENED" });

  const updateItemReducer = (newItems: Array<Item>) => {
    const newCount = getCount(newItems);
    const newTotalPrice = getTotalPrice(newItems);
    const payload = {
      items: newItems,
      count: newCount,
      totalPrice: newTotalPrice,
    };
    dispatch(createAction<CartActions["type"]>("SET_CART_ITEMS", payload));
  };
  const addItem = (product: Product) => {
    updateItemReducer(addCartItem(items, product));
  };
  const removeItem = (product: Product) => {
    updateItemReducer(removeCartItem(items, product));
  };
  const clearItem = (product: Product) => {
    updateItemReducer(clearCartItem(items, product));
  };
  const value = {
    cartState,
    setOpened,
    addItem,
    removeItem,
    clearItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
