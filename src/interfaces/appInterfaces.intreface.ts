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
