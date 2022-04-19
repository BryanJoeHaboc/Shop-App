import product from "./product";

export default interface Category {
  id: number;
  title: string;
  routeName: string;
  items: product[] | [];
}
