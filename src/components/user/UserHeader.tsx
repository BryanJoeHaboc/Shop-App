import { Link } from "react-router-dom";

const UserHeader = () => {
  return (
    <nav className="header_links">
      <Link to="/products">All Products</Link>
      <Link to="/products/womens">Womens</Link>
      <Link to="/products/mens">Mens</Link>
      <Link to="/products/hats">Hats</Link>
      <Link to="/products/sneakers">Sneakers</Link>
      <Link to="/products/bags">Bags</Link>
    </nav>
  );
};

export default UserHeader;
