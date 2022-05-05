import { Button } from "@mui/material";
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
  const handleDelete = async () => {
    const result = await dispatch(deleteProductFromDB(props.product)).unwrap();
    console.log(result);
    dispatch(deleteProduct(props.product));
  };

  return (
    <div className="admin__actions__container flex__buttons__05">
      <ButtonWithTheme display="Edit Product" />
      <ButtonWithTheme
        clickFunc={handleDelete}
        display="Delete Product"
        color="darkApple"
      />
    </div>
  );
};

export default AdminActions;
