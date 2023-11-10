import { PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrderStore } from "../../interfaces/order.interface";

export const getAllOrdersReducer = (
  state: IOrderStore,
  action: PayloadAction<IOrder[]>
) => {
  state.isLoading = false;
  state.allItems = action.payload;
};

export const pendingOrderReducer = (state: IOrderStore) => {
  state.isLoading = true;
};

export const rejectedOrderReducer = (state: IOrderStore) => {
  state.isLoading = false;
};
