export default interface Product {
  _id?: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  title: string;
  userId: string;
}
