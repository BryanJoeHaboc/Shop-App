import Product from "../../../interfaces/product";
import ProductComponent from "../../components/product/Product";
import Category from "../../../interfaces/category";
import "./Category.scss";
import data from "../../data/data";
import { useParams, Link } from "react-router-dom";

type Props = {
  category: Category;
  count: number;
};

export default function CategoryComponent({ category, count }: Props) {
  const { title, items } = category;
  let prodCount = 0;

  return (
    <div className={`category_container`}>
      <p className="container_title">
        <Link to={`/product/${title}`}>{title}</Link>
      </p>
      <div
        className={`category_product_container  ${
          count === category.items.length ? "wrap" : ""
        }`}
      >
        {items.map((product: Product) => {
          if (prodCount <= count) {
            prodCount++;
            return <ProductComponent product={product} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}
