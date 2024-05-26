import React from "react";
import { getReports } from "@lib/reports";
import Pagination from "@components/dashboard/pagination/Pagination";
import SearchComp from "@components/dashboard/search/Search";
import styles from "@components/dashboard/users/users.module.css";
import ReportItem from "@components/dashboard/reports/ReportItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
export const REPORTS_PER_PAGE = 5;
interface SearchParams {
  q?: string;
  page?: number;
}

interface ReportsPageProps {
  searchParams: SearchParams;
}

const ReportsPage: React.FC<ReportsPageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, reports } = await getReports(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchComp placeholder="Search for a report..." />
      </div>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Comment</TableHead>
            <TableHead className="max-sm:hidden">Snitch</TableHead>
            <TableHead className="max-sm:hidden">Reason</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <ReportItem key={report._id.toString("base64")} report={report} />
          ))}
        </TableBody>
      </Table>
      <Pagination count={count} items_per_page={REPORTS_PER_PAGE} />
    </div>
  );
};

export default ReportsPage;
