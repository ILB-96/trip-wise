"use client";

import React from "react";
import { Trash2, View } from "lucide-react";
import styles from "@components/dashboard/users/users.module.css";
import Link from "next/link";
import { deleteTrip } from "@lib/trips";
import { TableCell, TableRow } from "@components/ui/table";
import { Button } from "@components/ui/button";

const TripItem = ({ trip }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <TableRow>
      <TableCell>{trip?.title}</TableCell>
      <TableCell>{trip?.creator?.email}</TableCell>
      <TableCell>{trip?.shared ? "True" : "False"}</TableCell>
      <TableCell>{formatDate(trip?.updatedAt)}</TableCell>
      <TableCell>
        <div className={styles.buttons}>
          <Link href={`/dashboard/trip/${trip?._id}`}>
            <Button variant="outline">
              <View />
            </Button>
          </Link>
          <form action={deleteTrip}>
            <input
              type="hidden"
              name="id"
              value={trip?._id.toString("base64")}
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

export default TripItem;
