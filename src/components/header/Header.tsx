import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchBar from "../searchbar/searchbar.component";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";

import ShoppingCartComponent from "../../pages/shopping-cart-window/ShoppingCartWindow";
import { RefObject, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser, clearUser } from "../../features/user/userSlice";
import UserHeader from "../user/UserHeader";
import AdminHeader from "../admin/AdminHeader";
import "./Header.scss";
import { clearCart } from "../../features/shoppingCart/shoppingCartSlice";
import { clearProducts } from "../../features/product/productSlice";
import useComponentVisible from "../useComponentVisible/UseComponentVisible";

export default function Header() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible({
      initialIsVisible: false,
    });
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearProducts());
    navigate("/");
  };

  return (
    <div className="header_container">
      <div className="header_logo_container">
        <Link to="/">
          {" "}
          <FavoriteIcon />
        </Link>
      </div>
      {user.userType === "admin" ? <AdminHeader /> : <UserHeader />}
      <div className="header_actions">
        <div className="header_actions_searchbar_container">
          <SearchBar />
        </div>
        <div
          ref={ref as RefObject<HTMLDivElement>}
          className="header_actions_cart_holder"
          onClick={() => setIsComponentVisible(!isComponentVisible)}
        >
          <IconButton color="inherit" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>

          <div>{isComponentVisible ? <ShoppingCartComponent /> : null}</div>
        </div>

        {user.token ? (
          <div className="pointer" onClick={() => handleLogout()}>
            Logout
          </div>
        ) : (
          <div className="header_actions_login pointer">
            <Link to="/login">Login</Link>
          </div>
        )}
        {user.token ? (
          ""
        ) : (
          <div className="header_actions_sign_up pointer">
            <Link to={"/signup"}>Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}
