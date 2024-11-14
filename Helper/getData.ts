"use server";

import fetchData from "@/app/(client)/user/[username]/actions";
import { Destination, Rule, User } from "./types";

export async function fetchUser(
  token?: string,
): Promise<{ user?: User; error?: string; newToken?: string; code: number }> {
  const response = await fetchData("user", token);
  if (!response.success) {
    return { error: response.message, code: response.code };
  }
  return {
    user: response.data,
    newToken: response.newToken,
    code: response.code,
  };
}

export async function fetchRules(token?: string): Promise<{
  rules?: Rule[];
  error?: string;
  newToken?: string;
  code: number;
}> {
  const response = await fetchData("rules", token);
  if (!response.success) {
    return { error: response.message, code: response.code };
  }
  return {
    rules: response.data,
    newToken: response.newToken,
    code: response.code,
  };
}

export async function fetchDestinations(token?: string): Promise<{
  destinations?: Destination[];
  error?: string;
  newToken?: string;
  code: number;
}> {
  const response = await fetchData("destinations", token);
  if (!response.success) {
    return { error: response.message, code: response.code };
  }
  return {
    destinations: response.data,
    newToken: response.newToken,
    code: response.code,
  };
}
