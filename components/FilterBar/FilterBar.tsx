"use client";
import { useState } from "react";
import { Search, FilterX } from "lucide-react";
import { Button } from "@components/ui/button";
import { motion } from "framer-motion";

import { AttractionType } from "../../app/attractions/page";
import { TripType } from "@app/trips/page";
import FilterBox from "./FilterBox";
import sortData from "@helpers/sortData";
import useSearchData from "@hooks/useSearchData";
import getFilters from "@helpers/getFilters";
import filterData from "@helpers/filterData";

type Option = {
  title: string;
  selections: string[];
  disableMultiple?: boolean;
};

export type DataItem = AttractionType | TripType;
const FilterBar = ({
  options,
  data,
  onDataChange,
}: {
  options: Option[];
  data: DataItem[];
  onDataChange: (currentData: DataItem[]) => void;
}) => {
  const [currentFilter, setCurrentFilter] = useState<Record<string, string[]>>(
    () => ({})
  );
  const [currentCities, setCurrentCities] = useState<string[]>([]);
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const handleTextSearch = useSearchData(
    data,
    ["name", "country", "description"],
    onDataChange
  );
  const toggleSearch = () => {
    setSearchExpanded((prev) => !prev);
    if (!searchExpanded) {
      setTimeout(() => document.getElementById("text-search")?.focus(), 300);
    }
    onDataChange(data);
  };

  const handleFilterChange = (title: string, selectedOptions: string[]) => {
    const startFilters = {
      ...currentFilter,
      [title]: selectedOptions.filter((val) => val !== ""),
    };

    let filters: Record<string, string[]> = getFilters(
      title,
      startFilters,
      setCurrentCities
    );

    let filteredData: DataItem[] = filterData(data, filters);

    let newData = data;
    for (const key in filters) {
      if (
        filters[key].length > 1 ||
        (filters[key].length === 1 && filters[key][0] !== "")
      ) {
        newData = filteredData;
        break;
      }
    }

    if (filters["Sort By"]) {
      newData = sortData(newData, filters["Sort By"][0]);
    }

    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      [title]: selectedOptions,
    }));

    onDataChange(newData);
  };

  return (
    <div className="mt-2 w-full flex-1">
      <div className="pl-2 bg-slate-100 shadow-2xl rounded-2xl flex items-center justify-between flex-wrap">
        {!searchExpanded &&
          options.map((option) => (
            <FilterBox
              key={option.title}
              title={option.title}
              options={
                option.title === "Location" ? currentCities : option.selections
              }
              allowMultiple={option.disableMultiple ? false : true}
              onChange={handleFilterChange}
            />
          ))}
        <div
          className={
            (searchExpanded ? "w-full " : "") +
            "flex justify-end focus:outline-none border-0"
          }
        >
          <motion.div
            transition={{
              layout: { duration: 0.7, type: "spring" },
            }}
            layout
            className="flex justify-end w-full"
            id="div-search"
          >
            {searchExpanded && (
              <motion.input
                id="text-search"
                type="text"
                placeholder="Search"
                className="w-1/4 h-full bg-transparent pl-2 rounded-xl border-y-0 border-r-0 border-l-2 focus:outline-none  border-l-slate-200/60"
                onChange={(e) => handleTextSearch(e.target.value)}
              />
            )}
          </motion.div>
          <Button
            variant="ghost"
            className="rounded-2xl hover:text-red-600"
            onClick={toggleSearch}
          >
            <Search className="text-blue-500 hover:text-red-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
