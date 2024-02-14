export type CategoryMap = { [key: string]: Array<Product> };
export type Category = { id: number; title: string; imageUrl: string };
export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};
