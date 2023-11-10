import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IPackage, IPackageStore } from "../../interfaces/package.interface";
import {
  addPackage,
  buyPackage,
  deletePackage,
  editPackage,
  fetchPackages,
} from "./packageOperation";
import {
  addPackageReducer,
  buyPackageReducer,
  deletePackageReducer,
  editPackageReducer,
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
      .addCase(deletePackage.fulfilled, deletePackageReducer)
      .addCase(editPackage.fulfilled, editPackageReducer)
      .addCase(buyPackage.fulfilled, buyPackageReducer)
      .addCase(addPackage.fulfilled, addPackageReducer)
      .addMatcher(getAction("pending"), pendingPackageReducer)
      .addMatcher(getAction("rejected"), rejectedPackageReducer),
});

export const packageReducer = packageSlice.reducer;
