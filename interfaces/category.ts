import product from "./product";

export default interface Category {
  _id: number;
  title: string;
  routeName: string;
  items: product[];
}
