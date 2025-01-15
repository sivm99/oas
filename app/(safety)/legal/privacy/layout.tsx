import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy One Alias Service",
  description:
    "We Dont use your data for any purposes we respect your privacy at the fullest and everything you keep here remains Private. we dont run ads so no data selling",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "forgot password",
    "email protection",
  ],
  openGraph: {
    images: ["https://1as.in/api/og?a=privacy"],
  },
};

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
