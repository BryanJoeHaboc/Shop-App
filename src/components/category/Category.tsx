import Product from "../../../interfaces/product";
import ProductComponent from "../../components/product/Product";

import "./Category.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getCollection } from "../../features/product/productSlice";

type Props = {
  category: string;
  count: number;
};

export default function CategoryComponent({ category, count }: Props) {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<Product[]>([]);

  let prodCount = 0;
  // NOTE: dito ko igeget yung items,
  const dispatch = useAppDispatch();

  const getSpecificCollection = () => {
    const collection = dispatch(getCollection(category));
    setItems(collection.items);
    setTitle(collection.title);
  };

  useEffect(() => {
    getSpecificCollection();
  }, []);

  return (
    <div className={`category_container`}>
      <p className="container_title">
        {!!items.length && (
          <Link to={`/products/${title.toLowerCase()}`}>{title}</Link>
        )}
      </p>
      <div
        className={`category_product_container  ${
          count === items.length ? "wrap" : ""
        }`}
      >
        {!!items.length ? (
          items.map((product: Product) => {
            if (prodCount <= count) {
              prodCount++;
              return <ProductComponent product={product} key={product._id} />;
            }
            return null;
          })
        ) : (
          <h1>No Available Products</h1>
        )}
      </div>
    </div>
  );
}
