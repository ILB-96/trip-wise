import { Trash2, View } from "lucide-react";
import Link from "next/link";

import Pagination from "@components/dashboard/pagination/Pagination";
import SearchComp from "@components/dashboard/search/Search";
import styles from "@components/dashboard/users/users.module.css";
import {
  ATTRACTIONS_PER_PAGE,
  deleteAttraction,
  getAttractions,
} from "@lib/attraction";
import { SearchParams } from "@models/types";
import AttractionItem from "@components/dashboard/attractions/AttractionItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

interface AttractionsPageProps {
  searchParams: SearchParams;
}

const DashAttractionsPage: React.FC<AttractionsPageProps> = async ({
  searchParams,
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, attractions } = await getAttractions(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchComp placeholder="Search for an attraction..." />
      </div>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attractions.map((attraction) => (
            <AttractionItem
              key={attraction._id.toString("base64")}
              attraction={attraction}
            />
          ))}
        </TableBody>
      </Table>
      <Pagination count={count} items_per_page={ATTRACTIONS_PER_PAGE} />
    </div>
  );
};

export default DashAttractionsPage;
