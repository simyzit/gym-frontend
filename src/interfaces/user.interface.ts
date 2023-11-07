import { ComponentType } from "react";

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatarURL: string;
  role: string;
  password: string;
  accessToken: string;
}

export interface IRegisterUser {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IForgetPassword {
  email: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthState {
  user: {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    avatarURL?: string;
  };
  accessToken: string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isRegister: boolean;
}

export interface IRouteProps {
  component: ComponentType;
  redirectTo?: string;
}

export interface IUserRegistrationPayload {
  email: string;
  accessToken?: string;
}

export interface IUserPayload {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatarURL: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatarURL: string;
  role: string;
}

export interface IUserStore {
  allItems: IUser[];
  isLoading: boolean;
}
