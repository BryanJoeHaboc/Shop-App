import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import { useAppDispatch } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import {
  addItem,
  subtractItem,
  deleteItem,
} from "../../features/shoppingCart/shoppingCartSlice";
import { theme } from "../custom-button/CustomButton";
import "./ShoppingItem.scss";

const ShoppingItemComponent = ({ product, quantity, _id }: ShoppingItem) => {
  const dispatch = useAppDispatch();

  const shoppingItem = {
    _id,
    product,
    quantity: 1,
  };

  const handleIncreaseItemQty = (shoppingItem: ShoppingItem) => {
    dispatch(addItem(shoppingItem));
  };

  const handleDecreaseItemQty = (shoppingItem: ShoppingItem) => {
    dispatch(subtractItem(shoppingItem));
  };

  const handleDeleteItem = (shoppingItem: ShoppingItem) => {
    dispatch(deleteItem(shoppingItem));
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
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => {
              handleDeleteItem(shoppingItem);
            }}
            color="darkApple"
            variant="contained"
          >
            Delete Item
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ShoppingItemComponent;
