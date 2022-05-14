import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../interfaces/product";
import MiniProducts from "../../components/mini-products/MiniProducts";

const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const location = useLocation();

  useEffect(() => {
    setProduct((location.state as { product: Product })?.product);
  }, [location]);
  return (
    <div>
      {product ? (
        <MiniProducts
          product={product}
          description={product.description}
          cssClass="product__page"
        />
      ) : (
        <h1>Product does not exists</h1>
      )}
    </div>
  );
};

export default ProductPage;
