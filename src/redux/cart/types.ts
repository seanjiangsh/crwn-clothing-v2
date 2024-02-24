import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/common";

export type Item = Product & { quantity: number };

export type CartState = {
  readonly opened: boolean;
  readonly items: Array<Item>;
};

export type SetItemAction = PayloadAction<Product>;
