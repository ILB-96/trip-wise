import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";
import Register from "@components/Register";
export const metadata = {
  title: "TripWise",
  description: "Discover & Share Trips",
  icons: {
    icon: "/assets/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        {/* <Header /> */}
        <Register />
      </body>
    </html>
  );
}
