import StoreProvider from "@/store/StoreProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div>{children}</div>
    </StoreProvider>
  );
}
