import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One Alias Service Dashboard",
  description:
    "Manage All your rules , destinatios and user Profile from One Alias Service Dashboard",
  keywords: [
    "email alias",
    "email forwarding",
    "privacy",
    "security",
    "email protection",
  ],
};

export default async function DashLayout({
  children,
  rules,
  user,
  destinations,
}: Readonly<{
  children: React.ReactNode;
  rules: React.ReactNode;
  user: React.ReactNode;
  destinations: React.ReactNode;
}>) {
  return (
    <>
      <main className="dash_wrapper">
        {children}
        <div className="dash_child">{user}</div>
        <div className="dash_child">{rules}</div>
        <div className="dash_child">{destinations}</div>
      </main>
    </>
  );
}
