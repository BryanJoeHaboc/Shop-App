import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchBar from "../searchbar/searchbar.component";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";

import ShoppingCartComponent from "../../pages/shopping-cart-window/ShoppingCartWindow";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser, clearUser } from "../../features/user/userSlice";
import UserHeader from "../user/UserHeader";
import AdminHeader from "../admin/AdminHeader";
import "./Header.scss";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());

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
        <div className="header_actions_favorites">
          <FavoriteIcon />
        </div>
        <div className="header_actions_cart_holder">
          <IconButton
            color="inherit"
            aria-label="add to shopping cart"
            onClick={() => {
              setShowCart(!showCart);
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>

          {showCart ? <ShoppingCartComponent /> : null}
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
