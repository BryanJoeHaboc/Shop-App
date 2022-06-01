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
  items: Product[];
  totalItems: number;
  categories: string[];
}

const initialState: Products = {
  items: [],
  totalItems: 0,
  categories: [],
};

export const searchProducts = (value: string) => {
  return (_: any, getState: () => RootState): Product[] => {
    const { product } = getState();

    return product.items.filter(
      (prod) =>
        prod.title.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
        prod.name.toUpperCase().indexOf(value.toUpperCase()) >= 0
    );
  };
};

export const getCollection = (category: string) => {
  return (_: any, getState: () => RootState): Category => {
    const { product } = getState() as RootState;

    const collection = product.items.filter((prod) => {
      return prod.title.toLowerCase() === category.toLowerCase();
    });

    const index = product.categories.findIndex(
      (cat) => cat.toLowerCase() === category.toLowerCase()
    );

    return {
      _id: index,
      items: collection,
      routeName: category,
      title: category.charAt(0).toUpperCase() + category.slice(1),
    } as Category;
  };
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
  { rows: Product[]; count: number },
  void,
  {
    rejectValue: ErrorPayload | AxiosError;
  }
>("product/get-admin-product", async (_: void, thunkApi) => {
  try {
    const { user } = thunkApi.getState() as RootState;
    console.log(user.userId);
    const response = await axios.get(`/admin/products/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.status === 404) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }
    return response.data as { rows: Product[]; count: number };
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const getProductsFromDB = createAsyncThunk<
  // Return type of the payload creator
  { rows: Product[]; count: number },
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

    return response.data as { rows: Product[]; count: number };
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
    addAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);

      const index = state.categories.findIndex(
        (cat) => cat === action.payload.title.toLowerCase()
      );

      if (index < 0) {
        state.categories.push(action.payload.title.toLowerCase());
      }
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (product) => product._id === action.payload._id
      );

      state.items = state.items
        .slice(0, index)
        .concat(state.items.slice(index + 1));
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const tempArray = state.items.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
      state.items = tempArray;
    },
    addCategory: (state, action: PayloadAction<Product>) => {
      const index = state.categories.findIndex(
        (cat) => cat === action.payload.title.toLowerCase()
      );

      if (index < 0) {
        state.categories.push(action.payload.title.toLowerCase());
      }
    },
    addCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    clearProducts: (state) => {
      state.categories = [];
      state.items = [];
      state.totalItems = 0;
    },
    addUploadedProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = state.items.concat(action.payload);
      console.log(state.items);
    },
  },
});

export const getProducts = (state: RootState) => {
  return state.product.items;
};

export const getCountAllProducts = (state: RootState) => {
  return state.product.items.length;
};

export const getCategories = (state: RootState) => {
  return state.product.categories;
};

export const {
  addAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
  addCategories,
  addCategory,
  clearProducts,
  addUploadedProducts,
} = productSlice.actions;

export default productSlice.reducer;
