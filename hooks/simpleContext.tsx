"use client";
import { createContext, useState, ReactNode } from "react";

// Create the context
type SimpleContextProps = {
  error: ReactNode;
  setError: (error: ReactNode) => void;
  hint: ReactNode;
  setHint: (hint: ReactNode) => void;
  loginExpired: boolean;
  setLoginExpired: (expired: boolean) => void;
};

export const SimpleAppContext = createContext<SimpleContextProps | undefined>(
  undefined,
);

// Create the provider
export const SimpleAppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hint, setHint] = useState<ReactNode>("");
  const [error, setError] = useState<ReactNode>("");
  const [loginExpired, setLoginExpired] = useState<boolean>(false);

  return (
    <SimpleAppContext.Provider
      value={{ hint, setHint, error, setError, loginExpired, setLoginExpired }}
    >
      {children}
    </SimpleAppContext.Provider>
  );
};

// Usage:
// <AppProvider>
//   <YourApp />
// </AppProvider>
