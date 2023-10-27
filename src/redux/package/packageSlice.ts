import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IPackage, IPackageStore } from "../../interfaces/package.interface";
import { fetchPackages } from "./packageOperation";
import {
  getAllPackagesReducer,
  pendingPackageReducer,
  rejectedPackageReducer,
} from "./packageReducer";

const initialState: IPackageStore = {
  allItems: [],
  isLoading: false,
};

const extraActions = [fetchPackages];
const getAction = (type: string) =>
  isAnyOf(...extraActions.map((action: any) => action[type]));

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPackages.fulfilled, getAllPackagesReducer)
      .addMatcher(getAction("pending"), pendingPackageReducer)
      .addMatcher(getAction("rejected"), rejectedPackageReducer),
});

export const packageReducer = packageSlice.reducer;