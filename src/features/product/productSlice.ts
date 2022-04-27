import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Product from "../../../interfaces/product";
import { RootState } from "../../app/store";

interface Products {
  products: Product[];
  status: "loading" | "success" | "failed" | "";
}

interface ProductsPayload {
  products: Product[];
  count: number;
}

const initialState: Products = {
  products: [],
  status: "",
};

const getProductsFromDB = createAsyncThunk(
  "product/getAllProduct",
  async (_: void, thunkAPI) => {
    const response = await axios.get("/products");

    return response.data as ProductsPayload;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProductsFromDB.fulfilled,
      (state, action: PayloadAction<ProductsPayload>) => {
        state.products = action.payload.products;
        state.status = "success";
      }
    );
    builder.addCase(getProductsFromDB.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProductsFromDB.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const getProducts = (state: RootState) => {
  return state.product;
};

export const {} = productSlice.actions;

export default productSlice.reducer;
