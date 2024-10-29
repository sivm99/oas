"use client";

import { Destination, Rule, User } from "@/Helper/types";
import { createContext, ReactNode, useState } from "react";

interface AppContextState {
  user: User | null;
  rules: Rule[];
  destinations: Destination[];
  setUser: (user: User | null) => void;
  setRules: (rules: Rule[]) => void;
  setDestinations: (destinations: Destination[]) => void;
  error: string;
  setError: (error: string) => void;
  hint: string;
  setHint: (hint: string) => void;
  token: string;
  setToken: (token: string) => void;
}

export const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [rules, setRulesState] = useState<Rule[]>([]);
  const [destinations, setDestinationsState] = useState<Destination[]>([]);
  const [error, setError] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const [token, setTokenState] = useState<string>("");

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const setRules = (newRules: Rule[]) => {
    setRulesState(newRules);
    localStorage.setItem("rules", JSON.stringify(newRules));
  };

  const setDestinations = (newDestinations: Destination[]) => {
    setDestinationsState(newDestinations);
    localStorage.setItem("destinations", JSON.stringify(newDestinations));
  };

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem("token", newToken);
  };

  const value: AppContextState = {
    user,
    setUser,
    rules,
    setRules,
    destinations,
    setDestinations,
    error,
    setError,
    hint,
    setHint,
    token,
    setToken,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
