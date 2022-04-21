import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import ShoppingCart from "../../../interfaces/shoppingCart";
import ShoppingItem from "../../../interfaces/shoppingItem";

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
  // delete cart
  // delete item
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
      if (index >= 0) {
        if (state.items[index].quantity === 1) {
          // delete item
        } else {
          state.items[index].quantity = state.items[index].quantity - 1;
        }
      }
    },
  },
});

export const { addItem, subtractItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
