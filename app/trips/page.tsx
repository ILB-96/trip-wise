"use client";
import { useEffect, useState } from "react";

import FilterBar from "@components/FilterBar/FilterBar";
import TripCard from "@components/TripCard";
import { ITrip } from "@models/trip";

import { tripsOptions } from "./tripsFilters";

const Trips = () => {
  const [filteredData, setFilteredData] = useState<ITrip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/trip/getSharedTrips");
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json(); // This will be an object with an 'attractions' key
        setFilteredData(result.trips); // Make sure to access the 'attractions' key here
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDataChange = (newData: ITrip[]) => {
    setFilteredData(newData);
  };

  if (loading) return <div>Loading...</div>;

  if (!Array.isArray(filteredData) || filteredData.length === 0) {
    return <div>No attractions available</div>; // Default to 0 if the ratings array is invalid
  }

  return (
    <>
      <FilterBar
        options={tripsOptions}
        data={filteredData}
        onDataChange={handleDataChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredData.map((trip: ITrip, index: number) => (
          <TripCard key={trip.title + index} trip={trip} />
        ))}
      </div>
    </>
  );
};

export default Trips;
