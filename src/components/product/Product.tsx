import "./Product.scss";

import { useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/user/userSlice";
import AdminActions from "../admin/AdminActions";
import UserActions from "../user/UserActions";
import Product from "../../../interfaces/product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
  cssStyle?: string;
  enableDescription?: boolean;
};

export default function ProductComponent(props: Props) {
  const { name, imageUrl, price, description } = props.product;
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  const handleNavigateProductPage = () => {
    navigate(`/product/${props.product._id}`, {
      state: { product: props.product },
    });
  };

  return (
    <div
      className={`product_container ${props.cssStyle ? props.cssStyle : ""}`}
    >
      <img src={imageUrl} onClick={handleNavigateProductPage} alt="name" />
      <p>{name}</p>
      <p>${price}</p>
      {props.enableDescription ? description : null}
      {user.userType === "admin" ? (
        <div className="product_container_actions">
          <AdminActions product={props.product} />
        </div>
      ) : (
        <div className="product_container_actions">
          <UserActions product={props.product} />
        </div>
      )}
    </div>
  );
}
