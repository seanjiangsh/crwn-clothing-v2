import { createContext, useState, Dispatch, SetStateAction } from "react";

type CartState = {
  opened: boolean;
};

type Context = {
  cartState: CartState;
  setCartState: Dispatch<SetStateAction<CartState>>;
};

const defaultCartState: CartState = {
  opened: false,
};
const defaultContext: Context = {
  cartState: defaultCartState,
  setCartState: () => {},
};
export const CartContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const CartProvider = ({ children }: ProviderProps) => {
  const [cartState, setCartState] = useState<CartState>(defaultCartState);
  const value = { cartState, setCartState };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
