import Product from "./product";

export default interface ShoppingItem {
  _id: string;
  product: Product;
  quantity: number;
}
