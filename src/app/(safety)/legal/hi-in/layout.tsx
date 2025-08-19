import { Mukta } from "next/font/google";
import type React from "react";

const mukta = Mukta({
  weight: "400",
  subsets: ["devanagari"],
});

export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={mukta.className} dir="ltr" lang="hi-in">
      {children}
    </main>
  );
}
