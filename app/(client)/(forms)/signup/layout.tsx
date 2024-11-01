import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your One Alias Account",
  description:
    "Register for a new One Alias account to start protecting your email privacy today. Sign in with Github or Google",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "register",
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
