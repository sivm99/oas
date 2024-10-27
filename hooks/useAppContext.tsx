"use client";

import { useContext } from "react";
import { AppContext } from "@/hooks/appContext";

export default function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
