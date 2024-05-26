"use client";

import FilterBar from "@components/FilterBar/FilterBar";
import {useEffect, useState} from "react";
import AttractionCard from "@components/AttractionCard";
import { attractionsFilter } from "./attractionsFilter";
import { IAttraction } from "@models/attraction";
import ThreeDotsWave from "@components/ThreeDotsLoading";
const Attractions = () => {
  const [filteredData, setFilteredData] = useState<IAttraction[]>([]);
  const [loading, setLoading] = useState(true);

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
  const handleDataChange = (newData: IAttraction[]) => {
    setFilteredData(newData);
  };

  if (loading) return <ThreeDotsWave />;
  if (!filteredData.length) return <div>No attractions available</div>;

  return (
    <>
      <FilterBar
        options={attractionsFilter}
        data={filteredData}
        onDataChange={handleDataChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredData.map((attraction: IAttraction, index: number) => (
          <AttractionCard key={attraction.title + index} item={attraction} />
        ))}
      </div>
    </>
  );
};

export default Attractions;
