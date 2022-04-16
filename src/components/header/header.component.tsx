import "./header.component.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchBar from "../searchbar/searchbar.component";

export default function Header() {
  return (
    <div className="header_container">
      <div className="header_logo_container">
        <FavoriteIcon />
      </div>
      <div className="header_links">
        <a href="#">Mens</a>
        <a href="#">Womens</a>
        <a href="#">Hats</a>
        <a href="#">Bags</a>
        <a href="#">Sneakers</a>
      </div>
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
