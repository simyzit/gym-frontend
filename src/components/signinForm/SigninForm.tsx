import React, { FC } from "react";
import cl from "./SigninFormStyles.module.css";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm, Controller, useFormState } from "react-hook-form";
import { emailValidation, passwordValidation } from "./validation";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { ISignInFormProps } from "../../interfaces/appInterfaces.intreface";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authOperation";
import { IForgetPassword, ILoginUser } from "../../interfaces/user.interface";
import { useCustomSelector } from "../../redux/selectors";
import { FaGoogle } from "react-icons/fa";
import { instance } from "../../axios";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const SigninForm: FC<ISignInFormProps> = ({ setModal }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<ILoginUser>();
  const { getIsLoggedIn } = useCustomSelector();
  const { errors } = useFormState({
    control,
  });
  const [toggleForm, setTogleForm] = React.useState(false);

  const onSubmit = async (values: ILoginUser) => {
    if (!values) {
      return;
    }

    if (!values.password) {
      console.log(values);
      instance.patch(`auth/forgot/password/${values.email}`);

      setModal(false);
    } else {
      await dispatch(login(values));

      setModal(false);
      navigate("/profile");
    }
  };

  return (
    <Box className={cl.signinForm}>
      {!toggleForm ? (
        <>
          <Typography variant="h5" component="div" color={"black"}>
            Sign in
          </Typography>
          <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="email"
              rules={emailValidation}
              render={({ field }) => (
                <TextField
                  label="Email"
                  size="small"
                  margin="normal"
                  fullWidth={true}
                  onChange={field.onChange}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={passwordValidation}
              render={({ field: { onChange } }) => (
                <TextField
                  label="Password"
                  size="small"
                  type="password"
                  margin="normal"
                  className={cl.authFormInput}
                  fullWidth={true}
                  onChange={onChange}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              )}
            />
            <p onClick={() => setTogleForm(true)} className={cl.link}>
              Forgot your password
            </p>
            <Button
              type="submit"
              variant="contained"
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
            >
              Sign in
            </Button>
            <Button
              href="https://gym-app-back.vercel.app/api/auth/google/login"
              variant="outlined"
              endIcon={<FaGoogle />}
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
            >
              Sign in with Google
            </Button>
          </form>
        </>
      ) : (
        <>
          <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography style={{ fontSize: 16 }} variant="h5" color={"black"}>
              Forgot your password
            </Typography>
            <Controller
              control={control}
              name="email"
              rules={emailValidation}
              render={({ field }) => (
                <TextField
                  label="Email"
                  size="small"
                  margin="normal"
                  fullWidth={true}
                  onChange={field.onChange}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
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
              Send
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};

export default SigninForm;
