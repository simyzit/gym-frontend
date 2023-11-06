import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarDashboard from "../navigateDashboard/NavbarDashboard";
import cl from "./ProfileDashboard.module.css";
import logo from "../../assets/logo.png";
import { useCustomSelector } from "../../redux/selectors";
import { fetchCurrentUser } from "../../redux/auth/authOperation";
import { useAppDispatch } from "../signinForm/SigninForm";
import { fetchUsers } from "../../redux/user/userOperation";
import { Button, TextField, Typography, styled } from "@mui/material";
import { Controller, useForm, useFormState } from "react-hook-form";
import { IUser } from "../../interfaces/user.interface";
import { emailValidation } from "../signinForm/validation";
import { firstNameValidation } from "../signupForm/validation";
import { FaCloud } from "react-icons/fa";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProfileDashboard = () => {
  const [imageSelected, setImageSelected] = useState<any>();
  const dispatch = useAppDispatch();
  const { getIsLoggedIn, getToken: token, getUser: user } = useCustomSelector();
  const { handleSubmit, control, register, setValue, getValues } =
    useForm<IUser>({
      defaultValues: {
        name: "",
        surname: "",
        email: "",
      },
    });
  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    setValue("name", user.name);
    setValue("surname", user.surname);
    setValue("email", user.email);
  }, [user]);

  const onSubmit = async (values: IUser) => {
    if (!values) {
      return;
    }

    console.log(getValues(["name", "surname", "email"]));
  };

  const uploadImage = (files: any) => {
    console.log(files[0]);
  };

  console.log(user);

  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}>
        <NavbarDashboard />
      </section>
      <main className={cl.main}>
        <Typography
          variant="h5"
          component="div"
          color={"black"}
          sx={{ marginBottom: "20px" }}
        >
          Account
        </Typography>
        <div className={cl.profileContainer}>
          <div className={cl.userCardContainer}>
            <img className={cl.avatar} src={user.avatarURL} alt="ava" />
            <Typography variant="h5" component="div" color={"black"}>
              {user.name} {user.surname}
            </Typography>
            <Typography variant="overline" display="block">
              {user.email}
            </Typography>
            <Typography variant="overline" display="block">
              {user.role}
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<FaCloud />}
              onClick={uploadImage}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  setImageSelected(e.target.files);
                }}
              />
            </Button>
          </div>

          <div className={cl.profileInfoContainer}>
            <Typography variant="h5" component="div" color={"black"}>
              Profile
            </Typography>
            <Typography variant="overline" display="block">
              The information can be edited
            </Typography>

            <div className={cl.fielsContainer}>
              <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="name"
                  rules={firstNameValidation}
                  render={() => (
                    <TextField
                      size="small"
                      margin="normal"
                      fullWidth={true}
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                      {...register("name")}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="surname"
                  rules={firstNameValidation}
                  render={() => (
                    <TextField
                      size="small"
                      margin="normal"
                      fullWidth={true}
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                      {...register("surname")}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  rules={emailValidation}
                  render={() => (
                    <TextField
                      size="small"
                      margin="normal"
                      fullWidth={true}
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                      {...register("email")}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                >
                  Save details
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div></div>
      </main>
    </div>
  );
};

export default ProfileDashboard;
