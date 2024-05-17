"use client";

import FilterBar from "@components/FilterBar/FilterBar";
import { useState } from "react";
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
  const [filteredData, setFilteredData] = useState<AttractionType[]>(
    () => dummyAttractions
  );

  if (!attractionsFilter[2].selections.length) {
    const attractionTypes = Array.from(
      new Set(dummyAttractions.map((attraction) => attraction.types).flat())
    );

    attractionsFilter[2].selections = attractionTypes.filter(
      (type) => type !== undefined && type.trim() !== ""
    );
  }

  const handleDataChange = (data: AttractionType[]) => {
    setFilteredData(data);
  };

  return (
    <>
      <FilterBar
        options={attractionsFilter}
        data={dummyAttractions}
        onDataChange={handleDataChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dummyAttractions &&
          filteredData.map((attraction: AttractionType, index: number) => (
            <AttractionCard key={attraction.name} item={attraction} />
          ))}
      </div>
    </>
  );
};

export default Attractions;
