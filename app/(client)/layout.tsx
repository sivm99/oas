import { AppProvider } from "@/hooks/appContext";
import Popup from "./Popup";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppProvider>
        {children}
        <Popup />
        <Popup error />
      </AppProvider>
    </>
  );
}
