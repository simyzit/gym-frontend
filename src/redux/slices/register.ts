import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IRegisterData {
  data: any;
  status: string;
}

const initialState: IRegisterData = {
  data: null,
  status: "loading",
};

export const fetchRegister = createAsyncThunk<IRegisterData>(
  "auth/register",
  async (params) => {
    const { data } = await axios.post(
      " https://application-gym.onrender.com/api/auth/register",
      params
    );
    console.log(data);
    return data;
  }
);

const registerhSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action: PayloadAction<string>) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsRegister = (state) => Boolean(state.register.data);

export const registerReducer = registerhSlice.reducer;
