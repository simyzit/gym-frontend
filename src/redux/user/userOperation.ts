import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { IUser } from "../../interfaces/user.interface";
import Notiflix from "notiflix";

const setToken = (token?: string) => {
  if (token) {
    return (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.common.Authorization = "";
};

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && localStorage.getItem("refreshToken")) {
      const refreshToken = localStorage.getItem("refreshToken");

      instance.post("auth/refresh", { refreshToken }).then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        instance(originalRequest)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      return Promise.reject(error.response.data);
    }
  }
);

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
