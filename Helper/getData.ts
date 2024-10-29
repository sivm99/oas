"use server";

import fetchData from "@/app/(client)/user/[username]/actions";
import { Destination, Rule, User } from "./types";

export async function fetchUser(
  token?: string,
): Promise<{ user?: User; error?: string; newToken?: string }> {
  const response = await fetchData("user", token);
  if (!response.success) {
    return { error: response.message };
  }
  return { user: response.data, newToken: response.newToken };
}

export async function fetchRules(token?: string): Promise<{
  rules?: Rule[];
  error?: string;
  newToken?: string;
}> {
  const response = await fetchData("rules", token);
  if (!response.success) {
    return { error: response.message };
  }
  return { rules: response.data, newToken: response.newToken };
}

export async function fetchDestinations(token?: string): Promise<{
  destinations?: Destination[];
  error?: string;
  newToken?: string;
}> {
  const response = await fetchData("destinations", token);
  if (!response.success) {
    return { error: response.message };
  }
  return { destinations: response.data, newToken: response.newToken };
}
