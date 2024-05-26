// components/ReportItem.tsx
"use client";

import React from "react";
import { deleteTripCommentReport } from "@lib/reports";
import { Trash2, View } from "lucide-react";
import styles from "@components/dashboard/users/users.module.css";
import { Button } from "@components/ui/button";
import { TableCell, TableRow } from "@components/ui/table";
import Link from "next/link";

const ReportItem = ({ report }) => {
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await deleteTripCommentReport(formData);
  };

  return (
    <TableRow>
      <TableCell>
        {report.tripCommentId ? report.tripCommentId.commentText : "N/A"}
      </TableCell>
      <TableCell>
        {report.snitchId
          ? `${report.snitchId.username} (${report.snitchId.email})`
          : "N/A"}
      </TableCell>
      <TableCell>{report.reason}</TableCell>
      <TableCell>
        <div className={styles.buttons}>
          <form onSubmit={handleDelete}>
            <input type="hidden" name="id" value={report._id} />
            <input
              type="hidden"
              name="tripCommentId"
              value={report.tripCommentId._id}
            />
            <Button type="submit" variant="destructive">
              <Trash2 />
            </Button>
          </form>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ReportItem;
