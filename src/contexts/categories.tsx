import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { CategoryMap } from "../types/common";
import SHOP_DATA from "../shop-data";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase";

type Context = {
  categories: CategoryMap;
  setCategories: Dispatch<SetStateAction<CategoryMap>>;
};

const defaultContext: Context = {
  categories: {},
  setCategories: () => {},
};

export const CategoriesContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const CategoriesProvider = ({ children }: ProviderProps) => {
  const [categories, setCategories] = useState<CategoryMap>({});
  const value = { categories, setCategories };

  useEffect(() => {
    addCollectionAndDocuments(SHOP_DATA);
  }, []);

  useEffect(() => {
    getCategoriesAndDocuments().then((categories) => {
      console.log(categories);
      setCategories(categories);
    });
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
