"use client";

import FilterBar from "@components/FilterBar/FilterBar";
import {useEffect, useState} from "react";
import AttractionCard from "@components/AttractionCard";
import { attractionsFilter } from "./attractionsFilter";
import { dummyAttractions } from "./dummyAttractions";


export type AttractionType = {
  name: string;
  location: string;
  country: string;
  price?: string;
  rating?: number;
  description: string;
  image: string;
  types?: string[];
};

const Attractions = () => {
  const [filteredData, setFilteredData] = useState<AttractionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/addAttraction'); // Use the correct endpoint here
        const data: AttractionType[] = await res.json();
        setFilteredData(data);
        setLoading(false);

        // Update attraction types for the filter
        const attractionTypes = Array.from(
            new Set(data.map((attraction) => attraction.types).flat())
        );
        attractionsFilter[2].selections = attractionTypes.filter(
            (type) => type !== undefined && type.trim() !== ""
        );
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDataChange = (data: AttractionType[]) => {
    setFilteredData(data);
  };

  if (loading) return <div>Loading...</div>;

  if (!filteredData.length) {
    return <div>No attractions available</div>;
  }

  return (
      <>
        <FilterBar
            options={attractionsFilter}
            data={filteredData}
            onDataChange={handleDataChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredData.map((attraction) => (
              <AttractionCard key={attraction.name} item={attraction} />
          ))}
        </div>
      </>
  );
};

export default Attractions;
// כאן היה דאטה של אטרקציות