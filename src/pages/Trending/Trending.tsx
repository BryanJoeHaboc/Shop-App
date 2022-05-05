import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AllProducts from "../../components/all-products/AllProducts";
import { getProducts } from "../../features/product/productSlice";

export default function Trending() {
  const allProducts = useAppSelector(getProducts);
  return <AllProducts allProducts={allProducts} />;
}
