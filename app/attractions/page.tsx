import { useSession } from "next-auth/react";
import AttractionCard from "@components/AttractionCard";
import { attractionsFilter } from "./attractionsFilter";
import { IAttraction } from "@models/attraction";
import { AuthProvider } from "@/context/AuthContext"; // Ensure this path is correct

import Link from "next/link";
import AttSearch from "@components/FilterBar/attSearch/AttSearch";
import { SearchParams } from "@models/types";
import { getAttPage, getAttTypes } from "@lib/attraction";
import { useState } from "react";
import Pagination from "@components/dashboard/pagination/Pagination";
interface AttPageProps {
  searchParams: SearchParams;
}
const Attractions: React.FC<AttPageProps> = async ({ searchParams }) => {
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
  let count = 0;
  let attractions: IAttraction[] = [];
  let options = { ...attractionsFilter };
  try {
    const { types } = await getAttTypes();
    console.log(types);
    options = {
      ...attractionsFilter,
      types: { title: "Types", selections: types },
    };
    const result = await getAttPage(q, page);
    count = result.count;
    attractions = result.attractions;
  } catch (error) {
    count = 0;
    attractions = [];
  }

  return (
    <AuthProvider>
      {/* <FilterBar
        options={attractionsFilter}
        data={filteredData}
        onDataChange={handleDataChange}
      /> */}
      <AttSearch options={options} />
      <Link
        href="/attractions/add"
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
      >
        Add Attraction
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {attractions.map((attraction: IAttraction, index: number) => (
          <AttractionCard key={attraction.title + index} item={attraction} />
        ))}
      </div>
      <Pagination count={count} items_per_page={21} />
    </AuthProvider>
  );
};

export default Attractions;
