import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";
import Provider from "@context/Provider";
import { auth } from "@auth";
import { HeaderProvider } from "@components/Header/HeaderProvider";
import Footer from "@components/Footer";
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
          {/* <div className="main"> */}
            {/* <div className="gradient" /> */}
          {/* </div> */}
          <div className="flex flex-col relative justify-start h-screen">
            <div>
              <HeaderProvider />
            </div>
            <main className="mb-auto">{children}</main>
            <div className=" ">
              <Footer />
            </div>
          </div>
          {/* </main> */}
          {/* </Provider> */}
        </body>
      </html>
    </Provider>
  );
}
