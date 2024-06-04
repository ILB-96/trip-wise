import "@styles/globals.css";

import { auth } from "@auth";
import Footer from "@components/Footer";
import { HeaderProvider } from "@components/Header/HeaderProvider";
import Provider from "@context/Provider";
import UserProvider from "@context/UserProvider";
import { Toaster } from "@components/ui/toaster";
import StoreProvider from "@/store/StoreProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Move the hook call inside the component body

  return (
    <StoreProvider>
      <div className="">{children}</div>
    </StoreProvider>
  );
}
