import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";
import Provider from "@context/Provider";
import { auth } from "@auth";
import { HeaderProvider } from "@components/Header/HeaderProvider";
export const metadata: Metadata = {
  title: "TripWise",
  description: "Discover & Share Trips",
  icons: {
    icon: "/assets/icons/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <Provider session={session}>
      <html lang="en">
        <body>
          {/* <Provider> */}
          {/* <div className="main">
            <div className="gradient" />
          </div> */}

          {/* <main className="app"> */}
            <HeaderProvider />
            {children}
            {/* <Footer /> */}
          {/* </main> */}
          {/* </Provider> */}
        </body>
      </html>
    </Provider>
  );
}
