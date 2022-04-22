import { useAppDispatch } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import {
  addItem,
  subtractItem,
} from "../../features/shoppingCart/shoppingCartSlice";
import "./ShoppingItemWindow.scss";

const ShoppingItemComponent = ({ product, quantity, _id }: ShoppingItem) => {
  const dispath = useAppDispatch();

  const shoppingItem = {
    _id,
    product,
    quantity: 1,
  };

  const handleIncreaseItemQty = (shoppingItem: ShoppingItem) => {
    dispath(addItem(shoppingItem));
  };

  const handleDecreaseItemQty = (shoppingItem: ShoppingItem) => {
    dispath(subtractItem(shoppingItem));
  };

  return (
    <div className="shopping_cart_items">
      <img src={product.imageUrl} alt="" />
      <div className="shopping_cart_items_info">
        <p className="bold_900">{product.name}</p>
        <p className="bold_600">Price: {product.price}</p>
        <p className="bold_600">
          {" "}
          Qty:
          <span
            className="pointer"
            onClick={() => {
              handleDecreaseItemQty(shoppingItem);
            }}
          >
            &#60; {quantity}{" "}
          </span>{" "}
          <span
            className="pointer"
            onClick={() => {
              handleIncreaseItemQty(shoppingItem);
            }}
          >
            &#62;
          </span>
        </p>
      </div>
    </div>
  );
};

export default ShoppingItemComponent;
