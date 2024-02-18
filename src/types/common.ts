export type Category = { title: string; items: Array<Product> };
export type CategoryMap = { [key: string]: Array<Product> };
export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};
