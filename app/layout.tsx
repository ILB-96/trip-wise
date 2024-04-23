import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";
import { auth } from "@auth";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "TripWise",
  description: "Discover & Share Trips",
  icons: {
    icon: "/assets/icons/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}
