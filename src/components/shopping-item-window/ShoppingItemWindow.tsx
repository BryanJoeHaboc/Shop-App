import { useAppDispatch } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import {
  addCartItemToDB,
  addItem,
  subtractItem,
} from "../../features/shoppingCart/shoppingCartSlice";
import "./ShoppingItemWindow.scss";

const ShoppingItemComponent = ({
  product,
  cartItem: { quantity },
}: ShoppingItem) => {
  const dispatch = useAppDispatch();

  const shoppingItem = {
    product,
    cartItem: { quantity: 1 },
  };

  const handleIncreaseItemQty = async (shoppingItem: ShoppingItem) => {
    console.log("product", product);
    const result = await dispatch(addCartItemToDB(shoppingItem)).unwrap();
    console.log(result);
    if (result.message) {
      dispatch(addItem(shoppingItem));
    }
  };

  const handleDecreaseItemQty = (shoppingItem: ShoppingItem) => {
    dispatch(subtractItem(shoppingItem));
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
