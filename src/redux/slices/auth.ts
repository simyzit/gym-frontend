import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuth = createAsyncThunk(
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

interface IInitialState {
  data: any;
  status: string;
}

const initialState: IInitialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const authReducer = authSlice.reducer;
