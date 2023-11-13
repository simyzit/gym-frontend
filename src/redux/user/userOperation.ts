import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { IUser } from "../../interfaces/user.interface";
import Notiflix from "notiflix";

export const fetchUsers = createAsyncThunk("user", async (_, thunkApi) => {
  try {
    const { data } = await instance.get("user");
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (data: string, thunkApi) => {
    try {
      const todo = await instance.delete(`/user/${data}`);
      Notiflix.Notify.success("User deleted!");
      return todo.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/edit",
  async (data: IUser, thunkApi) => {
    try {
      const user = await instance.patch(`/user/${data._id}`, {
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        email: data.email,
        role: data.role,
      });

      return user.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editInformationUser = createAsyncThunk(
  "package/edit",
  async (data: IUser, thunkApi) => {
    try {
      const user = await instance.patch(`/user/${data._id}/${data.role}`, {
        role: data.role,
      });

      return user.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);
