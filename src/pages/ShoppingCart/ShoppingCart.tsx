import "./ShoppingCart.scss";

import { useAppSelector } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import { RootState } from "../../app/store";

const ShoppingCartComponent = () => {
  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);

  return (
    <div className="shopping_cart_container">
      {shoppingCart.items.length ? (
        shoppingCart.items.map((cartItem: ShoppingItem) => {
          return (
            <div className="shopping_cart_items">
              <img src={cartItem.product.imageUrl} alt="" />
              <p>{cartItem.product.name}</p>
              <p>{cartItem.product.price}</p>
              <p>{cartItem.quantity}</p>
            </div>
          );
        })
      ) : (
        <h1>No Items!</h1>
      )}
    </div>
  );
};

export default ShoppingCartComponent;
