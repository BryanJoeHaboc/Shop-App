import ButtonWithTheme from "../custom-button/ButtonWithTheme";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProductInterface from "../../../interfaces/product";
import {
  addCartItemToDB,
  addItem,
  checkOutItems,
  clearCart,
} from "../../features/shoppingCart/shoppingCartSlice";
import { useState } from "react";
import Modal from "../modal/Modal";
import MiniProducts from "../mini-products/MiniProducts";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../features/user/userSlice";
import LoginPage from "../../pages/login/LoginPage";
import "./LoginModal.scss";

type Props = {
  product: ProductInterface;
};

const UserActions = (props: Props) => {
  const [toggleLoginModal, setToggleLoginModal] = useState(false);

  const [toggleModal, setToggleModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUser);

  const handleAddItemToCart = async () => {
    const shoppingItem = {
      _id: props.product._id!.toString(),
      product: props.product,
      cartItem: {
        quantity: 1,
      },
    };

    if (user.firstName && user.token && user.userId) {
      console.log(user.firstName, user.token, user.userId);
      const result = await dispatch(addCartItemToDB(shoppingItem)).unwrap();
      console.log(result);
      if (result.message) {
        dispatch(addItem(shoppingItem));
      }
    } else {
      setToggleLoginModal(!toggleLoginModal);
    }
  };

  const handleCheckoutItems = async () => {
    const shoppingItem = {
      _id: props.product._id!.toString(),
      product: props.product,
      cartItem: {
        quantity: 1,
      },
    };

    const responseAddItem = await dispatch(
      addCartItemToDB(shoppingItem)
    ).unwrap();

    console.log(responseAddItem);

    if (responseAddItem.message) {
      const responseCheckout = await dispatch(checkOutItems()).unwrap();
      if (responseCheckout.message) {
        navigate("/orders");
      }
    }
  };

  return (
    <div className="flex__buttons__2">
      {/* <Button
            onClick={() => {
              handleAddItemToCart();
            }}
            size="large"
            variant="contained"
          >
            Add To Cart
          </Button>
          <Button size="large" variant="contained">
            Checkout
          </Button> */}
      <ButtonWithTheme display="Add To Cart" clickFunc={handleAddItemToCart} />
      <ButtonWithTheme
        display="Checkout"
        clickFunc={() => setToggleModal(!toggleModal)}
      />
      {toggleModal && (
        <Modal
          children={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              <h2>Do you want to proceed your checkout?</h2>
              <MiniProducts product={props.product} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px",
                  height: "50px",
                  width: "100%",
                }}
              >
                <ButtonWithTheme
                  sx={{ width: "150px" }}
                  display="Yes"
                  clickFunc={handleCheckoutItems}
                />
                <ButtonWithTheme
                  display="No"
                  clickFunc={() => setToggleModal(!toggleModal)}
                  sx={{ width: "150px" }}
                />
              </div>
            </div>
          }
          shown={toggleModal}
          close={() => setToggleModal(!toggleModal)}
          modalContentClass="modal-content-checkout"
        />
      )}
      {toggleLoginModal && (
        <Modal
          children={<LoginPage />}
          shown={toggleLoginModal}
          close={() => setToggleLoginModal(!toggleLoginModal)}
          modalContentClass={"login__modal"}
        />
      )}
    </div>
  );
};

export default UserActions;
