import React, { FC, useState } from "react";
import cl from "./SignupFormStyles.module.css";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  SubmitHandler,
  useForm,
  Controller,
  useFormState,
} from "react-hook-form";
import {
  emailValidation,
  firstNameValidation,
  passwordValidation,
  phoneValidation,
} from "./validation";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ISignUpForm } from "../../interfaces/appInterfaces.intreface";
import { register } from "../../redux/auth/authOperation";
import { IRegisterUser } from "../../interfaces/user.interface";
import { useNavigate } from "react-router-dom";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface ISignupFormProps {
  setModal: (value: boolean) => void;
}

const SignupForm: FC<ISignupFormProps> = ({ setModal }) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<ISignUpForm>();
  const { errors } = useFormState({
    control,
  });
  const navigate = useNavigate();

  const onSubmit = async (values: IRegisterUser) => {
    if (!values) {
      return;
    }

    dispatch(register(values));

    setModal(false);
    navigate("/");
  };

  return (
    <Box className={cl.signupForm}>
      <Typography variant="h5" component="div" color={"black"}>
        Sign up
      </Typography>
      <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          rules={firstNameValidation}
          render={({ field }) => (
            <TextField
              label="First name"
              size="small"
              margin="normal"
              className={cl.signupFormInput}
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="surname"
          rules={firstNameValidation}
          render={({ field }) => (
            <TextField
              label="Surname name"
              size="small"
              margin="normal"
              className={cl.signupFormInput}
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              error={!!errors.surname?.message}
              helperText={errors.surname?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={emailValidation}
          render={({ field }) => (
            <TextField
              label="Email"
              size="small"
              margin="normal"
              className={cl.authFormInput}
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          rules={phoneValidation}
          render={({ field }) => (
            <TextField
              label="Phone"
              size="small"
              margin="normal"
              className={cl.signupFormInput}
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              error={!!errors.phone?.message}
              helperText={errors.phone?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Password"
              size="small"
              type="password"
              margin="normal"
              className={cl.authFormInput}
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          sx={{
            marginTop: 2,
          }}
        >
          Sign up
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
