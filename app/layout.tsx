import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarClient } from "@/components/Navbar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { AppProvider } from "@/hooks/appContext";
import Popup from "./(client)/Popup";
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
    images: ["https://n.1as.in/api/og?a=root"],
  },
  icons: {
    icon: [
      {
        url: "/icons8-mail-ios-17-filled-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icons8-mail-ios-17-filled-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons8-mail-ios-17-filled-96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons8-mail-ios-17-filled-120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/icons8-mail-ios-17-filled-152.png",
        sizes: "152x152",
        type: "image/png",
      },
    ],
    // microsoft: [
    //   { url: '/icons8-mail-ios-17-filled-310.png', sizes: '310x310', type: 'image/png' }
    // ]
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
        className={`font-sans ${Inter.variable} ${InterItalic.variable} antialiased`}
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <NavbarClient />
            <section className="app_container">{children}</section>
            <Popup />
            <Popup error />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
