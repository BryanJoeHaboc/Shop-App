import "./Product.scss";
import ProductInterface from "../../../interfaces/product";
import Button from "@mui/material/Button";

type Props = {
  product: ProductInterface;
};

export default function ProductComponent(props: Props) {
  // typeof props Props

  const { name, imageUrl, price } = props.product;
  return (
    <div className="product_container">
      <img src={imageUrl} alt="name" />
      <p>{name}</p>
      <p>${price}</p>
      <div className="product_container_actions">
        <Button size="large" variant="contained">
          Add To Cart
        </Button>
        <Button size="large" variant="contained">
          Checkout
        </Button>
      </div>
    </div>
  );
}
