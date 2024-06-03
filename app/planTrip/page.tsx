"use client";
import { addDays } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { attractionsFilter } from "@app/attractions/attractionsFilter";
import AttractionCard from "@components/AttractionCard";
import DateRangePicker from "@components/DateRangePicker";
import FilterBar from "@components/FilterBar/FilterBar";
import { IAttraction } from "@models/attraction";
import AttSearch from "@components/FilterBar/attSearch/AttSearch";
import Pagination from "@components/dashboard/pagination/Pagination";
import { SearchParams } from "@models/types";
import { getAttPage, getAttTypes } from "@lib/attraction";
import { set } from "mongoose";
import ThreeDotsWave from "@components/ThreeDotsLoading";

const hasSelectedAttractions = (selectedAttractions: {
  [key: string]: IAttraction[];
}): boolean => {
  return Object.keys(selectedAttractions).some(
    (key) => selectedAttractions[key].length > 0
  );
};

interface dayAttraction {
  date: Date;
  attraction: IAttraction;
}
interface PlanPageProps {
  searchParams: SearchParams;
}

const TripPlanner: React.FC<PlanPageProps> = ({ searchParams }) => {
  const session = useSession()?.data;
  const [status, setStatus] = useState<string>("");
  const [tripName, setTripName] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [count, setCount] = useState<number>(0);

  const [filteredData, setFilteredData] = useState<IAttraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttractions, setSelectedAttractions] = useState<
    dayAttraction[]
  >([]);
  const [isPrivate, setIsPrivate] = useState<boolean>(false); // State for checkbox

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

  const handleDataChange = (data: IAttraction[]) => {
    setFilteredData(data);
  };

  const handleAddAttraction = (
    attraction: IAttraction,
    date: Date | undefined
  ) => {
    setSelectedAttractions((prev) => {
      const updated = [...prev];
      if (!date) {
        return updated.filter((a) => a.attraction !== attraction);
      }
      let newSelected = [...updated, { date: date, attraction: attraction }];
      const data = newSelected.filter(
        (a) =>
          a.attraction._id !== attraction._id ||
          (a.date === date && a.attraction._id === attraction._id)
      );
      console.log(data);
      return data;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tripName || !selectedAttractions.length || !date?.from || !date?.to) {
      setStatus("Please fill out all required fields.");
      return;
    }

    setStatus("Sending...");
    const formData = {
      title: tripName,
      startDate: date.from,
      endDate: date.to,
      creator: session?.user?.id,
      image: selectedAttractions[0].attraction.image,
      country: selectedAttractions[0].attraction.country,
      shared: !isPrivate, // Set the shared property based on the checkbox state
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
      Array.from(selectedAttractions).forEach(async (val) => {
        const attractionData = {
          tripId: tripId,
          attractionId: val.attraction._id,
          day: val.date,
        };
        const re = await fetch("/api/tripAttraction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attractionData),
        });
        if (!re.ok) {
          setStatus("Failed to Add Attractions.");
        }
        console.log(await re.json());
      });
    } else {
      setStatus("Failed to Create Trip.");
      console.log(await response.json());
    }
  };

  if (loading) return <ThreeDotsWave />;

  return (
    <>
      <div className="flex justify-around p-4 max-lg:flex-col">
        <form className="flex flex-col max-sm:m-auto" onSubmit={handleSubmit}>
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
            <DateRangePicker
              className="font-inter"
              date={date}
              setDate={setDate}
            />
          </div>

          <div className="w-full flex justify-start items-center mb-2">
            <Button
              type="submit"
              disabled={!tripName || !selectedAttractions.length}
              aria-disabled={!tripName || !selectedAttractions.length}
            >
              Create Trip
            </Button>
            <div className="ml-4 flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
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
            dateRange={date}
          />
        ))}
      </div>
      <Pagination count={count} items_per_page={21} />
    </>
  );
};

export default TripPlanner;
