import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import shoppingCartReducer from "../features/shoppingCart/shoppingCartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
