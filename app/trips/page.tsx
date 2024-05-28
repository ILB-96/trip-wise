"use client";
import { useEffect, useState } from "react";

import FilterBar from "@components/FilterBar/FilterBar";
import TripCard from "@components/TripCard";
import { ITripWithRating } from "@lib/trips";
import {AuthProvider} from "@context/AuthContext";

import { tripsOptions } from "./tripsFilters";
import ThreeDotsWave from "@components/ThreeDotsLoading";

const Trips = () => {
  const [filteredData, setFilteredData] = useState<ITripWithRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/trip/getSharedTrips");
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json(); // This will be an object with a 'trips' key
        setFilteredData(result.trips); // Make sure to access the 'trips' key here
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDataChange = (newData: ITripWithRating[]) => {
    setFilteredData(newData);
  };

  if (loading) return <ThreeDotsWave />;

  if (!Array.isArray(filteredData) || filteredData.length === 0) {
    return <div>No trips available</div>; // Default to 0 if the ratings array is invalid
  }

  return (
      <AuthProvider>
        <FilterBar
            options={tripsOptions}
            data={filteredData}
            onDataChange={handleDataChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredData.map((trip: ITripWithRating, index: number) => (
              <TripCard key={trip.title + index} trip={trip} />
          ))}
        </div>
      </AuthProvider>
  );
};

export default Trips;
