import React from "react";
import { deleteTripCommentReport } from "@lib/reports";
import { Trash2, View } from "lucide-react";
import styles from "@components/dashboard/users/users.module.css";
import { Button } from "@components/ui/button";
import { TableCell, TableRow } from "@components/ui/table";

const ReportItem = ({ report }) => {
  return (
    <TableRow>
      <TableCell>
        {report.tripCommentId ? report.tripCommentId.content : "N/A"}
      </TableCell>
      <TableCell>
        {report.snitchId ? `${report.snitchId.email}` : "N/A"}
      </TableCell>
      <TableCell>{report.reason}</TableCell>
      <TableCell>
        <div className={styles.buttons}>
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
