import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../interfaces/product";
import MiniProducts from "../../components/mini-products/MiniProducts";
import ProductComponent from "../../components/product/Product";

import "./ProductPage.scss";

const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const location = useLocation();

  useEffect(() => {
    setProduct((location.state as { product: Product })?.product);
    console.log(location);
  }, [location]);
  return (
    <div>
      {product ? (
        <ProductComponent
          product={product}
          enableDescription={true}
          cssStyle="product__page"
        />
      ) : (
        <h1>Product does not exists</h1>
      )}
    </div>
  );
};

export default ProductPage;
