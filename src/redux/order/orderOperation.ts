import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import Notiflix from "notiflix";

export const fetchOrders = createAsyncThunk("orders", async (_, thunkApi) => {
  try {
    const { data } = await instance.get("/orders");
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) return thunkApi.rejectWithValue(error.message);
  }
});
