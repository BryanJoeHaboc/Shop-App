import ShoppingItem from "./shoppingItem";

export default interface ShoppingCart {
  _id?: string;
  items: ShoppingItem[];
}
