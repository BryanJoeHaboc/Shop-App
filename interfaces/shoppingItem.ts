import Product from "./product";
import { CartItem } from "./cartItem";
export default interface ShoppingItem {
  product: Product;
  cartItem: CartItem;
}
