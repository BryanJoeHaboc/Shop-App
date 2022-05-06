import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Product from "../../../interfaces/product";
import { useAppDispatch } from "../../app/hooks";
import {
  deleteProduct,
  deleteProductFromDB,
} from "../../features/product/productSlice";
import ButtonWithTheme from "../custom-button/ButtonWithTheme";

type Props = {
  product: Product;
};

const AdminActions = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await dispatch(deleteProductFromDB(props.product)).unwrap();
    console.log(result);
    dispatch(deleteProduct(props.product));
  };

  const handleEdit = () => {
    navigate("/admin/addproduct", { state: props.product });
  };

  return (
    <div className="admin__actions__container flex__buttons__05">
      <ButtonWithTheme display="Edit Product" clickFunc={handleEdit} />
      <ButtonWithTheme
        clickFunc={handleDelete}
        display="Delete Product"
        color="darkApple"
      />
    </div>
  );
};

export default AdminActions;
