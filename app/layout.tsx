import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
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
  authors: [{ name: "Sivm99" }],
  alternates: {
    canonical: "https://n.1as.in",
  },
  robots: "index, follow",
  // manifest: "/manifest.json",
  applicationName: "One Alias Service",
  openGraph: {
    images: ["https://1as.in/api/og?a=root"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${Inter.className} ${InterItalic.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <section className="app_container">{children}</section>
        </ThemeProvider>
      </body>
    </html>
  );
}
