import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Your Data",
  description:
    "You can delete Everything Related to you from our server by just mailing us support@1as.in.",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "forgot password",
    "email protection",
  ],
  openGraph: {
    images: ["https://n.1as.in/api/og?a=deleteme"],
  },
};

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
