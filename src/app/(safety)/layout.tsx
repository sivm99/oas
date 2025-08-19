import Footer from "@/components/footer";
import NavbarServer from "@/components/navbar-server";

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
