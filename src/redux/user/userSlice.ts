import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteUserReducer,
  getAllUsersReducer,
  pendingUserReducer,
  rejectedUserReducer,
} from "./userReducer";
import { fetchPackages } from "../package/packageOperation";
import { deleteUser, editInformationUser, fetchUsers } from "./userOperation";
import { IUserStore } from "../../interfaces/user.interface";
import { editUserReducer } from "../auth/authReducer";

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
      .addMatcher(getAction("pending"), pendingUserReducer)
      .addMatcher(getAction("rejected"), rejectedUserReducer),
});

export const userReducer = userSlice.reducer;
