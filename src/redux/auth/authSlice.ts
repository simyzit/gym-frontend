import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  fetchCurrentUser,
  googleApi,
  login,
  logout,
  register,
} from "./authOperation";
import {
  pendingReducer,
  rejectedReducer,
  userCurrentSuccessReducer,
  userGoogleLoginReducer,
  userLoginSuccessReducer,
  userLogoutSuccessReducer,
  userRegistrationSuccessReducer,
} from "./authReducer";
import { IAuthState } from "../../interfaces/user.interface";

const extraActions = [login, logout, register];
const getAction = (type: string) =>
  isAnyOf(...extraActions.map((action: any) => action[type]));

const initialState: IAuthState = {
  user: { email: "" },
  accessToken: "",
  isLoggedIn: false,
  isRefreshing: false,
  isRegister: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, userRegistrationSuccessReducer)
      .addCase(login.fulfilled, userLoginSuccessReducer)
      .addCase(logout.fulfilled, userLogoutSuccessReducer)
      .addCase(googleApi.fulfilled, userGoogleLoginReducer)
      .addCase(fetchCurrentUser.fulfilled, userCurrentSuccessReducer)
      .addMatcher(getAction("rejected"), rejectedReducer)
      .addMatcher(getAction("pending"), pendingReducer),
});

export const authReducer = authSlice.reducer;
