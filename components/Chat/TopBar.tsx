"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TopBar = () => {
  const pathname = usePathname();
  return (
      <div className="top-0 sticky px-10 py-5 flex items-center justify-start space-x-5 bg-gray-300 z-40">
        <Link
          href="/chats"
          className={`${
            pathname === "/chats" ? "text-blue-800" : "text-black"
          } font-bold`}
        >
          Chats
        </Link>
        <Link
          href="/chats/contacts"
          className={`${
            pathname === "/chats/contacts" ? "text-blue-800" : "text-black"
          } font-bold`}
        >
          Contacts
        </Link>
      </div>
  );
};

export default TopBar;