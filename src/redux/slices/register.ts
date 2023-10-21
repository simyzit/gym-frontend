import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { ISignUpForm } from "../../interfaces/appInterfaces.intreface";

interface IRegisterData {
  data: any;
  status: string;
}

const initialState: IRegisterData = {
  data: null,
  status: "loading",
};

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (params: ISignUpForm) => {
    const { data } = await instance.post("/auth/register", params);
    console.log(data);
    return data;
  }
);

const registerhSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const registerReducer = registerhSlice.reducer;

export const selectIsRegister = (state) => Boolean(state.register.data);
