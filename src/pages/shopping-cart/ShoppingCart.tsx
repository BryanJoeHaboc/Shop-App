import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ShoppingItem from "../../../interfaces/shoppingItem";
import ShoppingItemComponent from "../../components/shopping-item/ShoppingItem";
import {
  checkOutItems,
  clearCart,
  totalAmount,
} from "../../features/shoppingCart/shoppingCartSlice";
import Modal from "../../components/modal/Modal";

import "./ShoppingCart.scss";
import ButtonWithTheme from "../../components/custom-button/ButtonWithTheme";
import { useState } from "react";

const ShoppingCartComponent = () => {
  const [toggleModal, setToggleModal] = useState(true);

  const shoppingCart = useAppSelector((state: RootState) => state.shoppingCart);
  const total = useAppSelector(totalAmount);
  const dispatch = useAppDispatch();

  const handleCheckoutItems = async () => {
    const result = await dispatch(checkOutItems()).unwrap();

    if (result.message) {
      dispatch(clearCart());
      setToggleModal(!toggleModal);
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
          clickFunc={() => setToggleModal(!toggleModal)}
        />
        <h1>Total: ${total}</h1>
      </div>
      <div className="modal__checkout__item__confirm">
        <Modal
          children={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",

                gap: "20px",
                // background: "red",
              }}
            >
              <h1>Are you sure you want to checkout your items?</h1>
              <div style={{ display: "flex", gap: "40px" }}>
                <ButtonWithTheme
                  display="Yes"
                  color="darkApple"
                  clickFunc={handleCheckoutItems}
                  size="large"
                />
                <ButtonWithTheme
                  display="No"
                  color="darkApple"
                  clickFunc={() => setToggleModal(!toggleModal)}
                />
              </div>
            </div>
          }
          shown={toggleModal}
          close={() => setToggleModal(!toggleModal)}
        />
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
