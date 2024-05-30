"use client";
import React, { useRef, useEffect, useState } from "react";
import TopBar from "@components/Chat/TopBar";

export default function ChatsLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="z-0">
            <TopBar />
            {children}
        </div>
    );
}
