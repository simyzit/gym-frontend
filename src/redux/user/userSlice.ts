import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllUsersReducer,
  pendingUserReducer,
  rejectedUserReducer,
} from "./userReducer";
import { fetchPackages } from "../package/packageOperation";
import { fetchUsers } from "./userOperation";
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
      .addMatcher(getAction("pending"), pendingUserReducer)
      .addMatcher(getAction("rejected"), rejectedUserReducer),
});

export const userReducer = userSlice.reducer;
