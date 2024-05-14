import React from "react";
import { DataItem } from "@components/FilterBar/FilterBar";
const filterData = (data: DataItem[], filters: Record<string, string[]>) => {
  let filteredData: DataItem[] = [];
  data.forEach((item) => {
    let isValid = true;
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        if (filters[key].length > 0) {
          switch (key) {
            case "Rating":
              const rating = item.rating || 0;
              const selectedRating = filters[key][0].split(" ")[0].length;
              if (rating < selectedRating) {
                isValid = false;
              }
              break;
            case "Price Range":
              const price = item.price || "";
              isValid = false;
              for (let i = 0; i < filters[key].length; i++) {
                if (price === filters[key][i]) {
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
                item[lowerCaseKey as keyof DataItem]?.toString() || "";
              isValid = false;
              for (let i = 0; i < filters[key].length; i++) {
                if (itemValue.includes(filters[key][i])) {
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
  return filteredData;
};

export default filterData;
