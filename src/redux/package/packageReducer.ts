import { PayloadAction } from "@reduxjs/toolkit";
import { IPackage, IPackageStore } from "../../interfaces/package.interface";

export const getAllPackagesReducer = (
  state: IPackageStore,
  action: PayloadAction<IPackage[]>
) => {
  state.isLoading = false;
  state.allItems = action.payload;
};

export const getPackagesReducer = (
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
  state.isLoading = false;
  state.allItems = state.allItems.filter(
    (item) => item._id !== action.payload._id
  );
};

export const buyPackageReducer = (state: IPackageStore) => {
  state.isLoading = false;
};

export const editPackageReducer = (
  state: IPackageStore,
  action: PayloadAction<IPackage>
) => {
  state.isLoading = false;
  const index = state.allItems.findIndex(
    (item, index) => item._id === action.payload._id
  );

  state.allItems[index] = action.payload;
};

export const addPackageReducer = (
  state: IPackageStore,
  action: PayloadAction<IPackage>
) => {
  state.isLoading = false;
  state.allItems = [...state.allItems, action.payload];
};
