import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { IPackage } from "../../interfaces/package.interface";
import Notiflix from "notiflix";

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

export const deletePackage = createAsyncThunk(
  "package/delete",
  async (data: string, thunkApi) => {
    try {
      const packageData = await instance.delete(`/package/${data}`);
      Notiflix.Notify.success("Package deleted!");
      return packageData.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const buyPackage = createAsyncThunk(
  "package/buy",
  async (data: string, thunkApi) => {
    try {
      const packageData = await instance.post(`/package/${data}`);
      Notiflix.Notify.success("Package bought, Success!");
      return packageData.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editPackage = createAsyncThunk(
  "package/edit",
  async (data: IPackage, thunkApi) => {
    try {
      const packageData = await instance.patch(`/package/${data._id}`, {
        name: data.name,
        days: +data.days,
        price: +data.price,
      });

      Notiflix.Notify.success("Package updated!");
      return packageData.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addPackage = createAsyncThunk(
  "package/add",
  async (data: IPackage, thunkApi) => {
    try {
      const packageData = await instance.post(`/package/add`, {
        name: data.name,
        description: data.description,
        days: +data.days,
        price: +data.price,
      });

      Notiflix.Notify.success("Package updated!");
      return packageData.data;
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
    }
  }
);
