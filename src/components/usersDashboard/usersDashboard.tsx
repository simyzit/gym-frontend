import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { useCustomSelector } from "../../redux/selectors";
import { deleteUser, fetchUsers } from "../../redux/user/userOperation";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, logout } from "../../redux/auth/authOperation";
import { Link } from "react-router-dom";
import cl from "./usersDashboard.module.css";

import NavbarDashboard from "../navigateDashboard/NavbarDashboard";
import { IUser } from "../../interfaces/user.interface";
import Modal from "../UI/modal/Modal";
import { Controller, useForm, useFormState } from "react-hook-form";
import { emailValidation } from "../signinForm/validation";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Users = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const { getAllUsers } = useCustomSelector();
  const { register, handleSubmit, control, getValues, setValue } =
    useForm<IUser>({
      defaultValues: {
        _id: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        avatarURL: "",
        role: "",
      },
    });
  const { errors } = useFormState({
    control,
  });

  const [role, setRole] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        field: "avatarURL",
        headerName: "Avatar",
        width: 100,
        renderCell: (params: { row: { avatarURL: string | undefined } }) => (
          <Avatar src={params.row.avatarURL} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "role", headerName: "Role", width: 100 },
      { field: "_id", headerName: "Id", width: 220 },
      {
        field: "edit",
        headerName: "edit",
        width: 100,
        filterable: false,
        sortable: false,
        renderCell: (cellValues: any) => {
          return (
            <Button
              style={{ cursor: "pointer" }}
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleEdit(e, cellValues);
              }}
            >
              Edit
            </Button>
          );
        },
      },
      {
        field: "delete",
        headerName: "delete",
        width: 100,
        filterable: false,
        sortable: false,
        renderCell: (cellValues: any) => {
          return (
            <Button
              style={{ cursor: "pointer" }}
              variant="contained"
              color="error"
              onClick={(e) => {
                handleDelete(e, cellValues);
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ],
    []
  );

  const onSubmit = async () => {
    console.log(role);
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cellVaues: { row: IUser }
  ) => {
    console.log(cellVaues);
    handleVisible();

    setValue("name", cellVaues.row.name);
    setValue("email", cellVaues.row.email);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cellVaues: { row: IUser }
  ) => {
    console.log(cellVaues.row._id);

    dispatch(deleteUser(cellVaues.row._id));
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}>
        <NavbarDashboard />
      </section>
      <main className={cl.main}>
        <Box
          sx={{
            height: 400,
            width: "90%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ textAlign: "center", mt: 3, mb: 3 }}
          >
            Manage users
          </Typography>
          <DataGrid
            columns={columns}
            rows={getAllUsers}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
          <Modal visible={visible} setVisible={setVisible}>
            <form
              className={cl.form}
              onSubmit={handleSubmit(onSubmit)}
              style={{ minWidth: "200px" }}
            >
              <Typography style={{ fontSize: 16 }} variant="h5" color={"black"}>
                You can change role
              </Typography>
              {/* <Controller
                control={control}
                name="name"
                rules={emailValidation}
                render={() => (
                  <TextField
                    label="Name"
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
                name="email"
                rules={emailValidation}
                render={() => (
                  <TextField
                    label="Email"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    {...register("email")}
                  />
                )}
              /> */}
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"manager"}>Manager</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                </Select>
              </FormControl>
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
        </Box>
      </main>
    </div>
  );
};

export default Users;
