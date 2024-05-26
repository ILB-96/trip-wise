import Pagination from "@components/dashboard/pagination/Pagination";
import SearchComp from "@components/dashboard/search/Search";
import styles from "@components/dashboard/users/users.module.css";
import { getTrips, TRIPS_PER_PAGE } from "@lib/trips";
import { SearchParams } from "@models/types";
import TripItem from "@components/dashboard/trips/TripItem";
import { Table, TableHead, TableHeader, TableRow } from "@components/ui/table";

interface TripsPageProps {
  searchParams: SearchParams;
}

const DashTripsPage: React.FC<TripsPageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, trips } = await getTrips(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchComp placeholder="Search for a trip..." />
      </div>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Shared</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {trips.map((trip) => (
            <TripItem key={trip._id.toString("base64")} trip={trip} />
          ))}
        </tbody>
      </Table>
      <Pagination count={count} items_per_page={TRIPS_PER_PAGE} />
    </div>
  );
};

export default DashTripsPage;
