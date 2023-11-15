import { PayloadAction } from "@reduxjs/toolkit";
import { IVisit, IVisitStore } from "../../interfaces/visits.interface";

export const getVisitsReducer = (
  state: IVisitStore,
  action: PayloadAction<IVisit[]>
) => {
  state.isLoading = false;
  state.allItems = action.payload;
};

export const pendingVisitsReducer = (state: IVisitStore) => {
  state.isLoading = true;
};

export const rejectedVisitsReducer = (state: IVisitStore) => {
  state.isLoading = false;
};
