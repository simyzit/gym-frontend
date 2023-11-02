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
