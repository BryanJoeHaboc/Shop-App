import "./ShoppingCartWindow.scss";

import { useAppSelector } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import ShoppingItemComponent from "../../components/shopping-item-window/ShoppingItemWindow";
import { getCart } from "../../features/shoppingCart/shoppingCartSlice";

const ShoppingCartComponent = () => {
  const shoppingCart = useAppSelector(getCart);
  return (
    <div className="shopping_cart_container">
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
    </div>
  );
};

export default ShoppingCartComponent;
