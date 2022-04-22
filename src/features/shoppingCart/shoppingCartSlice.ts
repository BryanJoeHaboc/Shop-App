import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import ShoppingCart from "../../../interfaces/shoppingCart";
import ShoppingItem from "../../../interfaces/shoppingItem";
import { RootState } from "../../app/store";

const initialState: ShoppingCart = {
  _id: "lol",
  items: [],
  totalAmount: 0,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  // add item
  // minus item
  // delete all items
  // delete item
  // total item
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index >= 0) {
        state.items[index].quantity = state.items[index].quantity + 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    subtractItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      console.log(index);
      if (index >= 0) {
        if (state.items[index].quantity === 1) {
          const tempItem = state.items.filter(
            (item) => item._id !== action.payload._id
          );
          state.items = tempItem;
        } else {
          state.items[index].quantity = state.items[index].quantity - 1;
        }
      }
    },
    deleteItem: (state, action: PayloadAction<ShoppingItem>) => {
      const tempItem = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = tempItem;
    },
    deleteAllItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items = [];
    },
  },
});

export const totalAmount = (state: RootState) =>
  state.shoppingCart.items.reduce(
    (prev, curr) => prev + curr.quantity * curr.product.price,
    0
  );
export const { addItem, subtractItem, deleteAllItem, deleteItem } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
