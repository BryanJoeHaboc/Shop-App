import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../../../interfaces/product";
import ShoppingCart from "../../../interfaces/shoppingCart";
import ShoppingItem from "../../../interfaces/shoppingItem";
import { RootState } from "../../app/store";
import ErrorPayload from "../../../interfaces/errorPayload";
import axios, { AxiosError } from "axios";

const initialState: ShoppingCart = {
  items: [],
};

export const getCartFromDB = createAsyncThunk<
  ShoppingCart,
  void,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("cart/getCart", async (_, thunkApi) => {
  const { user } = thunkApi.getState() as RootState;

  try {
    const response = await axios({
      method: "get",
      url: "/cart",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
    });

    const error = response.data as ErrorPayload;

    if (error.status !== 200) {
      return thunkApi.rejectWithValue(error as ErrorPayload);
    }

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

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
    addIdToCart: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setCart: (state, action: PayloadAction<ShoppingCart>) => {
      state = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const totalAmount = (state: RootState) =>
  state.shoppingCart.items.reduce(
    (prev, curr) => prev + curr.quantity * curr.product.price,
    0
  );

export const getCart = (state: RootState) => state.shoppingCart;

export const {
  addItem,
  subtractItem,
  deleteAllItem,
  deleteItem,
  addIdToCart,
  setCart,
  clearCart,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
