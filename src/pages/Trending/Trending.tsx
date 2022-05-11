import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AllProducts from "../../components/all-products/AllProducts";
import Loading from "../../components/misc/Loading";
import { getProducts } from "../../features/product/productSlice";
import {
  getCart,
  getCartFromDB,
  setCart,
} from "../../features/shoppingCart/shoppingCartSlice";

export default function Trending() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getProducts);

  const getCartFromDataBase = async () => {
    const result = await dispatch(getCartFromDB()).unwrap();

    if (result.items.length !== 0) {
      dispatch(setCart(result));
    }
    setIsLoading(false);
    console.log("hatdogigigigigdig");
  };

  useEffect(() => {
    getCartFromDataBase();
  }, []);
  return (
    <>{isLoading ? <Loading /> : <AllProducts allProducts={allProducts} />} </>
  );
}
