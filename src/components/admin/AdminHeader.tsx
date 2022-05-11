import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <nav className="header_links">
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/addproduct">Add Product</Link>
    </nav>
  );
};

export default AdminHeader;
