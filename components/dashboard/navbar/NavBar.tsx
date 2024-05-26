"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { MessageSquareText, Earth, Bell, Search } from "lucide-react";
import { getReports } from "@lib/reports";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menuItems } from "../sidebar/menuItems";

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

  return (
    <div className="flex flex-col">
      <Tabs
        defaultValue="Dashboard"
        className="w-full m-2 md:hidden flex items-center justify-center"
      >
        <TabsList>
          {menuItems.map((cat) =>
            cat.list.map((item) => (
              <TabsTrigger key={item.title} value={item.title}>
                <Link href={item.path}>{item.icon}</Link>
              </TabsTrigger>
            ))
          )}
        </TabsList>
      </Tabs>
      <div className="w-full flex justify-between  items-center font-bold font-satoshi text-xl p-2">
        {pathname.split("/").pop()?.toLocaleUpperCase()}
        <Link href="/dashboard/reports" className={styles.notification}>
          <Bell size={20} />

          {commentReportsCount > 0 && (
            <span className={styles.badge}>{commentReportsCount}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
