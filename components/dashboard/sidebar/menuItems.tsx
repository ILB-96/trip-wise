import { LayoutDashboard, Users, FerrisWheel, Plane, Flag } from "lucide-react";
import React from "react";

export const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <Users />,
      },
      {
        title: "Trips",
        path: "/dashboard/trips",
        icon: <Plane />,
      },
      {
        title: "Attractions",
        path: "/dashboard/attractions",
        icon: <FerrisWheel />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <Flag />,
      },
    ],
  },
];
