import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import ErrorPayload from "../../../interfaces/errorPayload";
import { RootState } from "../../app/store";
import { Orders } from "../../../interfaces/order";

const initialState: Orders = {
  _id: 0,
  createdAt: "05-09-2022",
  updatedAt: "05-09-2022",
  userId: 0,
  products: [],
};

// export const getInvoice = createAsyncThunk<>(
//   "order/get-invoice",
//   async (_, thunkApi) => {}
// );

export const getOrdersFromDB = createAsyncThunk<
  { orders: Orders[] },
  void,
  { rejectValue: ErrorPayload | AxiosError }
>("order/get-orders", async (_, thunkApi) => {
  try {
    const { user } = thunkApi.getState() as RootState;
    const response = await axios({
      method: "get",
      url: "/orders",
      headers: {
        Authorization: `Bearer: ${user.token}`,
      },
    });

    if (response.status !== 200) {
      return thunkApi.rejectWithValue(response.data as ErrorPayload);
    }

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      return thunkApi.rejectWithValue(err as AxiosError);

    return thunkApi.rejectWithValue(err as ErrorPayload);
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
