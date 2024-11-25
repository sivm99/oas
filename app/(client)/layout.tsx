import { SimpleAppProvider } from "@/hooks/simpleContext";
import Popup from "./Popup";
import NavbarClient from "@/components/Navbar";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SimpleAppProvider>
        <NavbarClient />
        {children}
        <Popup />
        <Popup error />
      </SimpleAppProvider>
    </>
  );
}
