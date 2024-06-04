"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@store/store";
import { DateRange } from "react-day-picker";

interface StoreProps {
  status: string;
  tripName: string;
  dateRange: DateRange;
  count: number;
  filteredData: any[];
  loading: boolean;
  selectedAttractions: any[];
  isPrivate: boolean;
  popoverOpen: boolean;
  previewRef: any;
}
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(props);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
