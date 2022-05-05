import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import AllProducts from "../../components/all-products/AllProducts";
import {
  getAdminProductsFromDB,
  Products,
} from "../../features/product/productSlice";

const AdminHome = () => {
  const [allProducts, setAllProducts] = useState<Products>({
    collections: [],
    totalItems: 0,
    status: "",
  });
  const dispatch = useAppDispatch();

  const getProducts = async () => {
    const products = await dispatch(getAdminProductsFromDB()).unwrap();

    console.log("products", products);
    setAllProducts({
      collections: products.collections,
      totalItems: products.totalItems,
      status: "success",
    });
  };
  useEffect(() => {
    getProducts();
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
