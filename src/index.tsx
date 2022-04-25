import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import Trending from "./pages/trending/Trending";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import Homepage from "./pages/homepage/HomePage";

import RenderCategory from "./components/category/RenderCategory";
import Header from "./components/header/Header";
import ShoppingCartComponent from "./pages/shopping-cart/ShoppingCart";
import { PersistGate } from "redux-persist/integration/react";
import SignUp from "./pages/signup/SignUp";
import LoginPage from "./pages/login/LoginPage";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
const axios = require("axios").default;

axios.defaults.baseURL = "http://localhost:5000";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Homepage />} />
              <Route path="cart" element={<ShoppingCartComponent />}></Route>
              <Route path="products">
                <Route index element={<Trending />}></Route>
                <Route path=":categoryType" element={<RenderCategory />} />
              </Route>
              <Route path="home" element={<Trending />}></Route>
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
