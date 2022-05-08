import "./ShoppingCartWindow.scss";

import { useAppSelector } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import ShoppingItemComponent from "../../components/shopping-item-window/ShoppingItemWindow";
import { getCart } from "../../features/shoppingCart/shoppingCartSlice";
import { useEffect } from "react";

const ShoppingCartComponent = () => {
  const shoppingCart = useAppSelector(getCart);
  useEffect(() => {
    console.log(shoppingCart);
  }, []);
  return (
    <div className="shopping_cart_container">
      {shoppingCart.items.length ? (
        shoppingCart.items.map(
          ({ product, cartItem: { quantity }, _id }: ShoppingItem) => (
            <ShoppingItemComponent
              key={_id}
              _id={_id}
              product={product}
              cartItem={{ quantity }}
            />
          )
        )
      ) : (
        <h1>No Items!</h1>
      )}
    </div>
  );
};

export default ShoppingCartComponent;
