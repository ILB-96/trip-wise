"use client";
import React, { useRef, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Role } from "@models/user";
import styles from "@components/dashboard/dashboard.module.css";
import SideBar from "@components/dashboard/sidebar/SideBar";
import NavBar from "@components/dashboard/navbar/NavBar";
import ThreeDotsWave from "@components/ThreeDotsLoading";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const roleRef = useRef<Role>("USER");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session || !session.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/user/getUserByEmail/?email=${session.user.email}`
        );

        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }

        const result = await res.json();
        roleRef.current = result.user.role;
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) return <ThreeDotsWave />;

  if (!session || roleRef.current !== "ADMIN") {
    return (
      <div className="text-2xl font-bold bg-gray-300 font-inter mt-5 flex justify-center text-red-500">
        Access Denied
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="p-2 border-gray-500/50 border-r-2">
        <SideBar />
      </div>
      <div className={styles.content}>
        <div className="border-gray-500/50 border-b-2">
          <NavBar />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
