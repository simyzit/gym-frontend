import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";

export const fetchVisits = createAsyncThunk("visits", async (_, thunkApi) => {
  try {
    const { data } = await instance.get("visit");
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) return thunkApi.rejectWithValue(error.message);
  }
});
