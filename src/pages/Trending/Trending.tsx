import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AllProducts from "../../components/hot-items/HotItems";
import Loading from "../../components/misc/Loading";
import {
  addAllProducts,
  addCategories,
  getProducts,
  getProductsFromDB,
} from "../../features/product/productSlice";
import {
  getCartFromDB,
  setCart,
} from "../../features/shoppingCart/shoppingCartSlice";
import { getUser } from "../../features/user/userSlice";

export default function Trending() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getProducts);
  const user = useAppSelector(getUser);

  const getProductsOnFirstLoad = async () => {
    //NOTE: admin to user messess up allProducts
    if (!allProducts.length) {
      console.log("pumasok");
      const result = await dispatch(getProductsFromDB()).unwrap();
      dispatch(addAllProducts(result.rows));
      console.log("first render!");
      console.log(result);
      const categories: string[] = [];
      result.rows.forEach((prod) => {
        const index = categories.findIndex((title) => title === prod.title);

        if (index < 0) {
          categories.push(prod.title);
        }
      });
      console.log("categories", categories);
      dispatch(addCategories(categories));
    }
  };

  const getCartFromDataBase = async () => {
    if (user.token) {
      const result = await dispatch(getCartFromDB()).unwrap();

      if (result.items.length !== 0) {
        dispatch(setCart(result));
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProductsOnFirstLoad();
    getCartFromDataBase();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !!allProducts.length ? (
        <AllProducts />
      ) : (
        <h1>No Available Products</h1>
      )}{" "}
    </>
  );
}
