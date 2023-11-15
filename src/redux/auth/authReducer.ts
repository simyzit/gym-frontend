import { PayloadAction } from "@reduxjs/toolkit";
import {
  IAuthState,
  IUpdateUserAvatarPayload,
  IUserCurrentSuccessPayload,
  IUserEditPayload,
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
  state.isLoggedIn = true;
  state.accessToken = action.payload.accessToken;
  state.user.email = action.payload.user.email;
  state.user.qrCode = action.payload.user.qrCode;
  state.user.avatarURL = action.payload.user.avatarURL;
  state.user.phone = action.payload.user.phone;
  state.user.role = action.payload.user.role;
  state.user.name = action.payload.user.name;
  state.user.surname = action.payload.user.surname;
};

export const userCurrentSuccessReducer = (
  state: IAuthState,
  action: PayloadAction<IUserCurrentSuccessPayload>
) => {
  state.isRefreshing = false;
  state.isLoggedIn = true;
  state.user.name = action.payload.name;
  state.user.surname = action.payload.surname;
  state.user.phone = action.payload.phone;
  state.user.avatarURL = action.payload.avatarURL;
  state.user.email = action.payload.email;
  state.user.role = action.payload.role;
  state.user.qrCode = state.user.qrCode;
};

export const userLogoutSuccessReducer = (state: IAuthState) => {
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.user = {
    email: "",
    name: "",
    surname: "",
    avatarURL: "",
    role: "",
    phone: "",
    qrCode: "",
  };
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
  state.user.email = action.payload.user.email;
  state.user.qrCode = action.payload.user.qrCode;
  state.accessToken = action.payload.accessToken;
};

export const editUserReducer = (
  state: IAuthState,
  action: PayloadAction<IUserEditPayload>
) => {
  state.user.name = action.payload.name;
  state.user.surname = action.payload.surname;
  state.user.email = action.payload.email;
  state.user.phone = action.payload.phone;
};

export const updateAvatarReducer = (
  state: IAuthState,
  action: PayloadAction<IUpdateUserAvatarPayload>
) => {
  state.user.avatarURL = action.payload.avatarURL;
};
