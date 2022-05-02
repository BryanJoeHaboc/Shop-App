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

type SuccessMessage = {
  message: string;
};

export const addProductsToDB = createAsyncThunk<
  SuccessMessage,
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

    return response.data as SuccessMessage;
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
    const { user } = thunkApi.getState() as RootState;
    const response = await axios.post(`/admin/delete/${product._id}`, {
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

    return response.data as SuccessMessage;
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
    addProduct: (state, action: PayloadAction<Product>) => {
      // const index = state.collections.findIndex(
      //   (category) => category.title === action.payload.title
      // );
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
