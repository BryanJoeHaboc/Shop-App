import Product from "../../../interfaces/product";
import ProductComponent from "../../components/product/Product";
import Category from "../../../interfaces/category";
import "./Category.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import { RootState } from "../../app/store";

type Props = {
  category: Category;
  count: number;
};

export default function CategoryComponent({ category, count }: Props) {
  const { title, items } = category;
  let prodCount = 0;

  const _items: Array<Product> = items;

  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);

  return (
    <div className={`category_container`}>
      <p className="container_title">
        <Link to={`/products/${title.toLowerCase()}`}>{title}</Link>
      </p>
      <div
        className={`category_product_container  ${
          count === category.items.length ? "wrap" : ""
        }`}
      >
        {_items.map((product: Product) => {
          if (prodCount <= count) {
            prodCount++;
            return <ProductComponent product={product} key={product._id} />;
          }
          return null;
        })}
        <div>{shoppingCart.totalAmount}</div>
        {shoppingCart.items.map((cartItem: ShoppingItem) => {
          return (
            <div>
              <p>{cartItem.product.name}</p>
              <p>{cartItem.product.price}</p>
              <p>{cartItem.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
