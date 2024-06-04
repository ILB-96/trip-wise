import { dayAttraction } from "@app/planTrip/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export interface AppState {
  tripName: { value: string };
  dateRange: { value: DateRange | undefined };
  selectedAttractions: { value: dayAttraction[] };
  isPrivate: { value: boolean };
  preview: { value: any[][] };
}

const initialState: AppState = {
  tripName: {
    value: "",
  },
  dateRange: {
    value: { from: new Date(), to: addDays(new Date(), 1) },
  },
  selectedAttractions: {
    value: [],
  },
  isPrivate: {
    value: false,
  },
  preview: {
    value: [],
  },
};

export const tripNameSlice = createSlice({
  name: "tripName",
  initialState: initialState.tripName,
  reducers: {
    setTripName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState: initialState.dateRange,
  reducers: {
    setDate: (state, action: PayloadAction<DateRange | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const selectedAttractionsSlice = createSlice({
  name: "selectedAttractions",
  initialState: initialState.selectedAttractions,
  reducers: {
    setSelectedAttractions: (state, action: PayloadAction<dayAttraction[]>) => {
      state.value = action.payload;
    },
  },
});
export const isPrivateSlice = createSlice({
  name: "isPrivate",
  initialState: initialState.isPrivate,
  reducers: {
    setIsPrivate: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const previewSlice = createSlice({
  name: "preview",
  initialState: initialState.preview,
  reducers: {
    setPreview: (state, action: PayloadAction<any[][]>) => {
      state.value = action.payload;
    },
  },
});

export const { setTripName } = tripNameSlice.actions;
export const { setDate } = dateRangeSlice.actions;
export const { setIsPrivate } = isPrivateSlice.actions;
export const { setSelectedAttractions } = selectedAttractionsSlice.actions;
export const { setPreview } = previewSlice.actions;
