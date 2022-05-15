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
      // state.collections = action.payload.collections;
      // state.totalItems = action.payload.totalItems;
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      // const index = state.collections.findIndex(
      //   (category) => category.title === action.payload.title
      // );
      // if (index < 0) {
      //   state.collections.push({
      //     _id: state.collections.length + 1,
      //     title: action.payload.title,
      //     routeName:
      //       action.payload.title.charAt(0).toUpperCase() +
      //       action.payload.title.slice(1),
      //     items: [],
      //   });
      //   state.collections[state.collections.length + 1].items.push(
      //     action.payload
      //   );
      // } else {
      //   const item = action.payload as Product;
      //   console.log(item);
      //   state.collections[index].items.push(item);
      // }
      state.items.push(action.payload);

      const index = state.categories.findIndex(
        (cat) => cat === action.payload.title.toLowerCase()
      );

      if (index < 0) {
        state.categories.push(action.payload.title.toLowerCase());
      }
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      // const index = state.collections.findIndex(
      //   (category) => category.title === action.payload.title
      // );

      // const collections = state.collections[index];

      // const tempArray: Product[] = state.collections[index].items.filter(
      //   (product) => product._id !== action.payload._id
      // );

      // state.collections[index] = {
      //   _id: collections._id,
      //   routeName: collections.routeName,
      //   title: collections.title,
      //   items: tempArray,
      // };
      state.items = state.items.filter(
        (product) => product._id !== action.payload._id
      );
      console.log(state.items);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      //   const index = state.collections.findIndex(
      //     (category) => category.title === action.payload.title
      //   );
      //   const tempArray = state.collections[index].items.map((product) => {
      //     if (product._id === action.payload._id) {
      //       return action.payload;
      //     }
      //     return product;
      //   });
      //   state.collections[index].items = tempArray;
      // },

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
  },

  // extraReducers: (builder) => {
  //   builder.addCase(getProductsFromDB.fulfilled, (state, action) => {
  //     state.collections = action.payload.collections;
  //     state.status = "success";
  //   });
  //   builder.addCase(getProductsFromDB.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(getProductsFromDB.rejected, (state, action) => {
  //     state.status = "failed";
  //   });
  //   builder.addCase(addProductsToDB.fulfilled, (state) => {
  //     state.status = "success";
  //   });
  //   builder.addCase(addProductsToDB.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(addProductsToDB.rejected, (state) => {
  //     state.status = "failed";
  //   });
  // },
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

// export const getAdminProduct = (state: RootState) => {
//   const collections = state.product.collections;
// };

export const {
  addAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
  addCategories,
  addCategory,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;
