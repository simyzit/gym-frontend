import { PayloadAction } from "@reduxjs/toolkit";
import {
  IAuthState,
  IUserPayload,
  IUserRegistrationPayload,
} from "../../interfaces/user.interface";

export const userRegistrationSuccessReducer = (
  state: IAuthState,
  action: PayloadAction<IUserRegistrationPayload>
) => {
  state.user.email = action.payload.email;
  state.user.name = action.payload.name;
  state.isRegister = true;
};

export const userLoginSuccessReducer = (
  state: IAuthState,
  action: PayloadAction<IUserPayload>
) => {
  state.isLoggedIn = true;
  state.user.email = action.payload.email;
  state.accessToken = action.payload.accessToken;
};

export const userCurrentSuccessReducer = (
  state: IAuthState,
  action: PayloadAction<IUserPayload>
) => {
  state.isRefreshing = false;
  state.isLoggedIn = true;
  state.user.name = action.payload.name;
  state.user.email = action.payload.email;
};

export const userLogoutSuccessReducer = (state: IAuthState) => {
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.user = { name: "", email: "" };
  state.accessToken = "";
};

export const pendingReducer = (state: IAuthState) => {
  state.isRefreshing = true;
};

export const rejectedReducer = (state: IAuthState) => {
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.isRegister = false;
};
