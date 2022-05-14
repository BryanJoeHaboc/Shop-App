import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/homepage/HomePage";
import Trending from "./pages/trending/Trending";
import RenderCategory from "./components/category/RenderCategory";
import Header from "./components/header/Header";
import ShoppingCartComponent from "./pages/shopping-cart/ShoppingCart";
import SignUp from "./pages/signup/SignUp";
import LoginPage from "./pages/login/LoginPage";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUser } from "./features/user/userSlice";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import AddProducts from "./pages/add-products/AddProducts";
import { useEffect } from "react";
import {
  addAllProducts,
  addCategories,
  getProducts,
  getProductsFromDB,
} from "./features/product/productSlice";
import AdminHome from "./pages/admin/AdminHome";
import Orders from "./pages/orders/Orders";
import PageNotFound from "./pages/404/404";
import ProductPage from "./pages/product/ProductPage";
import AllProducts from "./pages/all-products/AllProducts";

function App() {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getProducts);

  const getProductsOnFirstLoad = async () => {
    //NOTE: admin to user messess up allProducts
    console.log("hindi pumasok");
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

  useEffect(() => {
    getProductsOnFirstLoad();
  }, []);

  return (
    <div>
      {" "}
      <Header />
      <main className="App">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path="cart" element={<ShoppingCartComponent />}></Route>
            <Route path="products">
              <Route index element={<AllProducts itemsPerPage={10} />} />
              <Route path=":categoryType" element={<RenderCategory />} />
            </Route>
            <Route path="product">
              <Route path=":productId" element={<ProductPage />} />
            </Route>
            <Route
              path="home"
              element={
                <ProtectedRoute user={user}>
                  <Trending />
                </ProtectedRoute>
              }
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="orders"
              element={
                <ProtectedRoute user={user}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="admin">
              <Route
                index
                element={
                  user.userType === "admin" ? (
                    <ProtectedRoute user={user}>
                      <AdminHome />
                    </ProtectedRoute>
                  ) : (
                    <Navigate to="/home" />
                  )
                }
              />
              <Route
                path="addproduct"
                element={
                  user.userType === "admin" ? (
                    <ProtectedRoute user={user}>
                      <AddProducts />
                    </ProtectedRoute>
                  ) : (
                    <Navigate to="/home" />
                  )
                }
              />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
