import Product from "../../../interfaces/product";
import ProductComponent from "../../components/product/Product";
import Category from "../../../interfaces/category";
import "./Category.scss";

type Props = {
  category: Category;
};

export default function CategoryComponent(props: Props) {
  const { title, items } = props.category;
  let prodCount = 0;
  return (
    <div className="category_container">
      <p className="container_title">{title}</p>
      <div className="category_product_container">
        {items.map((product: Product) => {
          if (prodCount <= 3) {
            prodCount++;
            return <ProductComponent product={product} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}
