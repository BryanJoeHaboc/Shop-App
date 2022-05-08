import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ShoppingItem from "../../../interfaces/shoppingItem";
import ShoppingItemComponent from "../../components/shopping-item/ShoppingItem";
import { totalAmount } from "../../features/shoppingCart/shoppingCartSlice";
import { theme } from "../../components/custom-button/CustomButton";
import "./ShoppingCart.scss";

const ShoppingCartComponent = () => {
  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);
  const total = useAppSelector(totalAmount);
  return (
    <div className="shopping_cart_page_container">
      {shoppingCart.items.length ? (
        shoppingCart.items.map(
          ({ product, cartItem: { quantity } }: ShoppingItem) => (
            <ShoppingItemComponent
              key={product._id}
              product={product}
              _id={product._id!.toString()}
              cartItem={{ quantity }}
            />
          )
        )
      ) : (
        <h1>No Items!</h1>
      )}
      <div className="button-flex">
        <ThemeProvider theme={theme}>
          <Button onClick={() => {}} color="darkApple" variant="contained">
            Checkout
          </Button>
        </ThemeProvider>
        <h1>Total: ${total}</h1>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
