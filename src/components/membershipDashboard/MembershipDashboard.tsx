import React, { useEffect, useState } from "react";
import NavbarDashboard from "../navigateDashboard/NavbarDashboard";
import cl from "./MembershipDashboard.module.css";
import MembershipCard from "../membershipCard/MembershipCard";
import { Button, TextField, Typography } from "@mui/material";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import { IPackage } from "../../interfaces/package.interface";
import { useAppDispatch } from "../signinForm/SigninForm";
import {
  addPackage,
  fetchPackages,
} from "../../redux/package/packageOperation";
import Modal from "../UI/modal/Modal";

const MembershipDashboard = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control, reset } = useForm<IPackage>({
    defaultValues: {
      name: "",
      description: [],
      days: 0,
      price: 0,
    },
  });
  const { errors } = useFormState({
    control,
  });

  const handleAdd = () => {
    setVisible(true);
  };

  const onSubmit: SubmitHandler<IPackage> = (values) => {
    const data = { ...values };
    data.description = [data.description.toString()];
    dispatch(addPackage(data));
    dispatch(fetchPackages());
    reset();
    setVisible(false);
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
          component="h5"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Manage memberships
        </Typography>
        <Button variant="contained" onClick={() => handleAdd()}>
          Add membership{" "}
        </Button>
        <Modal visible={visible} setVisible={setVisible}>
          <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography style={{ fontSize: 16 }} variant="h5" color={"black"}>
              Add membership
            </Typography>
            <Controller
              control={control}
              name="name"
              render={() => (
                <TextField
                  label="Name card"
                  size="small"
                  margin="normal"
                  fullWidth={true}
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  {...register("name")}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={() => (
                <TextField
                  label="Description"
                  size="small"
                  margin="normal"
                  fullWidth={true}
                  error={!!errors.days?.message}
                  helperText={errors.days?.message}
                  {...register("description")}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              render={() => (
                <TextField
                  label="Price"
                  size="small"
                  margin="normal"
                  fullWidth={true}
                  error={!!errors.price?.message}
                  helperText={errors.price?.message}
                  {...register("price")}
                />
              )}
            />
            <Controller
              control={control}
              name="days"
              render={() => (
                <TextField
                  label="Days"
                  size="small"
                  margin="normal"
                  fullWidth={true}
                  error={!!errors.days?.message}
                  helperText={errors.days?.message}
                  {...register("days")}
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
              Submit
            </Button>
          </form>
        </Modal>
        <MembershipCard isAdmin={true} />
      </main>
    </div>
  );
};

export default MembershipDashboard;
