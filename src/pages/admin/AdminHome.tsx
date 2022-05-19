import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AllProducts from "../../components/hot-items/HotItems";
import {
  getAdminProductsFromDB,
  Products,
  getProducts,
  addAllProducts,
  addCategories,
  getCategories,
} from "../../features/product/productSlice";
import { getUser } from "../../features/user/userSlice";

const AdminHome = () => {
  const [allProducts, setAllProducts] = useState<Products>({
    items: [],
    totalItems: 0,
    categories: [],
  });
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const adminProducts = useAppSelector(getProducts);
  const adminCategories = useAppSelector(getCategories);

  const getProductsAndSet = async () => {
    // if (!adminProducts.length) {
    const response = await dispatch(getAdminProductsFromDB()).unwrap();

    dispatch(
      addAllProducts(
        response.rows.filter((prod) => prod.userId === user.userId)
      )
    );
    console.log("first render!");
    console.log(response);

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
    // } else {
    //   setAllProducts({
    //     items: adminProducts,
    //     totalItems: adminProducts.length,
    //     categories: adminCategories,
    //   });
    // }
  };
  useEffect(() => {
    getProductsAndSet();
  }, []);

  return (
    <div>
      {!allProducts.items.length ? (
        <h1>No Available Products</h1>
      ) : (
        <AllProducts />
      )}
    </div>
  );
};

export default AdminHome;
