"use client";

import { useContext } from "react";
import { SimpleAppContext } from "./simpleContext";

export default function useSimpleAppContext() {
  const context = useContext(SimpleAppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
