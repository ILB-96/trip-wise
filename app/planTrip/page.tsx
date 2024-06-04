"use client";
import { addDays, isSameDay } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { attractionsFilter } from "@app/attractions/attractionsFilter";
import AttractionCard from "@components/AttractionCard";
import DateRangePicker from "@components/DateRangePicker";
import { IAttraction } from "@models/attraction";
import AttSearch from "@components/FilterBar/attSearch/AttSearch";
import Pagination from "@components/dashboard/pagination/Pagination";
import { SearchParams } from "@models/types";
import { getAttPage, getAttTypes } from "@lib/attraction";
import ThreeDotsWave from "@components/ThreeDotsLoading";
import { useRouter } from "next/navigation";

import {
  setDate,
  setIsPrivate,
  setPreview,
  setSelectedAttractions,
  setTripName,
} from "@store/slice";
import { RootState } from "@store/store";
import { useSession } from "next-auth/react";
import { set } from "mongoose";
const hasSelectedAttractions = (selectedAttractions: {
  [key: string]: IAttraction[];
}): boolean => {
  return Object.keys(selectedAttractions).some(
    (key) => selectedAttractions[key].length > 0
  );
};

export interface dayAttraction {
  day: Date;
  attractionId: IAttraction;
}
interface PlanPageProps {
  searchParams: SearchParams;
}

const TripPlanner: React.FC<PlanPageProps> = ({ searchParams }) => {
  const session = useSession()?.data;
  const dispatch = useDispatch();
  const [status, setStatus] = useState<string>("");
  const tripName = useSelector((state: RootState) => state.tripName.value);
  const dateRange = useSelector((state: RootState) => state.dateRange.value);
  const selectedAttractions = useSelector(
    (state: RootState) => state.selectedAttractions.value
  );
  const isPrivate = useSelector((state: RootState) => state.isPrivate.value);
  const previewRef = useSelector((state: RootState) => state.preview.value);
  const [count, setCount] = useState<number>(0);
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<IAttraction[]>([]);
  const [loading, setLoading] = useState(true);

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    let q: { [key: string]: string } = { q: "" };
    if (searchParams) {
      for (const key in searchParams) {
        if (key !== "page") {
          q[key] = searchParams[key];
        }
      }
    }
    for (const key in attractionsFilter) {
      if (!q[key]) {
        q[key] = "";
      }
    }
    const page = searchParams?.page || 1;
    const fetchData = async () => {
      try {
        const { types } = await getAttTypes();
        attractionsFilter.types = { title: "Types", selections: types };
        const result = await getAttPage(q, page); // This will be an object with an 'attractions' key
        setCount(result.count);
        setFilteredData(result.attractions); // Make sure to access the 'attractions' key here
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const setDateRange = (date: DateRange | undefined) => {
    if (!date || !date.from) {
      dispatch(setSelectedAttractions([]));
      dispatch(setPreview([]));
      dispatch(setDate({ from: new Date(), to: new Date() }));
      return;
    }
    dispatch(setDate(date));
    const dayAttractions: IAttraction[][] = [];
    let totalDays = 0;
    let from = date?.from || new Date();
    const data = selectedAttractions.filter(
      (a) =>
        a.day.getTime() >= from.getTime() &&
        a.day.getTime() <= addDays(date?.to || addDays(from, -1), 1).getTime()
    );

    dispatch(setSelectedAttractions(data));
    if (dateRange && dateRange.from && dateRange.to) {
      const { from, to } = dateRange;
      totalDays =
        Math.floor(
          (addDays(to, 1).getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
    }
    for (let i = 0; i < totalDays; i++) {
      const currentDate = addDays(from, i);
      let attractionsForDay = data
        .filter((attraction) => isSameDay(attraction.day, currentDate))
        .map((attraction) => ({
          attractionId: attraction.attractionId,
          day: currentDate,
        }));
      if (attractionsForDay.length > 0) {
        dayAttractions.push(attractionsForDay);
      }
    }
    dispatch(setPreview(dayAttractions));
  };

  const handleAddAttraction = (
    attraction: IAttraction,
    date: Date | undefined
  ) => {
    if (!dateRange || !dateRange.from) {
      dispatch(setSelectedAttractions([]));
      dispatch(setPreview([]));
      return;
    }
    const dayAttractions: IAttraction[][] = [];
    let totalDays = 0;
    let from = dateRange?.from || new Date();
    const updated = [...selectedAttractions];
    if (!date) {
      return updated.filter((a) => a.attractionId !== attraction);
    }
    let newSelected = [...updated, { day: date, attractionId: attraction }];
    const data = newSelected.filter(
      (a) =>
        a.attractionId._id !== attraction._id ||
        (a.day === date && a.attractionId._id === attraction._id)
    );
    dispatch(setSelectedAttractions(data));

    if (dateRange && dateRange.from && dateRange.to) {
      const { from, to } = dateRange;
      totalDays =
        Math.floor(
          (addDays(to, 1).getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
    }
    for (let i = 0; i < totalDays; i++) {
      const currentDate = addDays(from, i);
      let attractionsForDay = data
        .filter((attraction) => isSameDay(attraction.day, currentDate))
        .map((attraction) => ({
          attractionId: attraction.attractionId,
          day: currentDate,
        }));
      if (attractionsForDay.length > 0) {
        dayAttractions.push(attractionsForDay);
      }
    }
    dispatch(setPreview(dayAttractions));
  };

  if (!session?.user) {
    router.push("/login");
  }
  if (loading) return <ThreeDotsWave />;
  return (
    <>
      <div className="flex justify-around p-4 max-lg:flex-col">
        <form className="flex flex-col max-sm:m-auto">
          <h1
            id="trip-planner-heading"
            className="font-bold text-xl text-gray-700 mb-2"
          >
            Create your trip
          </h1>

          <div className="mb-1">
            <label htmlFor="tripName" className="sr-only">
              Trip Name
            </label>
            <Input
              id="tripName"
              className="inline-flex items-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-[300px] justify-start text-left font-enter font-normal"
              type="text"
              placeholder="Trip Name"
              value={tripName}
              onChange={(e) => dispatch(setTripName(e.target.value))}
              aria-labelledby="trip-planner-heading"
            />
          </div>
          <div className="w-full flex mb-1">
            <DateRangePicker
              className="font-inter"
              date={dateRange}
              setDateRange={setDateRange}
            />
          </div>

          <div className="w-full flex justify-start items-center mb-2">
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => dispatch(setIsPrivate(e.target.checked))}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700 font-bold">
                  Keep trip private
                </span>
              </label>
            </div>
            {status && (
              <div className="ml-2 flex items-center text-green-500">
                {status}
              </div>
            )}
          </div>
        </form>
        <Button
          className="w-fit mb-2 max-sm:m-auto max-sm:mb-2"
          disabled={!tripName || !selectedAttractions.length}
          aria-disabled={!tripName || !selectedAttractions.length}
          onClick={() => router.push("/planTrip/preview")}
        >
          Preview Trip
        </Button>
        <div className="m-0">
          <AttSearch options={attractionsFilter} />
        </div>
      </div>
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {filteredData.map((attraction: IAttraction, index: number) => (
          <AttractionCard
            key={attraction.title + index}
            item={attraction}
            addAction={handleAddAttraction}
            currentDate={
              selectedAttractions?.find(
                (attractionItem) =>
                  attractionItem.attractionId._id === attraction._id
              )?.day || undefined
            }
            dateRange={dateRange}
          />
        ))}
      </div>
      <Pagination count={count} items_per_page={21} />
    </>
  );
};

export default TripPlanner;
