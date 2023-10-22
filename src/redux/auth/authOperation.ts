import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { ILoginUser, IRegisterUser } from "../../interfaces/user.interface";
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

export const googleApi = createAsyncThunk(
  "/auth/google",
  (credentials: any) => {
    try {
      setToken(credentials.token);
      return credentials;
    } catch (error) {
      console.log(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credential: IRegisterUser, thunkApi) => {
    try {
      const res = await instance.post("auth/register", {
        name: credential.name,
        surname: credential.surname,
        email: credential.email,
        phone: credential.phone,
        password: credential.password,
      });
      Notiflix.Notify.success("Success! Check your email for verfication!");
      return res.data;
    } catch (error: any) {
      console.log(error);
      Notiflix.Notify.failure("Email address is already registered", {
        timeout: 1500,
      });
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credential: ILoginUser, thunkApi) => {
    try {
      const res = await instance.post("auth/login", {
        email: credential.email,
        password: credential.password,
      });

      setToken(res.data.accessToken);

      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("accessToken", res.data.accessToken);

      Notiflix.Notify.success("Success! You are signed in!");

      return res.data;
    } catch (error: any) {
      console.log(error);
      Notiflix.Notify.failure("Wrong login or password ❗", {
        timeout: 1500,
      });
      return thunkApi.rejectWithValue(error.messsage);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await instance.get("auth/logout");
    setToken();
  } catch (error: unknown) {
    if (error instanceof Error) return thunkApi.rejectWithValue(error.message);
  }
});
