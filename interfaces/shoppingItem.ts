import Product from "./product";
import { CartItem } from "./cartItem";
export default interface ShoppingItem {
  _id: string;
  product: Product;
  cartItem: CartItem;
}
