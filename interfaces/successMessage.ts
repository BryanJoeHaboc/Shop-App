import Product from "./product";

export interface SuccessMessage {
  message: string;
}
export interface SuccessMessageAddProducts extends SuccessMessage {
  product: Product;
}
