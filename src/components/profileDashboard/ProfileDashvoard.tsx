import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarDashboard from "../navigateDashboard/NavbarDashboard";
import cl from "./ProfileDashboard.module.css";
import { useCustomSelector } from "../../redux/selectors";
import {
  editUser,
  fetchCurrentUser,
  updateAvatar,
} from "../../redux/auth/authOperation";
import { useAppDispatch } from "../signinForm/SigninForm";
import { fetchUsers } from "../../redux/user/userOperation";
import { Button, TextField, Typography, styled } from "@mui/material";
import { Controller, useForm, useFormState } from "react-hook-form";
import { IUser, IUserPayload } from "../../interfaces/user.interface";
import { emailValidation } from "../signinForm/validation";
import {
  firstNameValidation,
  surnameValidation,
} from "../signupForm/validation";
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
  const [imageSelected, setImageSelected] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { getIsLoggedIn, getToken: token, getUser: user } = useCustomSelector();
  const { handleSubmit, control, register, setValue, getValues } =
    useForm<IUserPayload>({
      defaultValues: {
        name: "",
        surname: "",
        email: "",
        phone: "",
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
    setValue("phone", user.phone);
  }, [user]);

  const onSubmit = async (values: any) => {
    if (!values) {
      return;
    }
    dispatch(editUser(values));
  };

  const handleFileSelect = (event: any) => {
    setImageSelected(event.target.files[0]);
  };

  const uploadImage = (files: any) => {
    dispatch(updateAvatar(imageSelected));
  };

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
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
            </Button>

            <Button
              component="label"
              variant="contained"
              onClick={uploadImage}
              sx={{ marginTop: 2 }}
            >
              Update
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
                <label>Name</label>
                <Controller
                  control={control}
                  name="name"
                  rules={firstNameValidation}
                  render={() => (
                    <TextField
                      size="small"
                      margin="normal"
                      fullWidth={true}
                      error={!!errors.name?.message}
                      helperText={errors.name?.message}
                      {...register("name")}
                    />
                  )}
                />
                <label>Surname</label>
                <Controller
                  control={control}
                  name="surname"
                  rules={surnameValidation}
                  render={() => (
                    <TextField
                      size="small"
                      margin="normal"
                      fullWidth={true}
                      error={!!errors.surname?.message}
                      helperText={errors.surname?.message}
                      {...register("surname")}
                    />
                  )}
                />
                <label>Email</label>
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
                <label>Phone</label>
                <Controller
                  control={control}
                  name="phone"
                  render={() => (
                    <TextField
                      size="small"
                      margin="normal"
                      fullWidth={true}
                      error={!!errors.phone?.message}
                      helperText={errors.phone?.message}
                      {...register("phone")}
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
