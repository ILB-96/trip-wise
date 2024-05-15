"use client";
import React, { useState } from "react";
import { AttractionType } from "@app/attractions/page";
import { dummyAttractions } from "@app/attractions/dummyAttractions";
import FilterBar from "@components/FilterBar/FilterBar";
import DateRangePicker from "@components/DateRangePicker";
import { Input } from "@/components/ui/input";
import { attractionsFilter } from "@app/attractions/attractionsFilter";
import { Button } from "@/components/ui/button";
import AttractionCard from "@components/AttractionCard";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const TripPlanner: React.FC = () => {
  const [tripName, setTripName] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [filteredData, setFilteredData] =
    useState<AttractionType[]>(dummyAttractions);

  const handleDataChange = (data: AttractionType[]) => {
    setFilteredData(data);
  };

  const [selectedAttractions, setSelectedAttractions] = useState<
    Map<Date, AttractionType[]>
  >(new Map());

  if (!attractionsFilter[2].selections.length) {
    const attractionTypes = Array.from(
      new Set(dummyAttractions.map((attraction) => attraction.types).flat())
    );

    attractionsFilter[2].selections = attractionTypes.filter(
      (type) => type !== undefined && type.trim() !== ""
    );
  }

  const handleAddAttraction = (
    attraction: AttractionType,
    date: Date | undefined
  ) => {
    setSelectedAttractions((prev) => {
      const updated = new Map(prev);

      if (date) {
        // Add the attraction to the specified date
        if (!updated.has(date)) {
          updated.set(date, []);
        }
        updated.get(date)!.push(attraction);
      }
      // Remove the attraction from all dates
      updated.forEach((attractions, key) => {
        const index = attractions.indexOf(attraction);
        if (index !== -1 && date !== key) {
          attractions.splice(index, 1);
          if (attractions.length === 0) {
            updated.delete(key);
          }
        }
      });

      return updated;
    });
  };
  console.log(selectedAttractions);

  return (
    <div className="block w-full p-2">
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
          onChange={(e) => setTripName(e.target.value)}
          aria-labelledby="trip-planner-heading"
        />
      </div>
      <div className="w-full flex mb-1">
        <DateRangePicker className="font-inter" date={date} setDate={setDate} />
      </div>
      <div className="w-full flex justify-start">
        <Button
          onClick={() => console.log("Share Trip")}
          disabled={!tripName || !selectedAttractions.size}
          aria-disabled={!tripName || !selectedAttractions.size}
        >
          Create Trip
        </Button>
      </div>
      <div className="w-full mb-2">
        <FilterBar
          options={attractionsFilter}
          data={dummyAttractions}
          onDataChange={handleDataChange}
        />
      </div>
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {dummyAttractions &&
          filteredData.map((attraction: AttractionType, index: number) => (
            <AttractionCard
              key={attraction.name + index}
              item={attraction}
              addAction={handleAddAttraction}
              dateRange={date}
            />
          ))}
      </div>
    </div>
  );
};

export default TripPlanner;
