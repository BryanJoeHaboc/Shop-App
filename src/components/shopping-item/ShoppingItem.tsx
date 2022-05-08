import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import { useAppDispatch } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import {
  addItem,
  subtractItem,
  deleteItem,
  addCartItemToDB,
} from "../../features/shoppingCart/shoppingCartSlice";
import { theme } from "../custom-button/CustomButton";
import "./ShoppingItem.scss";
import { useEffect } from "react";

const ShoppingItemComponent = ({
  product,
  cartItem: { quantity },
}: ShoppingItem) => {
  const dispatch = useAppDispatch();

  const shoppingItem = {
    product,
    cartItem: {
      quantity: 1,
    },
  };

  useEffect(() => {
    console.log("hello nasa shopping item tayo");
  }, []);

  const handleIncreaseItemQty = async (shoppingItem: ShoppingItem) => {
    const result = await dispatch(addCartItemToDB(shoppingItem)).unwrap();
    console.log(result);
    if (result.message) {
      dispatch(addItem(shoppingItem));
    }
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
