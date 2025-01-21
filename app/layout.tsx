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
  metadataBase: new URL("https://1as.in"),
  title: {
    default: "One Alias Service - Secure Email Alias & Forwarding Solution",
    template: "%s | One Alias Service",
  },
  description:
    "Create secure, private email aliases for all your online services. Forward emails safely with One Alias, the trusted email forwarding solution for enhanced privacy and security.",

  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "email protection",
    "temporary email",
    "disposable email",
    "email privacy",
    "spam protection",
    "email security service",
    "anonymous email",
    "email masking",
    "email forwarding service",
    "secure communication",
    "online privacy",
    "email proxy",
    "email relay",
    "anti-spam",
    "inbox protection",
    "email filtering",
    "identity protection",
    "data privacy",
    "cyber security",
    "email management",
    "email shield",
  ],

  authors: [{ name: "Sivm99", url: "https://n3y.in/gh" }],

  creator: "Sivm99",
  publisher: "One Alias Service",

  alternates: {
    canonical: "https://1as.in",
    languages: {
      "en-IN": "https://1as.in",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "One Alias Service",
    title: "One Alias Service - Secure Email Forwarding Solution",
    description:
      "Create secure, private email aliases for all your online services. Protect your privacy with One Alias, the trusted email forwarding solution.",
    url: "https://1as.in",
    images: [
      {
        url: "https://1as.in/api/og?a=root",
        width: 1200,
        height: 630,
        alt: "One Alias Service - Email Privacy Solution",
      },
    ],
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "One Alias Service - Secure Email Forwarding",
    description:
      "Protect your email privacy with secure aliases and forwarding.",
    images: ["https://1as.in/api/og?a=root"],
    creator: "@sivm99",
    site: "@sivm99",
  },

  applicationName: "One Alias Service",

  verification: {
    google: "8FpMTxinjVCUI8IVVi-ZErH8ShXcTyI7T1cIIK9-x8s",
    // yandex: "",
    // bing: "",
  },

  category: "Email Security",

  other: {
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
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
        className={`${Inter.className} ${InterItalic.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
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
