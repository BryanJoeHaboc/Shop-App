import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AllProducts from "../../components/all-products/AllProducts";
import {
  getAdminProductsFromDB,
  Products,
  getProducts,
  addAllProducts,
  addCategories,
} from "../../features/product/productSlice";

const AdminHome = () => {
  const [allProducts, setAllProducts] = useState<Products>({
    items: [],
    totalItems: 0,
    categories: [],
  });
  const dispatch = useAppDispatch();

  const getProductsAndSet = async () => {
    const response = await dispatch(getAdminProductsFromDB()).unwrap();

    dispatch(addAllProducts(response.rows));
    console.log("first render!");

    const categories: string[] = [];
    response.rows.forEach((prod) => {
      const index = categories.findIndex((title) => title === prod.title);

      if (index < 0) {
        categories.push(prod.title);
      }
    });

    dispatch(addCategories(categories));

    setAllProducts({
      items: response.rows,
      totalItems: response.count,
      categories: categories,
    });
  };
  useEffect(() => {
    getProductsAndSet();
  }, []);

  return (
    <div>{!allProducts.items.length ? "No products" : <AllProducts />}</div>
  );
};

export default AdminHome;
