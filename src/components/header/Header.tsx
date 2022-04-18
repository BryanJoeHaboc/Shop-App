import { Link, Outlet } from "react-router-dom";

import "./Header.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchBar from "../searchbar/searchbar.component";

export default function Header() {
  console.log("header called");
  return (
    <div className="header_container">
      <div className="header_logo_container">
        <FavoriteIcon />
      </div>
      <nav className="header_links">
        <Link to="/allproducts">All Products</Link>
        <Link to="/womens">Womens</Link>
        <Link to="/mens">Mens</Link>
        <Link to="/hats">Hats</Link>
        <Link to="/sneakers">Sneakers</Link>
        <Link to="/bags">Bags</Link>
      </nav>
      <div className="header_actions">
        <div className="header_actions_searchbar_container">
          <SearchBar />
        </div>
        <div className="header_actions_favorites">
          <FavoriteIcon />
        </div>
        <div className="header_actions_cart">
          <ShoppingCartIcon />
        </div>
      </div>
    </div>
  );
}
