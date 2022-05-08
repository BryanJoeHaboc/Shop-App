import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AllProducts from "../../components/all-products/AllProducts";
import { getProducts } from "../../features/product/productSlice";
import {
  getCart,
  getCartFromDB,
  setCart,
} from "../../features/shoppingCart/shoppingCartSlice";

export default function Trending() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getProducts);
  const cart = useAppSelector(getCart);

  const getCartFromDataBase = async () => {
    const result = await dispatch(getCartFromDB()).unwrap();

    if (result.items.length !== 0) {
      dispatch(setCart(result));
      console.log(cart);
    }
  };

  useEffect(() => {
    getCartFromDataBase();
  }, []);
  return <AllProducts allProducts={allProducts} />;
}
