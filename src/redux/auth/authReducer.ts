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
  state.isRegister = true;
};

export const userLoginSuccessReducer = (
  state: IAuthState,
  action: PayloadAction<IUserPayload>
) => {
  debugger;
  state.isLoggedIn = true;
  state.accessToken = action.payload.accessToken;
  state.user.email = action.payload.email;
  state.user.qrCode = action.payload.qrCode;
};

export const userCurrentSuccessReducer = (
  state: IAuthState,
  action: PayloadAction<IUserPayload>
) => {
  state.isRefreshing = false;
  state.isLoggedIn = true;
  state.user = action.payload;
};

export const userLogoutSuccessReducer = (state: IAuthState) => {
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.user = { email: "" };
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

export const userGoogleLoginReducer = (
  state: IAuthState,
  action: PayloadAction<IUserPayload>
) => {
  state.isLoggedIn = true;
  state.user.email = action.payload.email;
  state.accessToken = action.payload.accessToken;
};

export const editUserReducer = (
  state: IAuthState,
  action: PayloadAction<IUserPayload>
) => {
  state.user.name = action.payload.name;
  state.user.surname = action.payload.surname;
  state.user.email = action.payload.email;
  state.user.phone = action.payload.phone;
};

export const updateAvatarReducer = (
  state: IAuthState,
  action: PayloadAction<IUserPayload>
) => {
  state.user.avatarURL = action.payload.avatarURL;
};
