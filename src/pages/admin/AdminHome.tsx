import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AllProducts from "../../components/all-products/AllProducts";
import {
  getAdminProductsFromDB,
  Products,
  getProducts,
} from "../../features/product/productSlice";

const AdminHome = () => {
  const [allProducts, setAllProducts] = useState<Products>({
    collections: [],
    totalItems: 0,
    status: "",
  });
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  const getProductsAndSet = async () => {
    const products = await dispatch(getAdminProductsFromDB()).unwrap();

    console.log("products", products);
    setAllProducts({
      collections: products.collections,
      totalItems: products.totalItems,
      status: "success",
    });
  };
  useEffect(() => {
    getProductsAndSet();
  }, []);

  return (
    <div>
      {!allProducts.collections.length ? (
        "No products"
      ) : (
        <AllProducts allProducts={allProducts} />
      )}
    </div>
  );
};

export default AdminHome;
