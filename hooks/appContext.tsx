"use client";
import { db } from "@/Helper/dbService";
import { Destination, Rule, User } from "@/Helper/types";
import { createContext, ReactNode, useState, useEffect } from "react";

interface AppContextState {
  user: User | null;
  rules: Rule[];
  destinations: Destination[];
  setUser: (user: User | null) => Promise<void>;
  setRules: (rules: Rule[]) => Promise<void>;
  setDestinations: (destinations: Destination[]) => Promise<void>;
  error: ReactNode;
  setError: (error: ReactNode) => void;
  hint: ReactNode;
  setHint: (hint: ReactNode) => void;
  token: string;
  setToken: (token: string) => void;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [rules, setRulesState] = useState<Rule[]>([]);
  const [destinations, setDestinationsState] = useState<Destination[]>([]);
  const [error, setError] = useState<ReactNode>("");
  const [hint, setHint] = useState<ReactNode>("");
  const [token, setTokenState] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize IndexedDB when the provider mounts
  useEffect(() => {
    const initializeDB = async () => {
      try {
        await db.init();
        await loadInitialData();
      } catch (err) {
        console.error("Failed to initialize database:", err);
        setError("Failed to initialize local database");
      } finally {
        setIsLoading(false);
      }
    };

    initializeDB();
  }, []);

  // Load initial data from IndexedDB
  const loadInitialData = async () => {
    try {
      // Load token from localStorage (since it's small and needed for API calls)
      const storedToken = localStorage.getItem("token");
      if (storedToken) setTokenState(storedToken);

      // If we have a token and stored username, load the user data
      const storedUser = localStorage.getItem("lastUsername");
      if (storedUser) {
        const userData = await db.getUser(storedUser);
        if (userData) {
          setUserState(userData);
          // Load user-specific data
          const userRules = await db.getRules(userData.username);
          const userDestinations = await db.getDestinations(userData.username);
          setRulesState(userRules);
          setDestinationsState(userDestinations);
        }
      }
    } catch (err) {
      console.error("Failed to load initial data:", err);
      setError("Failed to load saved data");
    }
  };

  const setUser = async (newUser: User | null) => {
    try {
      setUserState(newUser);
      if (newUser) {
        await db.saveUser(newUser);
        // Save username to localStorage for initial load
        localStorage.setItem("lastUsername", newUser.username);
      } else {
        // Handle logout - clear username from localStorage
        localStorage.removeItem("lastUsername");
      }
    } catch (err) {
      console.error("Failed to save user:", err);
      setError("Failed to save user data");
    }
  };

  const setRules = async (newRules: Rule[]) => {
    try {
      setRulesState(newRules);
      await db.saveRules(newRules);
    } catch (err) {
      console.error("Failed to save rules:", err);
      setError("Failed to save rules");
    }
  };

  const setDestinations = async (newDestinations: Destination[]) => {
    try {
      setDestinationsState(newDestinations);
      await db.saveDestinations(newDestinations);
    } catch (err) {
      console.error("Failed to save destinations:", err);
      setError("Failed to save destinations");
    }
  };

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem("token", newToken); // Keep token in localStorage for persistence
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
    isLoading,
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your preferred loading component
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
