import { Products } from "../../features/product/productSlice";
import RenderCategory from "../../components/category/RenderCategory";
import Category from "../../../interfaces/category";
import CategoryComponent from "../category/Category";

type Props = {
  allProducts: Products;
};

const AllProducts = ({ allProducts }: Props) => {
  return (
    <div className="all__products__container">
      {allProducts.collections.map((category: Category) => {
        return (
          <CategoryComponent category={category} key={category._id} count={3} />
        );
      })}{" "}
    </div>
  );
};

export default AllProducts;
