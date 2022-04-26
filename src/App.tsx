import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/HomePage";
import Trending from "./pages/trending/Trending";
import RenderCategory from "./components/category/RenderCategory";
import Header from "./components/header/Header";
import ShoppingCartComponent from "./pages/shopping-cart/ShoppingCart";
import SignUp from "./pages/signup/SignUp";
import LoginPage from "./pages/login/LoginPage";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { getUser } from "./features/user/userSlice";
import ProtectedRoute from "./components/protected/ProtectedRoute";
function App() {
  const user = useAppSelector(getUser);

  return (
    <div>
      {" "}
      <Header />
      <main className="App">
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path="cart" element={<ShoppingCartComponent />}></Route>
            <Route path="products">
              <Route index element={<Trending />}></Route>
              <Route path=":categoryType" element={<RenderCategory />} />
            </Route>
            <Route
              path="home"
              element={
                <ProtectedRoute user={user}>
                  <Trending />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
