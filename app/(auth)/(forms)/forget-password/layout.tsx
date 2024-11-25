import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Your Password ?",
  description:
    "Just submit your registered email address we will sent you the password reset link.",
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
