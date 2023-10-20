import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IAuthData {
  data: any;
  status: string;
}

const initialState: IAuthData = {
  data: null,
  status: "loading",
};

export const fetchAuth = createAsyncThunk<IAuthData>(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post(
      "https://application-gym.onrender.com/api/auth/login",
      params
    );
    console.log(data);
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
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action: PayloadAction<string>) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
