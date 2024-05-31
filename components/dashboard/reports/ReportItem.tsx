import React from "react";
import { deleteTripCommentReport, deleteTripReport } from "@lib/reports";
import { Trash2, View, SquareCheck } from "lucide-react";
import styles from "@components/dashboard/users/users.module.css";
import { Button } from "@components/ui/button";
import { TableCell, TableRow } from "@components/ui/table";
import Link from "next/link";
const ReportItem = ({ report }: { report: any }) => {
  return (
    <TableRow>
      <TableCell>
        {report.tripCommentId ? report.tripCommentId.content : "N/A"}
      </TableCell>
      <TableCell className="max-sm:hidden">
        {report.tripCommentId.author
          ? `${report.tripCommentId.author.email}`
          : "N/A"}
      </TableCell>
      <TableCell className="max-sm:hidden">{report.reason}</TableCell>
      <TableCell>
        <div className={styles.buttons}>
          <Link href={`/trip/${report.tripCommentId.tripId._id}`}>
            <Button variant="outline">
              <View />
            </Button>
          </Link>
          <form action={deleteTripReport}>
            <input type="hidden" name="id" value={report._id} />
            <Button className="bg-green-500" variant="ghost">
              <SquareCheck />
            </Button>
          </form>
          <form action={deleteTripCommentReport}>
            <input type="hidden" name="id" value={report._id} />
            <input
              type="hidden"
              name="tripCommentId"
              value={report.tripCommentId._id}
            />
            <Button variant="destructive">
              <Trash2 />
            </Button>
          </form>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ReportItem;
