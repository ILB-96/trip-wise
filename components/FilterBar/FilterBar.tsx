"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@components/ui/button";
import { motion } from "framer-motion";

import FilterBox from "./FilterBox";
import sortData from "@helpers/sortData";
import useSearchData from "@hooks/useSearchData";
import getFilters from "@helpers/getFilters";
import filterData from "@helpers/filterData";
import { IAttraction } from "@models/attraction";
import { ITrip } from "@models/trip";

type Option = {
  title: string;
  selections: string[];
  disableMultiple?: boolean;
};

export type DataItem = IAttraction | ITrip;

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
    <div className="w-full flex-1 bg-transparent shadow rounded-2xl ">
      {/* Separate search bar for small screens */}
      <div
        className="md:hidden p-2 bg-transparent  flex items-center justify-between"
        aria-label="Search bar"
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
              aria-label="Search"
              className="w-full h-full bg-transparent pl-2 rounded-xl border-y-0 border-r-0 border-l-2 focus:outline-none border-l-slate-200/60"
              onChange={(e) => handleTextSearch(e.target.value)}
            />
          )}
        </motion.div>
        <Button
          variant="ghost"
          className="rounded-2xl hover:text-orange-300 ml-2"
          aria-label="Toggle search"
          onClick={toggleSearch}
        >
          <Search className="text-blue-500 hover:text-orange-300" />
        </Button>
      </div>

      {/* Filter boxes */}
      <div
        className="px-2 py-2 bg-transparent shadow rounded-2xl flex items-center justify-between flex-wrap md:flex-nowrap"
        aria-label="Filter options"
      >
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
              aria-label={`Filter by ${option.title}`}
            />
          ))}

        {/* Search bar for larger screens */}
        <div
          className={
            (searchExpanded ? "w-full " : "") +
            "hidden md:flex justify-end focus:outline-none border-0 mt-2 md:mt-0"
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
                aria-label="Search"
                className="w-full md:w-1/4 h-full bg-transparent pl-2 rounded-xl border-y-0 border-r-0 border-l-2 focus:outline-none border-l-slate-200/60"
                onChange={(e) => handleTextSearch(e.target.value)}
              />
            )}
          </motion.div>
          <Button
            variant="ghost"
            className="rounded-2xl hover:text-orange-300 ml-2"
            aria-label="Toggle search"
            onClick={toggleSearch}
          >
            <Search className="text-blue-500 hover:text-orange-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
