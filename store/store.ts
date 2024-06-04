import { configureStore } from "@reduxjs/toolkit";
import {
  selectedAttractionsSlice,
  previewSlice,
  tripNameSlice,
  isPrivateSlice,
  dateRangeSlice,
} from "./slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      selectedAttractions: selectedAttractionsSlice.reducer,
      preview: previewSlice.reducer,
      tripName: tripNameSlice.reducer,
      isPrivate: isPrivateSlice.reducer,
      dateRange: dateRangeSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
