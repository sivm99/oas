import { Destination, Rule, User } from "./types";
import { db } from "./dbService";

export async function getLocalRules(username?: string) {
  try {
    // Initialize DB if not already initialized
    if (!db.isInitialized()) {
      await db.init();
    }

    // Get rules, optionally filtered by username
    const rules = await db.getRules(username);
    return rules.length > 0 ? rules : undefined;
  } catch (error) {
    console.error("Error getting rules from IndexedDB:", error);
    // Fallback to localStorage if IndexedDB fails
    const localRules = localStorage.getItem("rules");
    if (!localRules) return;
    return JSON.parse(localRules) as Rule[];
  }
}

export async function getLocalDestinations(username?: string) {
  try {
    // Initialize DB if not already initialized
    if (!db.isInitialized()) {
      await db.init();
    }

    // Get destinations, optionally filtered by username
    const destinations = await db.getDestinations(username);
    return destinations.length > 0 ? destinations : undefined;
  } catch (error) {
    console.error("Error getting destinations from IndexedDB:", error);
    // Fallback to localStorage if IndexedDB fails
    const localDestinations = localStorage.getItem("destinations");
    if (!localDestinations) return;
    return JSON.parse(localDestinations) as Destination[];
  }
}

export async function getLocalToken() {
  // Keep token in localStorage for quick access
  const token = localStorage.getItem("token");
  return token;
}

export async function getLocalUser(username?: string) {
  try {
    // Initialize DB if not already initialized
    if (!db.isInitialized()) {
      await db.init();
    }

    // If username is provided, get specific user
    if (username) {
      const user = await db.getUser(username);
      return user;
    }

    // If no username provided, try to get the last logged in user
    const lastUsername = localStorage.getItem("lastUsername");
    if (lastUsername) {
      const user = await db.getUser(lastUsername);
      return user;
    }

    return undefined;
  } catch (error) {
    console.error("Error getting user from IndexedDB:", error);
    // Fallback to localStorage if IndexedDB fails
    const localUser = localStorage.getItem("user");
    if (!localUser) return;
    return JSON.parse(localUser) as User;
  }
}

// Additional helper functions that might be useful

export async function clearLocalData() {
  try {
    if (!db.isInitialized()) {
      await db.init();
    }

    // Clear IndexedDB data
    await db.clearAll();

    // Clear localStorage
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing local data:", error);
    throw error;
  }
}

export async function syncLocalData(
  rules: Rule[],
  destinations: Destination[],
  user: User,
) {
  try {
    if (!db.isInitialized()) {
      await db.init();
    }

    // Save all data in parallel
    await Promise.all([
      db.saveRules(rules),
      db.saveDestinations(destinations),
      db.saveUser(user),
    ]);

    // Save username for quick access
    localStorage.setItem("lastUsername", user.username);
  } catch (error) {
    console.error("Error syncing local data:", error);
    throw error;
  }
}
