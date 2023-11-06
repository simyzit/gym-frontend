import { PayloadAction } from "@reduxjs/toolkit";
import { IPackage, IPackageStore } from "../../interfaces/package.interface";

export const getAllPackagesReducer = (
  state: IPackageStore,
  action: PayloadAction<IPackage[]>
) => {
  state.isLoading = false;
  state.allItems = action.payload;
};

export const pendingPackageReducer = (state: IPackageStore) => {
  state.isLoading = true;
};

export const rejectedPackageReducer = (state: IPackageStore) => {
  state.isLoading = false;
};

export const deletePackageReducer = (
  state: IPackageStore,
  action: PayloadAction<IPackage>
) => {
  console.log(action.payload._id);
  state.isLoading = false;
  state.allItems = state.allItems.filter(
    (item) => item._id !== action.payload._id
  );
};
