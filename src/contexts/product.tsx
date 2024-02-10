import { createContext, useState, Dispatch, SetStateAction } from "react";

import { Product } from "../types/common";
import PRODUCTS from "../products.json";

type Context = {
  products: Array<Product>;
  setProducts: Dispatch<SetStateAction<typeof PRODUCTS>>;
};

const defaultContext: Context = {
  products: PRODUCTS,
  setProducts: () => {},
};

export const ProductContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const ProductProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState<Array<Product>>(PRODUCTS);
  const value = { products, setProducts };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
