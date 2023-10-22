import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { googleApi, login, logout, register } from "./authOperation";
import {
  pendingReducer,
  rejectedReducer,
  userGoogleLoginReducer,
  userLoginSuccessReducer,
  userLogoutSuccessReducer,
  userRegistrationSuccessReducer,
} from "./authReducer";

const extraActions = [login, logout, register];
const getAction = (type: string) =>
  isAnyOf(...extraActions.map((action: any) => action[type]));

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { email: "" },
    accessToken: "",
    isLoggedIn: false,
    isRefreshing: false,
    isRegister: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, userRegistrationSuccessReducer)
      .addCase(login.fulfilled, userLoginSuccessReducer)
      .addCase(logout.fulfilled, userLogoutSuccessReducer)
      .addCase(googleApi.fulfilled, userGoogleLoginReducer)
      .addMatcher(getAction("rejected"), rejectedReducer)
      .addMatcher(getAction("pending"), pendingReducer),
});

export const authReducer = authSlice.reducer;
