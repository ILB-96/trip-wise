import { Dispatch, SetStateAction } from "react";
import findCities from "./findCities";

const getFilters = (
  title: string,
  startFilter: Record<string, string[]>,
  setCurrentCities: Dispatch<SetStateAction<string[]>>
) => {
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
        const cities = findCities(filter[key]);
        setCurrentCities(cities);
      }
    }
  }
  return filter;
};

export default getFilters;
