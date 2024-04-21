import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";
export const metadata = {
  title: "TripWise",
  description: "Discover & Share Trips",
  icons: {
    icon: "/assets/icons/logo.png",
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
        {/* <Provider> */}
        {/* <div className="main">
          <div className="gradient" />
        </div> */}

        {/* <main className="app"> */}
          <Header />
          {children}
          {/* <Footer /> */}
        {/* </main> */}
        {/* </Provider> */}
      </body>
    </html>
  );
}
