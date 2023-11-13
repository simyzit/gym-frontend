import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteUserReducer,
  editUserReducer,
  getAllUsersReducer,
  pendingUserReducer,
  rejectedUserReducer,
} from "./userReducer";
import { fetchPackages } from "../package/packageOperation";
import { deleteUser, editUser, fetchUsers } from "./userOperation";
import { IUserStore } from "../../interfaces/user.interface";

const initialState: IUserStore = {
  allItems: [],
  isLoading: false,
};

const extraActions = [fetchPackages];
const getAction = (type: string) =>
  isAnyOf(...extraActions.map((action: any) => action[type]));

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.fulfilled, getAllUsersReducer)
      .addCase(deleteUser.fulfilled, deleteUserReducer)
      .addCase(editUser.fulfilled, editUserReducer)
      .addMatcher(getAction("pending"), pendingUserReducer)
      .addMatcher(getAction("rejected"), rejectedUserReducer),
});

export const userReducer = userSlice.reducer;
