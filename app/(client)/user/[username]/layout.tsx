import { Metadata } from "next";

export const metadata: Metadata = {
  title: "One Alias Service Dashboard",
  description:
    "Manage All your rules , destinatios and user Profile from One Alias Service Dashboard",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "email protection",
  ],
};

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
