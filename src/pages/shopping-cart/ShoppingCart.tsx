import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ShoppingItem from "../../../interfaces/shoppingItem";
import ShoppingItemComponent from "../../components/shopping-item/ShoppingItem";
import {
  checkOutItems,
  clearCart,
  totalAmount,
} from "../../features/shoppingCart/shoppingCartSlice";

import "./ShoppingCart.scss";
import ButtonWithTheme from "../../components/custom-button/ButtonWithTheme";

const ShoppingCartComponent = () => {
  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);
  const total = useAppSelector(totalAmount);
  const dispatch = useAppDispatch();

  const handleCheckoutItems = async () => {
    const result = await dispatch(checkOutItems()).unwrap();

    if (result.message) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="shopping_cart_page_container">
      {shoppingCart.items.length ? (
        shoppingCart.items.map(
          ({ product, cartItem: { quantity } }: ShoppingItem) => (
            <ShoppingItemComponent
              key={product._id}
              product={product}
              cartItem={{ quantity }}
            />
          )
        )
      ) : (
        <h1>No Items!</h1>
      )}
      <div className="button-flex">
        <ButtonWithTheme
          display="Checkout"
          color="darkApple"
          clickFunc={handleCheckoutItems}
        />
        <h1>Total: ${total}</h1>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
