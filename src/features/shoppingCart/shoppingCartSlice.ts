import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ShoppingCart from "../../../interfaces/shoppingCart";
import ShoppingItem from "../../../interfaces/shoppingItem";
import { RootState } from "../../app/store";
import ErrorPayload from "../../../interfaces/errorPayload";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SuccessMessage } from "../../../interfaces/successMessage";
import Product from "../../../interfaces/product";

const initialState: ShoppingCart = {
  items: [],
};

export const checkOutItems = createAsyncThunk<
  SuccessMessage,
  Product | null,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("cart/checkout", async (product, thunkApi) => {
  try {
    const { user } = thunkApi.getState() as RootState;

    const config: AxiosRequestConfig<any> = {
      method: "post",
      url: "/checkout/success",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
    };

    if (product) {
      config.data = { product };
    }

    const response = await axios(config);

    if (response.status !== 200) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }

    return response.data as SuccessMessage;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const deleteCartItemToDB = createAsyncThunk<
  SuccessMessage,
  ShoppingItem,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("cart/delete-item", async (prod, thunkApi) => {
  try {
    const product = { _id: prod.product._id };
    const { user } = thunkApi.getState() as RootState;
    const response = await axios({
      method: "delete",
      url: "/cart",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
      data: { item: product },
    });

    if (response.status !== 200) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }

    return response.data as SuccessMessage;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const subtractCartItemToDB = createAsyncThunk<
  SuccessMessage,
  ShoppingItem,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("cart/subtract-item", async (prod, thunkApi) => {
  try {
    const product = { _id: prod.product._id };
    const { user } = thunkApi.getState() as RootState;
    const response = await axios({
      method: "post",
      url: "/subtract-cart",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
      data: { item: product },
    });

    if (response.status !== 201) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }

    return response.data as SuccessMessage;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const addCartItemToDB = createAsyncThunk<
  SuccessMessage,
  ShoppingItem,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("cart/add-item", async (prod, thunkApi) => {
  try {
    const product = { _id: prod.product._id };
    const { user } = thunkApi.getState() as RootState;
    const response = await axios({
      method: "post",
      url: "/cart",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
      data: { item: product },
    });

    if (response.status !== 201) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }

    return response.data as SuccessMessage;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const getCartFromDB = createAsyncThunk<
  ShoppingCart,
  void,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("cart/getCart", async (_, thunkApi) => {
  try {
    const { user } = thunkApi.getState() as RootState;

    const response = await axios({
      method: "get",
      url: "/cart",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
    });

    if (response.status !== 200) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }

    return response.data as ShoppingCart;
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
        (item) => item.product._id === action.payload.product._id
      );
      if (index >= 0) {
        state.items[index].cartItem.quantity =
          state.items[index].cartItem.quantity + 1;
      } else {
        state.items.push({
          ...action.payload,
          cartItem: { quantity: 1 },
        });
      }
    },
    subtractItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );

      if (index >= 0) {
        if (state.items[index].cartItem.quantity === 1) {
          console.log("delete ");
          const tempItem = state.items.filter(
            (item) => item.product._id !== action.payload.product._id
          );
          state.items = tempItem;
        } else {
          console.log("sub 1");
          state.items[index].cartItem.quantity--;
        }
      }
    },
    deleteItem: (state, action: PayloadAction<ShoppingItem>) => {
      const tempItem = state.items.filter(
        (item) => item.product._id !== action.payload.product._id
      );
      state.items = tempItem;
    },
    deleteAllItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items = [];
    },
    addIdToCart: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setCart: (state, action) => {
      state.items = action.payload.items.map((product: any) => {
        return {
          cartItem: product.cartItem,
          product: {
            description: product.description,
            _id: product._id,
            imageUrl: product.imageUrl,
            price: product.price,
            title: product.title,
            name: product.name,
          },
        };
      });
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const totalAmount = (state: RootState) =>
  state.shoppingCart.items.reduce(
    (prev, curr) => prev + curr.cartItem.quantity * curr.product.price,
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
