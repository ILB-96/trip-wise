import React from "react";
import { Trash2, View } from "lucide-react";
import styles from "@components/dashboard/users/users.module.css";
import { deleteAttraction } from "@lib/attraction";
import Link from "next/link";
import { TableCell, TableRow } from "@components/ui/table";
import { Button } from "@components/ui/button";

const AttractionItem = ({ attraction }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };
  return (
    <TableRow>
      <TableCell>{attraction?.title}</TableCell>
      <TableCell>{attraction?.country || "#N/A"}</TableCell>
      <TableCell>{attraction?.location || "#N/A"}</TableCell>
      <TableCell>{formatDate(attraction?.updatedAt)}</TableCell>
      <TableCell>
        <div className={styles.buttons}>
          <Link href={`/dashboard/attractions/${attraction?._id}`}>
            <Button variant="outline">
              <View />
            </Button>
          </Link>
          <form action={deleteAttraction}>
            <input type="hidden" name="id" value={attraction?._id} />
            <Button variant="destructive">
              <Trash2 />
            </Button>
          </form>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AttractionItem;
