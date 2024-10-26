import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
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
          <Navbar />
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
