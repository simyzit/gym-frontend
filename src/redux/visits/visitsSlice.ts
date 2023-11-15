import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchVisits } from "./visitsOperation";
import { IVisitStore } from "../../interfaces/visits.interface";
import {
  getVisitsReducer,
  pendingVisitsReducer,
  rejectedVisitsReducer,
} from "./visitsReducer";

const initialState: IVisitStore = {
  allItems: [],
  isLoading: false,
};

const extraActions = [fetchVisits];
const getAction = (type: string) =>
  isAnyOf(...extraActions.map((action: any) => action[type]));

const visitSlice = createSlice({
  name: "visits",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchVisits.fulfilled, getVisitsReducer)
      .addMatcher(getAction("pending"), pendingVisitsReducer)
      .addMatcher(getAction("rejected"), rejectedVisitsReducer),
});

export const visitReducer = visitSlice.reducer;
