import { createContext, useState, Dispatch, SetStateAction } from "react";

import PRODUCTS from "../products.json";

type ProductState = {
  products: typeof PRODUCTS;
  addedProducts: Array<number>;
};
type Context = {
  productState: ProductState;
  setProductState: Dispatch<SetStateAction<ProductState>>;
};

const defaultProductState: ProductState = {
  products: PRODUCTS,
  addedProducts: [],
};
const defaultContext: Context = {
  productState: defaultProductState,
  setProductState: () => {},
};
export const ProductContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const ProductProvider = ({ children }: ProviderProps) => {
  const [productState, setProductState] =
    useState<ProductState>(defaultProductState);
  const value = { productState, setProductState };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
