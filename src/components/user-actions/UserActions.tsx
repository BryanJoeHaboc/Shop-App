import ButtonWithTheme from "../custom-button/ButtonWithTheme";
import { useAppDispatch } from "../../app/hooks";
import ProductInterface from "../../../interfaces/product";
import { addItem } from "../../features/shoppingCart/shoppingCartSlice";

type Props = {
  product: ProductInterface;
};

const UserActions = (props: Props) => {
  const dispatch = useAppDispatch();
  const handleAddItemToCart = () => {
    const shoppingItem = {
      _id: props.product._id!.toString(),
      product: props.product,
      quantity: 1,
    };

    dispatch(addItem(shoppingItem));
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
      <ButtonWithTheme display="Checkout" />
    </div>
  );
};

export default UserActions;
