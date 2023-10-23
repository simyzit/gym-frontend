import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";

export const fetchPackages = createAsyncThunk(
  "package/all",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("package/all");
      return data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);
