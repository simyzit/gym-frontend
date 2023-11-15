import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IPackage, IPackageStore } from "../../interfaces/package.interface";
import {
  addPackage,
  buyPackage,
  deletePackage,
  editPackage,
  fetchAllPackages,
  fetchPackages,
} from "./packageOperation";
import {
  addPackageReducer,
  buyPackageReducer,
  deletePackageReducer,
  editPackageReducer,
  getAllPackagesReducer,
  getPackagesReducer,
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
      .addCase(fetchAllPackages.fulfilled, getAllPackagesReducer)
      .addCase(fetchPackages.fulfilled, getPackagesReducer)
      .addCase(deletePackage.fulfilled, deletePackageReducer)
      .addCase(editPackage.fulfilled, editPackageReducer)
      .addCase(buyPackage.fulfilled, buyPackageReducer)
      .addCase(addPackage.fulfilled, addPackageReducer)
      .addMatcher(getAction("pending"), pendingPackageReducer)
      .addMatcher(getAction("rejected"), rejectedPackageReducer),
});

export const packageReducer = packageSlice.reducer;
