import { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserStore } from "../../interfaces/user.interface";

export const getAllUsersReducer = (
  state: IUserStore,
  action: PayloadAction<IUser[]>
) => {
  state.isLoading = false;
  state.allItems = action.payload;
};

export const pendingUserReducer = (state: IUserStore) => {
  state.isLoading = true;
};

export const rejectedUserReducer = (state: IUserStore) => {
  state.isLoading = false;
};

export const deleteUserReducer = (
  state: IUserStore,
  action: PayloadAction<IUser>
) => {
  state.isLoading = false;
  state.allItems = state.allItems.filter(
    (item) => item._id !== action.payload._id
  );
};

export const editUserReducer = (
  state: IUserStore,
  action: PayloadAction<IUser>
) => {
  state.isLoading = false;
  const index = state.allItems.findIndex(
    (item, index) => item._id === action.payload._id
  );
  state.allItems[index] = action.payload;
};

export const editPackageReduccer = (
  state: IUserStore,
  action: PayloadAction<IUser>
) => {
  state.isLoading = false;
  const index = state.allItems.findIndex(
    (item, index) => item._id === action.payload._id
  );

  state.allItems[index] = action.payload;
};
