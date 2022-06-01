import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/user/userSlice";

const UserHeader = () => {
  const user = useAppSelector(getUser);
  return (
    <nav className="header_links">
      {user.token && <Link to="/orders">Orders</Link>}
      {user.token && <Link to="/cart">Cart</Link>}
      <Link to="/products">All Products</Link>
      <Link to="/products/womens">Womens</Link>
      <Link to="/products/mens">Mens</Link>
      <Link to="/products/hats">Hats</Link>
      <Link to="/products/sneakers">Sneakers</Link>
      {/* <Link to="/products/bags">Bags</Link> */}
    </nav>
  );
};

export default UserHeader;
