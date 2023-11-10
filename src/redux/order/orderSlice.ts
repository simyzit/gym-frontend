import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchOrders } from "./orderOperation";
import { IOrderStore } from "../../interfaces/order.interface";
import {
  getAllOrdersReducer,
  pendingOrderReducer,
  rejectedOrderReducer,
} from "./orderReducer";

const initialState: IOrderStore = {
  allItems: [],
  isLoading: false,
};

const extraActions = [fetchOrders];
const getAction = (type: string) =>
  isAnyOf(...extraActions.map((action: any) => action[type]));

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrders.fulfilled, getAllOrdersReducer)
      .addMatcher(getAction("pending"), pendingOrderReducer)
      .addMatcher(getAction("rejected"), rejectedOrderReducer),
});

export const orderReducer = orderSlice.reducer;
