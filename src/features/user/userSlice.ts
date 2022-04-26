import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LoggedInUser } from "../../../interfaces/user";

const initialState: LoggedInUser = {
  token: "",
  userId: "",
  firstName: "",
  lastName: "",
  userType: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoggedInUser>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
    },
    clearUser: (state, action: PayloadAction<LoggedInUser>) => {
      state.firstName = "";
      state.lastName = "";
      state.userId = "";
      state.token = "";
      state.userType = "";
    },
  },
});

export const getUser = (state: RootState) => {
  return state.user;
};

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
