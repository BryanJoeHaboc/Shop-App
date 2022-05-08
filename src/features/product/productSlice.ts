import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Product from "../../../interfaces/product";
import { RootState } from "../../app/store";
import Category from "../../../interfaces/category";
import { LoggedInUser } from "../../../interfaces/user";
import ErrorPayload from "../../../interfaces/errorPayload";
import {
  SuccessMessage,
  SuccessMessageAddProducts,
} from "../../../interfaces/successMessage";

export interface Products {
  collections: Category[];
  totalItems: number;
  status: "loading" | "success" | "failed" | "";
}

const initialState: Products = {
  collections: [],
  totalItems: 0,
  status: "",
};

export const editProductFromDB = createAsyncThunk<
  SuccessMessageAddProducts,
  Product,
  { rejectValue: ErrorPayload | AxiosError }
>("product/edit-product", async (product, thunkApi) => {
  try {
    const { user } = thunkApi.getState() as RootState;
    const response = await axios.post(
      "/admin/edit-product",
      {
        data: {
          product: product,
        },
      },
      {
        headers: {
          Authorization: `Bearer: ${user.token}`,
        },
      }
    );
    if (response.status !== 200) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }
    return response.data as SuccessMessageAddProducts;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const getAdminProductsFromDB = createAsyncThunk<
  Products,
  void,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("product/get-admin-product", async (_: void, thunkApi) => {
  try {
    const { user } = thunkApi.getState() as RootState;

    const response = await axios.get(`/admin/products/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
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

export const getProductsFromDB = createAsyncThunk<
  // Return type of the payload creator
  Products,
  // First argument to the payload creator
  void,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("product/get-all-product", async (_: void, thunkApi) => {
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

export const addProductsToDB = createAsyncThunk<
  SuccessMessageAddProducts,
  Product,
  {
    rejectValue: AxiosError | ErrorPayload;
  }
>("product/add-product", async (product, { getState, rejectWithValue }) => {
  try {
    const { user } = getState() as RootState;
    console.log(product);
    const response = await axios({
      method: "post",
      url: "/admin/add-product",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
      data: {
        product,
      },
    });

    const error = response.data as ErrorPayload;

    if (error.status === 422 || error.status === 500) {
      return rejectWithValue(error as ErrorPayload);
    }

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err as AxiosError);
  }
});

export const deleteProductFromDB = createAsyncThunk<
  SuccessMessage,
  Product,
  {
    rejectValue: AxiosError | ErrorPayload;
  }
>("product/delete-product", async (product, thunkApi) => {
  try {
    const { user }: { user: LoggedInUser } = thunkApi.getState() as RootState;
    const response = await axios.delete(`/admin/product/${product._id}`, {
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
      data: {
        userId: user.userId,
      },
    });

    const error = response.data as ErrorPayload;

    if (error.status === 401 || error.status === 500) {
      return thunkApi.rejectWithValue(error as ErrorPayload);
    }

    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error as AxiosError);
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
    addProduct: (state, action) => {
      const index = state.collections.findIndex(
        (category) => category.title === action.payload.title
      );
      const item = action.payload as Product;
      console.log(item);
      state.collections[index].items.push(item);
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      const index = state.collections.findIndex(
        (category) => category.title === action.payload.title
      );
      const tempArray = state.collections[index].items.filter(
        (product) => product._id !== action.payload._id
      );
      state.collections[index].items = tempArray;
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.collections.findIndex(
        (category) => category.title === action.payload.title
      );
      const tempArray = state.collections[index].items.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
      state.collections[index].items = tempArray;
      console.log(state.collections[index].items);
    },
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
    builder.addCase(addProductsToDB.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(addProductsToDB.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addProductsToDB.rejected, (state) => {
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

// export const getAdminProduct = (state: RootState) => {
//   const collections = state.product.collections;
// };

export const { addAllProducts, addProduct, editProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
