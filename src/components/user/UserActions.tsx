import ButtonWithTheme from "../custom-button/ButtonWithTheme";
import { useAppDispatch } from "../../app/hooks";
import ProductInterface from "../../../interfaces/product";
import {
  addCartItemToDB,
  addItem,
  checkOutItems,
  clearCart,
} from "../../features/shoppingCart/shoppingCartSlice";

type Props = {
  product: ProductInterface;
};

const UserActions = (props: Props) => {
  const dispatch = useAppDispatch();

  const handleAddItemToCart = async () => {
    const shoppingItem = {
      _id: props.product._id!.toString(),
      product: props.product,
      cartItem: {
        quantity: 1,
      },
    };

    const result = await dispatch(addCartItemToDB(shoppingItem)).unwrap();
    console.log(result);
    if (result.message) {
      dispatch(addItem(shoppingItem));
    }
  };

  const handleCheckoutItems = async () => {
    const result = await dispatch(checkOutItems()).unwrap();

    if (result.message) {
      dispatch(clearCart());
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
      <ButtonWithTheme display="Checkout" clickFunc={handleCheckoutItems} />
    </div>
  );
};

export default UserActions;
