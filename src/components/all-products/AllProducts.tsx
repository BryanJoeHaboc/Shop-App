import { Products } from "../../features/product/productSlice";
import RenderCategory from "../../components/category/RenderCategory";
import Category from "../../../interfaces/category";

type Props = {
  allProducts: Products;
};

const AllProducts = ({ allProducts }: Props) => {
  return (
    <div className="all__products__container">
      {allProducts.collections.map((category: Category) => {
        return <RenderCategory category={category} key={category._id} />;
      })}{" "}
    </div>
  );
};

export default AllProducts;
