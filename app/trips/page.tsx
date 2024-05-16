"use client";
import { useState } from "react";

import FilterBar from "@components/FilterBar/FilterBar";
import TripCard from "@components/TripCard";

import { dummyTrips } from "./dummyTrips";
import { tripsOptions } from "./tripsFilters";
import { AttractionType } from "@app/attractions/page";

export type VisitType = {
  attraction: AttractionType;
  fromTime?: string;
  toTime?: string;
};
export type DayType = { visits: VisitType[]; date?: Date };
export type TripType = {
  name: string;
  rating?: number;
  country: string;
  location?: string;
  description: string;
  price?: string;
  duration?: string;
  days?: DayType[];
  views?: number;
  image: string;
  fromDate?: string;
  toDate?: string;
  types?: string[];
};
const Trips = () => {
  const [filteredData, setFilteredData] = useState<TripType[]>(
    () => dummyTrips
  );

  const handleDataChange = (data: TripType[]) => {
    setFilteredData(data);
  };

  return (
    <>
      <FilterBar
        options={tripsOptions}
        data={dummyTrips}
        onDataChange={handleDataChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredData.map((trip, index) => (
          <TripCard
            key={trip.name + index}
            name={trip.name}
            country={trip.country}
            days={trip.days}
            image={trip.image}
            description={trip.description}
            rating={trip.rating ? trip.rating : 0}
            views={trip.views ? trip.views : 0}
            duration={trip.days ? trip.days.length.toString() : ""}
          />
        ))}
      </div>
    </>
  );
};

export default Trips;
