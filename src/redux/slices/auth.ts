import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
import { instance } from "../../axios";
import {
  ISignInForm,
  ISignInFormProps,
} from "../../interfaces/appInterfaces.intreface";

interface IAuthData {
  data: any;
  status: string;
}

const initialState: IAuthData = {
  data: null,
  status: "loading",
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

      instance
        .post("auth/refresh", {
          refreshToken,
        })
        .then((response) => {
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

export const fetchAuth = createAsyncThunk(
  "auth/fetchUserData",
  async (params: ISignInForm) => {
    const { data } = await instance.post("auth/login", params);
    return data;
  }
);

export const fetchLogout = createAsyncThunk<IAuthData>(
  "auth/logout",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state?.auth.data.accessToken;

    const { data } = await instance.get("auth/logout/", accessToken);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthData = (state) => state.auth.status;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
