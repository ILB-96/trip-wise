import TripCard from "@components/TripCard";
import { ITripWithRating, getTripsPage } from "@lib/trips";
import { AuthProvider } from "@context/AuthContext";
import { SearchParams } from "@models/types";

import { tripsOptions } from "./tripsFilters";
import Pagination from "@components/dashboard/pagination/Pagination";
import SearchComp from "@components/FilterBar/search/Search";
interface TripsPageProps {
  searchParams: SearchParams;
}

const Trips: React.FC<TripsPageProps> = async ({ searchParams }) => {
  // const [filteredData, setFilteredData] = useState<ITripWithRating[]>([]);
  // const [loading, setLoading] = useState(true);
  let q: { [key: string]: string } = { q: "" };
  if (searchParams) {
    for (const key in searchParams) {
      if (key !== "page") {
        q[key] = searchParams[key];
      }
    }
  }
  for (const key in tripsOptions) {
    if (!q[key]) {
      q[key] = "";
    }
  }
  // const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  let count = 0;
  let trips: ITripWithRating[] = [];

  try {
    const result = await getTripsPage(q, page, true);
    count = result.count;
    trips = result.trips;
  } catch (error) {
    count = 0;
    trips = [];
  }

  return (
    <AuthProvider>
      <SearchComp options={tripsOptions} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {trips.map((trip: ITripWithRating, index: number) => (
          <TripCard key={trip.title + index} trip={trip} />
        ))}
      </div>
      <Pagination count={count} items_per_page={20} />
    </AuthProvider>
  );
};

export default Trips;
