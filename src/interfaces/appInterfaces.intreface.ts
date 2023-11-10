import { ComponentType } from "react";

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignInFormProps {
  setModal: (value: boolean) => void;
}

export interface ISignUpForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

export interface ICustomError extends Error {
  name: string;
  messsage: string;
  status: number;
}

export interface IRouteProps {
  component: ComponentType;
  redirectTo?: string;
}
