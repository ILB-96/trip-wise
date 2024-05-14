import React, { useCallback } from "react";
import Fuse from "fuse.js";
import { DataItem } from "@/components/FilterBar/FilterBar";
const useSearchData = (
  data: DataItem[],
  keys: string[],
  updateDataCallback: (currentData: DataItem[]) => void
) => {
  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        updateDataCallback(data);
        return;
      }
      const fuse = new Fuse(data, {
        keys,
        includeScore: true,
        threshold: 0.4,
      });
      const results = fuse.search(query).map(({ item }) => item);
      updateDataCallback(results);
    },
    [data, keys, updateDataCallback]
  );

  return handleSearch;
};
export default useSearchData;
