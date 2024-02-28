export type Category = { title: string; items: Array<Product> };
export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};
