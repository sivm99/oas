import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarServer } from "@/components/Navbar";

const Inter = localFont({
  src: "./fonts/Inter-Regular.ttf",
  variable: "--font-inter",
  weight: "100 900",
  style: "normal",
});
const InterItalic = localFont({
  src: "./fonts/Inter-Italic.ttf",
  variable: "--font-inter-italic",
  weight: "100 900",
  style: "italic",
});

export const metadata: Metadata = {
  title: "One Alias Service",
  description:
    "Create secure, private email aliases for all your online services. Forward emails safely with One Alias, the trusted email forwarding solution.",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "email protection",
  ],
  authors: [{ name: "One Alias" }],
  alternates: {
    canonical: "https://n.1as.in",
  },
  robots: "index, follow",
  // manifest: "/manifest.json",
  applicationName: "One Alias Service",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${Inter.variable} ${InterItalic.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarServer />
          <section className="app_container">{children}</section>
        </ThemeProvider>
      </body>
    </html>
  );
}
