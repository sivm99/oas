import Footer from "@/components/Footer";
import NavbarServer from "@/components/NavbarServer";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarServer />
      {children}
      <Footer />
    </>
  );
}
