import "./ShoppingCart.scss";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ShoppingItem from "../../../interfaces/shoppingItem";
import { RootState } from "../../app/store";
import { addItem } from "../../features/shoppingCart/shoppingCartSlice";
import { useState } from "react";

const ShoppingCartComponent = () => {
  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);
  const [cartItemId, setCartItemId] = useState("");

  const dispath = useAppDispatch();
  const handleIncreaseItemQty = (item) => {
    dispath(addItem(item));
  };

  const handleDecreaseItemQty = () => {};

  return (
    <div className="shopping_cart_container">
      {shoppingCart.items.length ? (
        shoppingCart.items.map(({ product, quantity }: ShoppingItem) => {
          return (
            <div className="shopping_cart_items">
              <img src={product.imageUrl} alt="" />
              <div className="shopping_cart_items_info">
                <p className="bold_900">{product.name}</p>
                <p className="bold_600">Price: {product.price}</p>
                <p className="bold_600">
                  {" "}
                  <span
                    onClick={() => {
                      handleDecreaseItemQty(product);
                    }}
                  >
                    Qty:
                  </span>{" "}
                  &#60; {quantity}{" "}
                  <span
                    onClick={() => {
                      handleIncreaseItemQty(product);
                    }}
                  >
                    &#62;
                  </span>
                </p>
              </div>
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
