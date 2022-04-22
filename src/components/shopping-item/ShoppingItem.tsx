import { useAppDispatch } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import {
  addItem,
  subtractItem,
} from "../../features/shoppingCart/shoppingCartSlice";
import "./ShoppingItem.scss";

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
    <div className="shopping_cart_page_items">
      <img src={product.imageUrl} alt="" />
      <div className="shopping_cart_page_items_info">
        <h1 className="bold_900">{product.name}</h1>
        <h2 className="bold_600">Price: {product.price}</h2>
        <h2 className="bold_600">
          {" "}
          Qty:
          <span
            className="pointer bold_900"
            onClick={() => {
              handleDecreaseItemQty(shoppingItem);
            }}
          >
            &#60; {quantity}{" "}
          </span>{" "}
          <span
            className="pointer bold_900"
            onClick={() => {
              handleIncreaseItemQty(shoppingItem);
            }}
          >
            &#62;
          </span>
        </h2>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default ShoppingItemComponent;
