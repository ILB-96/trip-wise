"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { MessageSquareText, Earth, Bell, Search } from "lucide-react";
import { getReports } from "@lib/reports";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [commentReportsCount, setCommentReportsCount] = React.useState(0);
  React.useEffect(() => {
    const fetchCommentReportsCount = async () => {
      try {
        const { count, reports } = await getReports("", 1);
        setCommentReportsCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommentReportsCount();
  }, []);
  console.log(commentReportsCount);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <Link href="/dashboard/reports" className={styles.notification}>
            <Bell size={20} />

            {commentReportsCount > 0 && (
              <span className={styles.badge}>{commentReportsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
