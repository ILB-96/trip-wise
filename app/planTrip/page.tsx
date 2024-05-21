"use client";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useSession } from "next-auth/react";

import FilterBar from "@components/FilterBar/FilterBar";
import DateRangePicker from "@components/DateRangePicker";
import AttractionCard from "@components/AttractionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { attractionsFilter } from "@app/attractions/attractionsFilter";
import { IAttraction } from "@models/attraction";

const hasSelectedAttractions = (selectedAttractions: {
  [key: string]: IAttraction[];
}): boolean => {
  return Object.keys(selectedAttractions).some(
    (key) => selectedAttractions[key].length > 0
  );
};
const TripPlanner: React.FC = () => {
  const session = useSession()?.data;
  const [status, setStatus] = useState<string>("");
  const [tripName, setTripName] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [filteredData, setFilteredData] = useState<IAttraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttractions, setSelectedAttractions] = useState<{
    [key: string]: IAttraction[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/attraction/getAttraction");
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json(); // This will be an object with an 'attractions' key
        setFilteredData(result.attractions); // Make sure to access the 'attractions' key here
        setLoading(false);

        // Update attraction types for the filter
        const attractionTypes: string[] = Array.from(
          new Set(
            result.attractions
              .map((attraction: IAttraction) => attraction.types)
              .flat()
          )
        );
        attractionsFilter[2].selections = attractionTypes.filter(
          (type) => type && type.trim() !== ""
        );
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDataChange = (data: IAttraction[]) => {
    setFilteredData(data);
  };
  const handleAddAttraction = (
    attraction: IAttraction,
    date: Date | undefined
  ) => {
    setSelectedAttractions((prev) => {
      const updated = { ...prev };
      if (!date) {
        Object.keys(updated).forEach((key) => {
          updated[key] = updated[key].filter((a) => a !== attraction);
          if (updated[key].length === 0) {
            delete updated[key];
          }
        });
        return updated;
      }
      const dateKey = date.toISOString().split("T")[0]; // Use ISO string for date keys
      // Check if the attraction is already in the selected date
      if (updated[dateKey]?.includes(attraction)) {
        // Remove the attraction from the selected date
        updated[dateKey] = updated[dateKey].filter((a) => a !== attraction);
        if (updated[dateKey].length === 0) {
          delete updated[dateKey]; // Remove the key if the array is empty
        }
      } else {
        // Add the attraction to the specified date
        if (!updated[dateKey]) {
          updated[dateKey] = [];
        }
        updated[dateKey].push(attraction);

        // Remove the attraction from other dates
        Object.keys(updated).forEach((key) => {
          if (key !== dateKey) {
            updated[key] = updated[key].filter((a) => a !== attraction);
            if (updated[key].length === 0) {
              delete updated[key];
            }
          }
        });
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !tripName ||
      !hasSelectedAttractions(selectedAttractions) ||
      !date?.from ||
      !date?.to
    ) {
      setStatus("Please fill out all required fields.");
      return;
    }
    setStatus("Sending...");
    const formData = {
      title: tripName,
      startDate: date.from,
      endDate: date.to,
      creator: session?.user?.id,
      shared: true,
    };
    const response = await fetch("/api/trip/addTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      const tripId = data._id;
      setStatus("Trip Created successfully!");
      console.log(tripId);
      for (const dateKey in selectedAttractions) {
        const attractions = selectedAttractions[dateKey];
        for (const attraction of attractions) {
          const attractionData = {
            tripId: tripId,
            attractionId: attraction._id,
            day: new Date(dateKey),
          };
          console.log(attractionData);
          const re = await fetch("/api/tripAttraction", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(attractionData),
          });
          if (!re.ok) {
            setStatus("Failed to Add Attractions.");
            console.log(await re.json());
          } else {
            console.log(await re.json());
          }
        }
      }
    } else {
      setStatus("Failed to Create Trip.");
      console.log(await response.json());
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!filteredData.length) return <div>No attractions available</div>;
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
      <div className="w-full flex justify-start mb-2">
        <Button
          onClick={() => handleSubmit}
          disabled={!tripName || !hasSelectedAttractions(selectedAttractions)}
          aria-disabled={
            !tripName || !hasSelectedAttractions(selectedAttractions)
          }
        >
          Create Trip
        </Button>
        {status && (
          <div className="ml-2 flex items-center text-green-500">{status}</div>
        )}
      </div>
      <div className="w-full mb-2">
        <FilterBar
          options={attractionsFilter}
          data={filteredData}
          onDataChange={handleDataChange}
        />
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
            dateRange={date}
          />
        ))}
      </div>
    </div>
  );
};

export default TripPlanner;
