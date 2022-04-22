import "./ShoppingCartWindow.scss";

import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ShoppingItem from "../../../interfaces/shoppingItem";
import ShoppingItemComponent from "../../components/shopping-item-window/ShoppingItemWindow";

const ShoppingCartComponent = () => {
  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);

  return (
    <div className="shopping_cart_container">
      {shoppingCart.items.length ? (
        shoppingCart.items.map(({ product, quantity, _id }: ShoppingItem) => (
          <ShoppingItemComponent
            key={_id}
            _id={_id}
            product={product}
            quantity={quantity}
          />
        ))
      ) : (
        <h1>No Items!</h1>
      )}
    </div>
  );
};

export default ShoppingCartComponent;
