import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service One Alias Service",
  description:
    "We Use cloudflare email routing service and store only your email where the emails to be forwared",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "forgot password",
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
