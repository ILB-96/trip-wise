import type { Metadata } from "next";
import "@styles/globals.css";

import { auth } from "@auth";
import Footer from "@components/Footer";
import { HeaderProvider } from "@components/Header/HeaderProvider";
import Provider from "@context/Provider";
import UserProvider from "@context/UserProvider";

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

  // Move the hook call inside the component body

  return (
    <Provider session={session}>
      <UserProvider>
        <html lang="en">
          <body>
            <div className="flex flex-col relative justify-start h-screen">
              <div>
                <HeaderProvider />
              </div>
              <main className="mb-auto">{children}</main>
              <div className=" ">
                <Footer />
              </div>
            </div>
          </body>
        </html>
      </UserProvider>
    </Provider>
  );
}
