import { Link } from "react-router-dom";

import "./Header.scss";

import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchBar from "../searchbar/searchbar.component";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";

export default function Header() {
  return (
    <div className="header_container">
      <div className="header_logo_container">
        <Link to="/">
          {" "}
          <FavoriteIcon />
        </Link>
      </div>
      <nav className="header_links">
        <Link to="/products">All Products</Link>
        <Link to="/products/womens">Womens</Link>
        <Link to="/products/mens">Mens</Link>
        <Link to="/products/hats">Hats</Link>
        <Link to="/products/sneakers">Sneakers</Link>
        <Link to="/products/bags">Bags</Link>
      </nav>
      <div className="header_actions">
        <div className="header_actions_searchbar_container">
          <SearchBar />
        </div>
        <div className="header_actions_favorites">
          <FavoriteIcon />
        </div>

        <IconButton
          id="lblCartCount"
          color="inherit"
          aria-label="add to shopping cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </div>
    </div>
  );
}
