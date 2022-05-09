import Product from "./product";

export interface Orders {
  _id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  products: Product[];
}
