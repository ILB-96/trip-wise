"use client";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import FilterBox from "./FilterBox";
import { AttractionType } from "../../app/attractions/page";
import { Country, State, City } from "country-state-city";
import { getCode } from "country-list";
import { Search, FilterX } from "lucide-react";
import { Button } from "@components/ui/button";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

type Option = {
  title: string;
  selections: string[];
  disableMultiple?: boolean;
};
type isoCode = string;

const FilterBar = ({
  options,
  data,
  onDataChange,
}: {
  options: Option[];
  data: AttractionType[] | [];
  onDataChange: (currentData: AttractionType[] | []) => void;
}) => {
  const [currentFilter, setCurrentFilter] = useState<Record<string, string[]>>(
    () => ({})
  );
  const [currentCities, setCurrentCities] = useState<string[]>([]);
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const handleSearchClick = () => {
    setSearchExpanded((prevExpanded) => !prevExpanded);
    document.getElementById("text-search")?.focus();
    onDataChange(data);
  };

  const handleTextSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fuse = new Fuse(data, {
        keys: ["name", "location", "country", "description", "types"],
        threshold: 0.4,
      });
      let query = event.target.value;
      const result = fuse.search(query);
      onDataChange(result.map((item) => item.item));
      if (query.trim() === "" || !searchExpanded) {
        onDataChange(data);
      }
    },
    [data, searchExpanded, onDataChange]
  );

  const handleFilterChange = (title: string, selectedOptions: string[]) => {
    let filteredData: AttractionType[] = [];
    const startFilter = {
      ...currentFilter,
      [title]: selectedOptions.filter((val) => val !== ""),
    };

    let filter: Record<string, string[]> = {};
    for (const key in startFilter) {
      if (
        (startFilter[key].length === 0 || startFilter[key][0] !== "") &&
        title === "Country" &&
        key === "Country"
      )
        setCurrentCities([]);
      if (startFilter[key].length !== 0 && startFilter[key][0] !== "") {
        filter[key] = startFilter[key];

        if (title === "Country" && key === "Country") {
          const country = Country.getCountryByCode(
            getCode(filter["Country"][0]) as isoCode
          );
          let cities: string[] = [];
          if (country) {
            const states = State.getStatesOfCountry(country.isoCode);
            states.forEach((state) => {
              const stateCities = City.getCitiesOfState(
                country.isoCode,
                state.isoCode
              );
              cities = cities.concat(
                stateCities.map((city) => city.name as string)
              );
            });
          }
          setCurrentCities(cities);
        }
      }
    }
    data.forEach((item) => {
      let isValid = true;
      for (const key in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, key)) {
          if (filter[key].length > 0) {
            switch (key) {
              case "Rating":
                const rating = item.rating || 0;
                const selectedRating = filter[key][0].split(" ")[0].length;
                if (rating < selectedRating) {
                  isValid = false;
                }
                break;
              case "Price Range":
                const price = item.price || "";
                isValid = false;
                for (let i = 0; i < filter[key].length; i++) {
                  if (price === filter[key][i]) {
                    isValid = true;
                    break;
                  }
                }
                break;
              case "Sort By":
                break;
              default:
                const lowerCaseKey = key.toLowerCase();
                const itemValue =
                  item[lowerCaseKey as keyof AttractionType]?.toString() || "";
                isValid = false;
                for (let i = 0; i < filter[key].length; i++) {
                  if (itemValue.includes(filter[key][i])) {
                    isValid = true;
                    break;
                  }
                }
                break;
            }
          }
        }
        if (!isValid) break;
      }
      if (isValid) {
        filteredData.push(item);
      }
    });

    let newData = data;
    for (const key in filter) {
      if (
        filter[key].length > 1 ||
        (filter[key].length === 1 && filter[key][0] !== "")
      ) {
        newData = filteredData;
        break;
      }
    }

    for (const key in filter) {
      if (key === "Sort By") {
        switch (filter[key][0]) {
          case "Price Ascending":
            newData.sort((a, b) => {
              const priceA = a.price || "";
              const priceB = b.price || "";
              if (priceA === priceB) return 0;
              if (priceA === "") return 1;
              if (priceB === "") return -1;
              if (priceA === "Free") return -1;
              if (priceB === "Free") return 1;
              return priceA.length - priceB.length;
            });
            break;
          case "Price Descending":
            newData.sort((a, b) => {
              const priceA = a.price || "";
              const priceB = b.price || "";
              if (priceA === priceB) return 0;
              if (priceA === "Free") return 1;
              if (!priceA) return 1;
              if (!priceB) return -1;
              if (priceB === "Free") return -1;
              return priceB.length - priceA.length;
            });
            break;
          case "Rating":
            newData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case "Duration Descending":
            newData.sort((a, b) => {
              const durationA = a.duration || "";
              const durationB = b.duration || "";
              if (durationA === durationB) return 0;
              if (!durationA) return 1;
              if (!durationB) return -1;
              const durA = parseInt(durationA.split("(")[1].split(" ")[0]);
              const durB = parseInt(durationB.split("(")[1].split(" ")[0]);

              return (durB || 0) - (durA || 0);
            });
            break;
          case "Duration Ascending":
            newData.sort((a, b) => {
              const durationA = a.duration || "";
              const durationB = b.duration || "";
              if (durationA === durationB) return 0;
              if (!durationA) return 1;
              if (!durationB) return -1;
              const durA = parseInt(durationA.split("(")[1].split(" ")[0]);
              const durB = parseInt(durationB.split("(")[1].split(" ")[0]);

              return (durA || 0) - (durB || 0);
            });
            break;
          default:
            break;
        }
      }
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
        {/* {!searchExpanded && (
          <Button variant="ghost" onClick={handleClearInput}>
            <FilterX color="red" />
          </Button>
        )} */}
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
            <motion.input
              id="text-search"
              type="text"
              placeholder="Search"
              value={!searchExpanded ? "" : undefined}
              className={
                !searchExpanded
                  ? "w-0"
                  : "w-1/4 h-full bg-transparent pl-2 rounded-xl border-y-0 border-r-0 border-l-2 focus:outline-none  border-l-slate-200/60"
              }
              onChange={(e) => handleTextSearch(e)}
            />
          </motion.div>
          <Button
            variant="ghost"
            className="rounded-2xl hover:text-red-600"
            onClick={handleSearchClick}
          >
            <Search className="text-blue-500 hover:text-red-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
