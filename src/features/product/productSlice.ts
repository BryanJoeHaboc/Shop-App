import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Product from "../../../interfaces/product";
import { RootState } from "../../app/store";
import Category from "../../../interfaces/category";

interface Products {
  collections: Category[];
  totalItems: number;
  status: "loading" | "success" | "failed" | "";
}

const initialState: Products = {
  collections: [],

  totalItems: 0,

  status: "",
};

interface ErrorPayload {
  status: number;
  message: string;
  data: [] | {};
}

export const getProductsFromDB = createAsyncThunk<
  // Return type of the payload creator
  Products,
  // First argument to the payload creator
  void,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("product/getAllProduct", async (_: void, thunkApi) => {
  try {
    const response = await axios.get("/products");
    if (response.status === 404) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }
    return response.data as Products;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addAllProducts: (state, action: PayloadAction<Products>) => {
      state.collections = action.payload.collections;
      state.totalItems = action.payload.totalItems;
    },
    addProduct: () => {},
    deleteProduct: () => {},
    editProduct: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsFromDB.fulfilled, (state, action) => {
      state.collections = action.payload.collections;
      state.status = "success";
    });
    builder.addCase(getProductsFromDB.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProductsFromDB.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const getProducts = (state: RootState) => {
  return state.product;
};

export const getCountAllProducts = (state: RootState) => {
  return state.product.totalItems;
};

export const getProuct = (state: RootState) => {};

export const { addAllProducts, addProduct, editProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
