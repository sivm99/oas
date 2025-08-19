import NavbarClient from "@/components/navbar";
import { SimpleAppProvider } from "@/hooks/simpleContext";
import Popup from "./Popup";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SimpleAppProvider>
      <NavbarClient />
      {children}
      <Popup />
      <Popup error />
    </SimpleAppProvider>
  );
}
