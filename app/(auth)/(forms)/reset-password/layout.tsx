import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enter New Password ?",
  description: "Create New Password For your One Alias Account.",
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
