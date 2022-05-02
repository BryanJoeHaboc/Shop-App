import Category from "../../../interfaces/category";
import "./Trending.scss";
import RenderCategory from "../../components/category/RenderCategory";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProducts } from "../../features/product/productSlice";

export default function Trending() {
  const allProducts = useAppSelector(getProducts);
  return (
    <div className="trending_container">
      {allProducts.collections.map((category: Category) => {
        return <RenderCategory category={category} key={category._id} />;
      })}{" "}
    </div>
  );
}
