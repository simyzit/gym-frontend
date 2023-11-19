import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import {
  ILoginUser,
  IRegisterUser,
  IUser,
  IUserPayload,
  IVerifyAgain,
} from "../../interfaces/user.interface";
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
    if (!config.headers["Authorization"]) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig.sent) {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("refreshToken", refreshToken);
      try {
        const { data } = await instance.post("/auth/refresh", { refreshToken });
        originalConfig.headers["Authorization"] = `Bearer ${data.accessToken}`;
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        return instance(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export const googleApi = createAsyncThunk(
  "/auth/google",
  (credentials: any) => {
    try {
      setToken(credentials.accessToken);

      localStorage.setItem("refreshToken", credentials.refreshToken);
      localStorage.setItem("accessToken", credentials.accessToken);

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

export const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/user/current");
      return res.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const verifiedAgain = createAsyncThunk(
//   "auth/verifiedAgain",
//   async (data: IVerifyAgain, thunkAPI) => {
//     try {
//       const res = await instance.get(`/auth/verify`, {
//         email: data.email
//       });
//       return res.data;
//     } catch (error: unknown) {
//       if (error instanceof Error)
//         return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await instance.get("auth/logout");
    setToken();
  } catch (error: unknown) {
    if (error instanceof Error) return thunkApi.rejectWithValue(error.message);
  }
});

export const editUser = createAsyncThunk(
  "user/edit",
  async (data: IUser, thunkApi) => {
    try {
      const user = await instance.patch(`/user/profile`, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
      });

      Notiflix.Notify.success("Information updated!");
      return user.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/avatar",
  async (data: File, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("file", data);
      const avatar = await instance.patch(`/user/avatar`, formData);

      Notiflix.Notify.success("Avatar updated!");
      return avatar.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);
