import { SimpleAppProvider } from "@/hooks/simpleContext";
import Popup from "./Popup";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SimpleAppProvider>
        {children}
        <Popup />
        <Popup error />
      </SimpleAppProvider>
    </>
  );
}
