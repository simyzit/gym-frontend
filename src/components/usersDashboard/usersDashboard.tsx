import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { useCustomSelector } from "../../redux/selectors";
import {
  deleteUser,
  editUser,
  fetchUsers,
} from "../../redux/user/userOperation";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authOperation";
import cl from "./usersDashboard.module.css";

import NavbarDashboard from "../navigateDashboard/NavbarDashboard";
import { IUser, IUserPayload } from "../../interfaces/user.interface";
import Modal from "../UI/modal/Modal";
import { Controller, useForm, useFormState } from "react-hook-form";
import { emailValidation } from "../signinForm/validation";
import { phoneValidation } from "../signupForm/validation";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Users = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [currentValues, setCurrentValues] = useState<IUser>();
  const { getAllUsers } = useCustomSelector();
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);
  const { register, handleSubmit, control, setValue } = useForm<IUser>({
    defaultValues: {
      _id: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      role: "",
    },
  });
  const { errors } = useFormState({
    control,
  });

  const [role, setRole] = useState<string>("");
  const [id, setId] = useState<string>("");

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
      { field: "surname", headerName: "Surname", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "phone", headerName: "Phone", width: 200 },
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

  const onSubmit = async (values: IUser) => {
    setVisibleConfirm(true);
    values._id = id;

    setCurrentValues(values);
  };

  const onConfirmEdit = () => {
    dispatch(editUser(currentValues as IUser));
    setVisibleConfirm(false);
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cellVaues: { row: IUser }
  ) => {
    handleVisible();
    setValue("name", cellVaues.row.name);
    setValue("surname", cellVaues.row.surname);
    setValue("email", cellVaues.row.email);
    setValue("phone", cellVaues.row.phone);
    setValue("role", cellVaues.row.role);
    setId(cellVaues.row._id);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cellVaues: { row: IUser }
  ) => {
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
          <Modal visible={visibleConfirm} setVisible={setVisibleConfirm}>
            <p>Are you sure?</p>
            <Button
              variant="contained"
              type="submit"
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
              onClick={() => onConfirmEdit()}
            >
              Sure
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
              onClick={() => setVisibleConfirm(false)}
            >
              Not sure
            </Button>
          </Modal>
          <Modal visible={visible} setVisible={setVisible}>
            <form
              className={cl.form}
              onSubmit={handleSubmit(onSubmit)}
              style={{ minWidth: "200px" }}
            >
              <Typography style={{ fontSize: 16 }} variant="h5" color={"black"}>
                You can change fields
              </Typography>
              <Controller
                control={control}
                name="name"
                render={() => (
                  <TextField
                    label="Name"
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
                name="surname"
                render={() => (
                  <TextField
                    label="Surname"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    error={!!errors.surname?.message}
                    helperText={errors.surname?.message}
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
                    label="Email"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    {...register("email")}
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                rules={phoneValidation}
                render={() => (
                  <TextField
                    label="Phone"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    error={!!errors.phone?.message}
                    helperText={errors.phone?.message}
                    {...register("phone")}
                  />
                )}
              />
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
                variant="contained"
                type="submit"
                fullWidth={true}
                sx={{
                  marginTop: 2,
                }}
                onClick={() => {
                  setVisible(false);
                  setVisibleConfirm(true);
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
