import "./Product.scss";
import ProductInterface from "../../../interfaces/product";
import Button from "@mui/material/Button";

import { addItem } from "../../features/shoppingCart/shoppingCartSlice";
import { useAppDispatch } from "../../app/hooks";

type Props = {
  product: ProductInterface;
};

export default function ProductComponent(props: Props) {
  // typeof props Props

  const dispatch = useAppDispatch();

  const handleAddItemToCart = () => {
    const shoppingItem = {
      _id: props.product._id!.toString(),
      product: props.product,
      quantity: 1,
    };

    dispatch(addItem(shoppingItem));
  };

  const { name, imageUrl, price } = props.product;
  return (
    <div className="product_container">
      <img src={imageUrl} alt="name" />
      <p>{name}</p>
      <p>${price}</p>
      <div className="product_container_actions">
        <Button
          onClick={() => {
            handleAddItemToCart();
          }}
          size="large"
          variant="contained"
        >
          Add To Cart
        </Button>
        <Button size="large" variant="contained">
          Checkout
        </Button>
      </div>
    </div>
  );
}
