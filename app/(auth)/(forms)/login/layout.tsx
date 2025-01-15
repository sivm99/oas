import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login One Alias Account",
  description:
    "Loggin into your One alias accoutnt either with email password or use social Login",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "login",
    "email protection",
  ],
  openGraph: {
    images: ["https://1as.in/api/og?a=login"],
  },
};

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
