import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LoggedInUser } from "../../../interfaces/user";
import { stat } from "fs";

const initialState: LoggedInUser = {
  jwtToken: "",
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
      state.jwtToken = action.payload.jwtToken;
      state.userType = action.payload.userType;
    },
    clearUser: (state, action: PayloadAction<LoggedInUser>) => {
      state.firstName = "";
      state.lastName = "";
      state.userId = "";
      state.jwtToken = "";
      state.userType = "";
    },
  },
});

export const getUser = (state: RootState) => {
  return state.user;
};

export default userSlice.reducer;
