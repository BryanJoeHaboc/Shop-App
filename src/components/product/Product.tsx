import "./Product.scss";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/user/userSlice";
import AdminActions from "../admin/AdminActions";
import UserActions from "../user/UserActions";
import Product from "../../../interfaces/product";

type Props = {
  product: Product;
};

export default function ProductComponent(props: Props) {
  const user = useAppSelector(getUser);

  const { name, imageUrl, price } = props.product;
  return (
    <div className="product_container">
      <img src={imageUrl} alt="name" />
      <p>{name}</p>
      <p>${price}</p>
      {user.userType === "user" ? (
        <div className="product_container_actions">
          <UserActions product={props.product} />
        </div>
      ) : (
        <div className="product_container_actions">
          <AdminActions product={props.product} />
        </div>
      )}
    </div>
  );
}
