import Product from "./product";

export interface Orders {
  _id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  products: Product[];
}
